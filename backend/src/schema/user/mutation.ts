import { AuthenticationError, UserInputError } from "apollo-server-errors";
import { extendType, nonNull, stringArg } from "nexus";
import { UserToken } from ".";
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
                password: nonNull(stringArg())
            },
            async resolve(_, args, ctx) {
                const user = await ctx.db.user.findUnique({
                    where: { email: args.email }
                })

                if (!user)
                    throw new AuthenticationError('This user account does not exist')
                
                const userPassword = await ctx.db.userPassword.findUnique({
                    where: { userId: user.id }
                })

                if (!userPassword)
                    throw new AuthenticationError('This account was created with a different identity provider')

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

                // create the user token
                const created = await ctx.db.userToken.create({
                    data: {
                        accessToken: generateAccessToken(),
                        device: ctx.userAgent,
                        userId: user.id
                    }
                })

                return created
            }
        })

        t.field('authenticateGoogle', {
            type: UserToken,
            description: 'Authenticate an user with Google IdP',
            args: {
                idToken: nonNull(stringArg())
            },
            async resolve(_, args, ctx) {
                const ticket = await ctx.googleOAuth.verifyIdToken({
                    idToken: args.idToken,
                    audience: ctx.googleOAuth._clientId
                })

                const payload = ticket.getPayload()
                if (!payload)
                    throw new AuthenticationError('Error while authenticating with Google Sign-In')

                const name = payload.name
                const email = payload.email
                const emailVerified = payload.email_verified || false
                // TODO: later... const picture = payload.picture

                if (!name || !email)
                    throw new AuthenticationError('Profile and Email scopes are required for Google Sign-In')

                if (!emailVerified)
                    throw new AuthenticationError('Your google account email is not verified!')

                const user = await ctx.db.user.findUnique({
                    where: { email }
                })

                if (user) {
                    if (user.authProvider !== 'GOOGLE')
                        throw new AuthenticationError('This account was created with a different identity provider')

                    return ctx.db.userToken.create({
                        data: {
                            accessToken: generateAccessToken(),
                            device: ctx.userAgent,
                            userId: user.id
                        }
                    })
                }

                const created = await ctx.db.user.create({
                    data: {
                        email,
                        name,
                        authProvider: 'GOOGLE',
                        userTokens: {
                            create: {
                                accessToken: generateAccessToken(),
                                device: ctx.userAgent
                            }
                        }
                    },
                    select: {
                        userTokens: true
                    }
                })

                return created.userTokens[0]
            }
        })

        t.field('createAccount', {
            type: UserToken,
            description: 'Create a new account',
            args: {
                email: nonNull(stringArg()),
                name: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            async resolve(_, args, ctx) {
                const existingUser = await ctx.db.user.findUnique({
                    where: { email: args.email }
                })

                if (existingUser)
                    throw new UserInputError('An account already exists with the specified email')

                const hashedPassword = await argon.hash(args.password, {
                    type: argon.argon2id
                })

                const created = await ctx.db.user.create({
                    data: {
                        email: args.email,
                        name: args.name,
                        password: {
                            create: {
                                password: hashedPassword
                            }
                        },
                        userTokens: {
                            create: {
                                accessToken: generateAccessToken(),
                                device: ctx.userAgent
                            }
                        }
                    },
                    select: {
                        userTokens: true
                    }
                })

                return created.userTokens[0]
            }
        })
    }
})