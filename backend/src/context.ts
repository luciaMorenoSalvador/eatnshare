import { PrismaClient, User, UserToken } from ".prisma/client"

export interface AuthenticatedUser {
    user: User,
    userToken: UserToken
}

export interface Context {
    db: PrismaClient,
    userAgent: string,
    authUser?: AuthenticatedUser
}