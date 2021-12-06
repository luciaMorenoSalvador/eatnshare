import { interfaceType, objectType } from "nexus";
import { Profile, Recipe } from "..";

export const Report = interfaceType({
    name: 'Report',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('authorUsername')
        t.nonNull.string('reason')
        t.nonNull.date('createdAt')

        t.nonNull.field('author', {
            type: Profile,
            description: 'The author of this report',
            resolve(source, _, ctx) {
                return ctx.db.profile.findUnique({
                    where: { username: source.authorUsername },
                    rejectOnNotFound: true
                })
            }
        })
    },
    resolveType(source, _) {
        return 'reportedUsername' in source ? 'ProfileReport' : 'RecipeReport'
    }
})

export const ProfileReport = objectType({
    name: 'ProfileReport',
    definition(t) {
        t.implements(Report)
        t.nonNull.string('reportedUsername')

        t.nonNull.field('reported', {
            type: Profile,
            description: 'The profile that was reported',
            resolve(source, _, ctx) {
                return ctx.db.profile.findUnique({
                    where: { username: source.reportedUsername },
                    rejectOnNotFound: true
                })
            }
        })
    }
})

export const RecipeReport = objectType({
    name: 'RecipeReport',
    definition(t) {
        t.implements(Report)
        t.nonNull.string('recipeId')

        t.nonNull.field('recipe', {
            type: Recipe,
            description: 'The recipe that was reported',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findUnique({
                    where: { id: source.recipeId },
                    rejectOnNotFound: true
                })
            }
        })
    }
})