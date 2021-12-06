import { objectType } from "nexus";
import { Recipe } from ".";
import { Profile } from "..";

export const Rating = objectType({
    name: 'Rating',
    definition(t) {
        t.nonNull.string('recipeId')
        t.nonNull.string('authorUsername')
        t.nonNull.int('rating')

        t.nonNull.field('author', {
            type: Profile,
            description: 'The profile that gave this rating',
            resolve(source, _, ctx) {
                return ctx.db.profile.findUnique({
                    where: { username: source.authorUsername },
                    rejectOnNotFound: true
                })
            }
        })

        t.nonNull.field('recipe', {
            type: Recipe,
            description: 'The recipe that received this rating',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findUnique({
                    where: { id: source.recipeId },
                    rejectOnNotFound: true
                })
            }
        })
    }
})