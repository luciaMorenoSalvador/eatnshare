import { AuthenticationError } from "apollo-server-errors";
import * as argon from "argon2";
import { extendType, nonNull, nullable, stringArg } from "nexus";
import { User, UserToken } from ".";

export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('getUserById', {
            type: User,
            description: 'Get a user by its Id',
            args: {
                userId: nonNull(stringArg())
            },
            resolve(_, args, ctx) {
                // TODO: check perms

                return ctx.db.user.findUnique({
                    where: { id: args.userId }
                })
            }
        })

        t.nonNull.list.nonNull.field('getUsers', {
            type: User,
            description: 'Get users in the system',
            resolve(_, args, ctx) {
                // TODO: check perms

                return ctx.db.user.findMany()
            }
        })
    }
})