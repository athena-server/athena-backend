/**
 * staff controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::staff.staff', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                current_staffs: {
                    populate: ['image', 'socials'],
                }
            }
        }

        return super.find(ctx)
    },

    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                current_staffs: {
                    populate: ['image', 'socials'],
                }
            }
        }

        return super.findOne(ctx)
    }
}));
