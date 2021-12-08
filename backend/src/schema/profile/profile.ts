import { interfaceType, objectType } from "nexus"
import { ProfilePhoto, ProfileReport, Rating, Recipe, RecipeReport } from ".."
import { User } from "../user/user"

export const Profile = interfaceType({
    name: 'Profile',
    definition(t) {
        t.nonNull.id('username')
        t.nonNull.string('userId')

        t.nonNull.field('user', {
            type: User,
            description: 'The user that owns this profile',
            resolve(source, _, ctx) {
                return ctx.db.user.findUnique({
                    where: { id: source.userId },
                    rejectOnNotFound: true
                })
            }
        })

        t.field('photo', {
            type: ProfilePhoto,
            description: 'The photo associated with this profile',
            async resolve(source, _, ctx) {
                const profilePhoto = await ctx.db.profilePhoto.findUnique({
                    where: { profileUsername: source.username },
                    include: {
                        photo: true
                    }
                })

                if (!profilePhoto)
                    return null

                return {
                    profileUsername: profilePhoto.profileUsername,
                    ...profilePhoto.photo
                }
            }
        })

        t.nonNull.list.nonNull.field('recipes', {
            type: Recipe,
            description: 'The recipes created by this profile',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findMany({
                    where: { authorUsername: source.username }
                })
            }
        })

        t.nonNull.list.nonNull.field('favoriteRecipes', {
            type: Recipe,
            description: 'The favorite recipes of this profile',
            async resolve(source, _, ctx) {
                const favorites = await ctx.db.favoriteRecipes.findMany({
                    where: { username: source.username },
                    select: {
                        recipe: true
                    }
                })

                return favorites.map(it => it.recipe)
            }
        })

        t.nonNull.list.nonNull.field('recipeRatings', {
            type: Rating,
            description: 'Ratings given by this profile',
            resolve(source, _, ctx) {
                return ctx.db.recipeRating.findMany({
                    where: { authorUsername: source.username }
                })
            }
        })

        t.nonNull.list.nonNull.field('createdRecipeReports', {
            type: RecipeReport,
            description: 'Recipe reports created by this profile',
            resolve(source, _, ctx) {
                return ctx.db.recipeReport.findMany({
                    where: { authorUsername: source.username }
                })
            }
        })

        t.nonNull.list.nonNull.field('createdProfileReports', {
            type: ProfileReport,
            description: 'Profile reports created by this profile',
            resolve(source, _, ctx) {
                return ctx.db.profileReport.findMany({
                    where: { authorUsername: source.username }
                })
            }
        })

        t.nonNull.list.nonNull.field('profileReports', {
            type: ProfileReport,
            description: 'Profile reports againts this profile',
            resolve(source, _, ctx) {
                return ctx.db.profileReport.findMany({
                    where: { reportedUsername: source.username }
                })
            }
        })
    },
    async resolveType(source, ctx) {
        const chef = await ctx.db.certifiedChef.findUnique({
            where: { username: source.username }
        })

        return chef == null ? 'UserProfile' : 'ChefProfile'
    }
})

export const UserProfile = objectType({
    name: 'UserProfile',
    definition(t) {
        t.implements(Profile)
    }
})

export const ChefProfile = objectType({
    name: 'ChefProfile',
    definition(t) {
        t.implements(Profile)
        t.nonNull.int('stars')
    }
})