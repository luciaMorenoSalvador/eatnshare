import { GraphQLBigInt, GraphQLDate } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

export * from './user'
export * from './media'
export * from './profile'
export * from './recipe'
export * from './report'

export const GQLDATE = asNexusMethod(GraphQLDate, 'date')
export const GQLBIGINT = asNexusMethod(GraphQLBigInt, 'bigInt')