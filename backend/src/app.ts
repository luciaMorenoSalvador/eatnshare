import { makeSchema } from "nexus"
import { join } from "path"
import * as types from './schema'

makeSchema({
    types,
    contextType: {
        module: join(__dirname, './context.ts'),
        export: 'Context'
    },
    outputs: {
        schema: join(__dirname, '../graphql/schema.graphql'),
        typegen: join(__dirname, 'typegen.ts')
    }
})