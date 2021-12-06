import { objectType } from "nexus"
import { Recipe, StepPhoto, Video } from ".."

export const Step = objectType({
    name: 'Step',
    definition(t) {
        t.nonNull.int('number')
        t.nonNull.string('recipeId')
        t.nonNull.string('description')

        t.nonNull.field('recipe', {
            type: Recipe,
            description: 'The recipe of this step',
            resolve(source, _, ctx) {
                return ctx.db.recipe.findUnique({
                    where: { id: source.recipeId },
                    rejectOnNotFound: true
                })
            }
        })

        t.field('timer', {
            type: StepTimer,
            description: 'The timer for this step',
            resolve(source, _, ctx) {
                return ctx.db.recipeStepTimer.findUnique({
                    where: {
                        recipeId_stepNumber: {
                            recipeId: source.recipeId,
                            stepNumber: source.number
                        }
                    }
                })
            }
        })

        t.field('tool', {
            type: StepTool,
            description: 'The tool required to perform the step',
            resolve(source, _, ctx) {
                return ctx.db.recipeStepTool.findUnique({
                    where: {
                        recipeId_stepNumber: {
                            recipeId: source.recipeId,
                            stepNumber: source.number
                        }
                    }
                })
            }
        })

        t.field('videoMarker', {
            type: StepVideoMarker,
            description: 'The video marker for this step',
            resolve(source, _, ctx) {
                return ctx.db.recipeStepVideoTiming.findUnique({
                    where: {
                        recipeId_stepNumber: {
                            recipeId: source.recipeId,
                            stepNumber: source.number
                        }
                    }
                })
            }
        })

        t.nonNull.list.nonNull.field('photos', {
            type: StepPhoto,
            description: 'Recipe photos of this particular step',
            async resolve(source, _, ctx) {
                const stepPhotos = await ctx.db.recipeStepPhoto.findMany({
                    where: { 
                        recipeId: source.recipeId,
                        stepNumber: source.number    
                    },
                    include: {
                        recipePhoto: {
                            select: {
                                photo: true
                            }
                        }
                    }
                })

                return stepPhotos.map(it => ({
                    recipeId: it.recipeId,
                    stepNumber: it.stepNumber,
                    ...it.recipePhoto.photo
                }))
            }
        })
    }
})

export const StepTimer = objectType({
    name: 'StepTimer',
    definition(t) {
        t.nonNull.int('stepNumber')
        t.nonNull.string('recipeId')
        t.nonNull.bigInt('seconds')

        t.nonNull.field('step', {
            type: Step,
            description: 'The recipe step that has this timer',
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

export const StepTool = objectType({
    name: 'StepTool',
    definition(t) {
        t.nonNull.int('stepNumber')
        t.nonNull.string('recipeId')
        t.nonNull.field('step', {
            type: Step,
            description: 'The recipe step that has this tool',
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
        t.nonNull.string('description')
        t.nonNull.string('link')
    }
})

export const StepVideoMarker = objectType({
    name: 'StepVideoMarker',
    definition(t) {
        t.nonNull.int('stepNumber')
        t.nonNull.string('recipeId')
        t.nonNull.string('videoId')
        t.nonNull.bigInt('seconds')

        t.nonNull.field('step', {
            type: Step,
            description: 'The step associated with this marker',
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

        t.nonNull.field('video', {
            type: Video,
            description: 'The video associated with the recipe',
            async resolve(source, _, ctx) {
                const recipeVideo = await ctx.db.recipeVideo.findUnique({
                    where: {
                        videoId_recipeId: {
                            videoId: source.videoId,
                            recipeId: source.recipeId
                        }
                    },
                    select: {
                        video: true
                    },
                    rejectOnNotFound: true
                })

                return recipeVideo.video
            }
        })
    }
})