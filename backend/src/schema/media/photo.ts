import { interfaceType, objectType } from "nexus"
import { Profile, Recipe, Step } from ".."

export const Photo = interfaceType({
    name: 'Photo',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('md5')
        t.nonNull.string('mimeType')
        t.nonNull.date('createdAt', {
            description: 'The date and time at which this photo was created at'
        })
        t.nonNull.string('downloadLink', {
            resolve(source, args, ctx) {
                return "" // TODO
            }
        })
    },
    resolveType(source, ctx) {
        if ('recipeId' in source) {
            if ('stepNumber' in source)
                return 'StepPhoto'

            return 'RecipePhoto'
        }

        return 'ProfilePhoto'
    }
})

export const RecipePhoto = objectType({
    name: 'RecipePhoto',
    definition(t) {
        t.implements(Photo)
        t.nonNull.string('recipeId')

        t.nonNull.field('recipe', {
            type: Recipe,
            description: 'The recipe that has this photo',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findUnique({
                    where: { id: source.recipeId },
                    rejectOnNotFound: true
                })
            }
        })
    }
})

export const StepPhoto = objectType({
    name: 'StepPhoto',
    definition(t) {
        t.implements(Photo)
        t.nonNull.string('recipeId')
        t.nonNull.int('stepNumber')

        t.nonNull.field('recipe', {
            type: Recipe,
            description: 'The recipe that has this photo',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findUnique({
                    where: { id: source.recipeId },
                    rejectOnNotFound: true
                })
            }
        })

        t.nonNull.field('step', {
            type: Step,
            description: 'The step of the recipe that has this photo',
            resolve(source, _, ctx) {
                return ctx.db.recipeStep.findUnique({
                    where: {
                        number_recipeId: {
                            number: source.stepNumber,
                            recipeId: source.recipeId
                        }
                    },
                    rejectOnNotFound: true
                })
            }
        })
    }
})

export const ProfilePhoto = objectType({
    name: 'ProfilePhoto',
    definition(t) {
        t.implements(Photo)
        t.nonNull.string('profileUsername')

        t.nonNull.field('profile', {
            type: Profile,
            description: 'The profile that has this photo',
            resolve(source, _, ctx) {
                return ctx.db.profile.findUnique({
                    where: { username: source.profileUsername },
                    rejectOnNotFound: true
                })
            }
        })
    }
})