import { extendType, nonNull, stringArg } from "nexus";
import { User } from ".";

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

                const user = ctx.db.user.findUnique({
                    where: { id: args.userId }
                })

                console.log(user)

                return user
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