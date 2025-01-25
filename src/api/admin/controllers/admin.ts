/**
 * admin controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::admin.admin', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                current_admins: {
                    populate: ['image', 'socials'],
                },
                previous_admins: {
                    populate: ['image', 'socials'],
                }
            }
        }

        return super.find(ctx);
    },

    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                current_admins: {
                    populate: ['image', 'socials'],
                },
                previous_admins: {
                    populate: ['image', 'socials'],
                }
            }
        }

        return super.findOne(ctx);
    }
}));
