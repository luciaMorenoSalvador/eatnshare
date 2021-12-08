import { PrismaClient, User, UserToken } from ".prisma/client"
import { OAuth2Client } from "google-auth-library";

export interface AuthenticatedUser {
    user: User,
    userToken: UserToken
}

export interface Context {
    db: PrismaClient,
    googleOAuth: OAuth2Client,
    userAgent: string,
    authUser?: AuthenticatedUser
}