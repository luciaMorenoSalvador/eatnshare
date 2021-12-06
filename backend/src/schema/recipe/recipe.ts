import { objectType } from "nexus";
import { Profile, RecipePhoto, RecipeReport, Video } from "..";
import { Ingredient } from "./ingredient";
import { Rating } from "./rating";
import { Step } from "./step";

export const Recipe = objectType({
    name: 'Recipe',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('authorUsername')
        t.nonNull.date('createdAt')
        t.nonNull.date('updatedAt')

        t.nonNull.field('author', {
            type: Profile,
            description: 'The author of this recipe',
            resolve(source, _, ctx) {
                return ctx.db.profile.findUnique({
                    where: { username: source.authorUsername },
                    rejectOnNotFound: true
                })
            }
        })

        t.nonNull.float('averageRating', {
            description: 'The average rating of this recipe',
            async resolve(source, _, ctx) {
                const recipeRating = await ctx.db.recipeRating.aggregate(
                    {
                        _avg: { rating: true },
                        where: { recipeId: source.id }
                    }
                )

                return recipeRating._avg.rating || 0
            }
        })

        t.field('video', {
            type: Video,
            description: 'The video for this recipe',
            async resolve(source, _, ctx) {
                const recipeVideo = await ctx.db.recipeVideo.findUnique({
                    where: { recipeId: source.id },
                    select: {
                        video: true
                    }
                })

                return recipeVideo?.video || null
            }
        })

        t.nonNull.list.nonNull.field('steps', {
            type: Step,
            description: 'The steps of this recipe',
            resolve(source, _, ctx) {
                return ctx.db.recipeStep.findMany({
                    where: { recipeId: source.id }
                })
            }
        })

        t.nonNull.list.nonNull.field('ingredients', {
            type: Ingredient,
            description: 'The ingredients of this recipe',
            resolve(source, _, ctx) {
                return ctx.db.recipeIngredient.findMany({
                    where: { recipeId: source.id }
                })
            }
        })

        t.nonNull.list.nonNull.field('photos', {
            type: RecipePhoto,
            description: 'The photos of this recipe',
            async resolve(source, _, ctx) {
                const recipePhotos = await ctx.db.recipePhoto.findMany({
                    where: { recipeId: source.id },
                    include: {
                        photo: true
                    }
                })

                return recipePhotos.map(it => ({
                    recipeId: it.recipeId,
                    ...it.photo
                }))
            }
        })

        t.nonNull.list.nonNull.field('ratings', {
            type: Rating,
            description: 'The ratings given to this recipe',
            resolve(source, _, ctx) {
                return ctx.db.recipeRating.findMany({
                    where: { recipeId: source.id }
                })
            }
        })

        t.nonNull.list.nonNull.field('reports', {
            type: RecipeReport,
            description: 'Reports against this recipe',
            resolve(source, _, ctx) {
                return ctx.db.recipeReport.findMany({
                    where: { recipeId: source.id }
                })
            }
        })

        t.nonNull.list.nonNull.field('favoritesOf', {
            type: Profile,
            description: 'The profiles that have marked this recipe as favorite',
            async resolve(source, _, ctx) {
                const favoritesOf = await ctx.db.favoriteRecipes.findMany({
                    where: { recipeId: source.id },
                    select: {
                        profile: true
                    }
                })

                return favoritesOf.map(it => it.profile)
            }
        })
    }
})