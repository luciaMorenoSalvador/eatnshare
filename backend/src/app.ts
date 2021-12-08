import { ApolloServer, UserInputError, AuthenticationError } from "apollo-server-express"
import { makeSchema } from "nexus"
import { join } from "path"
import express, { Request } from "express"
import * as types from "./schema"
import { AuthenticatedUser, Context } from "./context"
import { PrismaClient } from ".prisma/client"
import { OAuth2Client } from "google-auth-library"

const prismaClient = new PrismaClient()
const googleAuthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const schema = makeSchema({
    types,
    contextType: {
        module: join(__dirname, '../src/context.ts'),
        export: 'Context'
    },
    outputs: {
        schema: join(__dirname, '../graphql/schema.graphql'),
        typegen: join(__dirname, '../src/typegen.ts')
    }
})

const startApolloServer = async (serverPort: number) => {
    const app = express()

    const context = async ({ req }: { req: Request }): Promise<Context> => {
        const authHeader = req.headers.authorization
        let authUser: AuthenticatedUser | undefined
        if (authHeader) {
            const headerParts = authHeader.split(' ')
            if (headerParts.length < 2)
                throw new UserInputError('Invalid header: Authorization')

            if (headerParts[0].toLowerCase() !== 'bearer')
                throw new UserInputError('Expecting Bearer token in Authorization header')

            const token = headerParts[1]
            const userToken = await prismaClient.userToken.findUnique({
                where: { accessToken: token },
                include: {
                    user: true
                }
            })

            if (!userToken)
                throw new AuthenticationError('Invalid user token')

            await prismaClient.userToken.update({
                where: { accessToken: token },
                data: { lastUsedAt: new Date() }   
            })

            authUser = {
                user: userToken.user,
                userToken: userToken
            }
        }

        return {
            db: prismaClient,
            googleOAuth: googleAuthClient,
            userAgent: req.headers["user-agent"] || 'Unknown',
            authUser
        }
    }

    const server = new ApolloServer({
        schema,
        context
    })

    await server.start()
    server.applyMiddleware({ app })

    const expressServer = app.listen(serverPort, () => {
        console.log(`Apollo Server listening at port ${serverPort}`)
    })
    
    process.on('SIGTERM', () => {
        console.log('Shutting down Apollo Server')
        expressServer.close()
    })
}

startApolloServer(parseInt(process.env.APOLLO_SERVER_PORT!!) || 8081)