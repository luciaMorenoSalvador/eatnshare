import { AuthenticationError } from "apollo-server-errors";
import { extendType, nonNull, nullable, stringArg } from "nexus";
import { AuthProvider, UserToken } from ".";
import * as argon from "argon2";
import * as crypto from "crypto"

const generateAccessToken = (bytes: number = 64): string => {
    const generated = crypto.randomBytes(bytes)
    return generated.toString('base64url')
}

export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('authenticate', {
            type: UserToken,
            description: 'Authenticate an user',
            args: {
                email: nonNull(stringArg()),
                password: nullable(stringArg()),
                idToken: nullable(stringArg())
            },
            async resolve(_, args, ctx) {
                const user = await ctx.db.user.findUnique({
                    where: { email: args.email }
                })

                if (!user)
                    throw new AuthenticationError('This user account does not exist')
                
                if (args.idToken) {
                    // TODO: verify jwt: check valid issuer, and check if valid
                    // perharps AuthProvider needs to be a table with the issuers
                } else {
                    const userPassword = await ctx.db.userPassword.findUnique({
                        where: { userId: user.id }
                    })

                    if (!userPassword)
                        throw new AuthenticationError('This user account does not exist')
    
                    if (!args.password)
                        throw new AuthenticationError('This user account does not exist')

                    const correct = await argon.verify(
                        userPassword.password, 
                        args.password, 
                        {
                            // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
                            type: argon.argon2id
                        }
                    )

                    if (!correct)
                        throw new AuthenticationError('This user account does not exist')
                }

                // create the user token
                const created = await ctx.db.userToken.create({
                    data: {
                        accessToken: generateAccessToken(),
                        device: '', // TODO: device from user-agent
                        userId: user.id
                    }
                })

                return created
            }
        })

        t.field('createAccount', {
            type: UserToken,
            description: 'Create a new account',
            args: {
                email: nonNull(stringArg()),
                password: nullable(stringArg()),
                authProvider: nullable(AuthProvider)
            }
        })
    }
})