import { enumType, objectType } from "nexus"
import { Profile } from ".."

export const Role = enumType({
    name: 'Role',
    members: ['USER', 'ADMIN'],
    description: 'The possible roles for a user'
})

export const AuthProvider = enumType({
    name: 'AuthProvider',
    members: ['OWN', 'GOOGLE'],
    description: 'The possible authentication providers'
})

export const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('email')
        t.nonNull.field('authProvider', {
            type: AuthProvider,
            description: 'The authentication provider used to create this account'
        })
        t.nonNull.field('role', {
            type: Role,
            description: 'The role of the user'
        })
        t.nonNull.date('createdAt', {
            description: 'The date and time at which the user was created'
        })
        t.nonNull.date('updatedAt', {
            description: 'The date and time at which the user was last updated'
        })
        t.field('profile', {
            type: Profile,
            description: 'The profile associated with this user',
            resolve(source, _, ctx) {
                return ctx.db.profile.findUnique({
                    where: { userId: source.id }
                })
            }
        })
        t.nonNull.list.nonNull.field('userTokens', {
            type: UserToken,
            description: 'The tokens associated with the user account',
            resolve(source, _, ctx) {
                return ctx.db.userToken.findMany({
                    where: { userId: source.id }
                })
            }
        })
    }
})

export const UserToken = objectType({
    name: 'UserToken',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('accessToken')
        t.nonNull.string('device')
        t.nonNull.date('lastUsedAt', {
            description: 'The date and time at which this token was last used at'
        })
        t.nonNull.string('userId')
        t.nonNull.field('user', {
            type: User,
            description: 'The user that owns this token',
            resolve(source, _, ctx) {
                return ctx.db.user.findUnique({
                    where: { id: source.userId },
                    rejectOnNotFound: true
                })
            }
        })
    }
})