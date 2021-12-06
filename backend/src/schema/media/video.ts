import { enumType, objectType } from "nexus"

export const VideoProvider = enumType({
    name: 'VideoProvider',
    members: ['YOUTUBE']
})

export const Video = objectType({
    name: 'Video',
    definition(t) {
        t.nonNull.id('id')
        t.nonNull.string('video')
        t.nonNull.field('provider', {
            type: VideoProvider,
            description: 'The provider of this video'
        })
        t.nonNull.date('createdAt', {
            description: 'The date and time at which this video was created at'
        })
    }
})