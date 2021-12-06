import { objectType } from "nexus"
import { Recipe } from ".."

export const Ingredient = objectType({
    name: 'Ingredient',
    definition(t) {
        t.nonNull.string('name')
        t.nonNull.string('recipeId')
        t.nonNull.string('quantity')

        t.nonNull.field('recipe', {
            type: Recipe,
            description: 'The recipe that has this ingredient',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findUnique({
                    where: { id: source.recipeId },
                    rejectOnNotFound: true
                })
            }
        })
    }
})