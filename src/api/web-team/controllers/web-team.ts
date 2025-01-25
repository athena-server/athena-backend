/**
 * web-team controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::web-team.web-team', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                design: {
                    populate: ['image', 'socials'],
                },
                juniors: {
                    populate: ['image', 'socials'],
                },
                seniors: {
                    populate: ['image', 'socials'],
                },
            }
        }

        return super.find(ctx);
    },

    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                design: {
                    populate: ['image', 'socials'],
                },
                juniors: {
                    populate: ['image', 'socials'],
                },
                seniors: {
                    populate: ['image', 'socials'],
                },
            }
        }

        return super.findOne(ctx);
    }
}));
