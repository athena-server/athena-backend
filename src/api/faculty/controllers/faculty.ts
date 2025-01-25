/**
 * faculty controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::faculty.faculty', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                current_faculties: {
                    populate: ['image', 'socials'],
                },
                previous_faculties: {
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
                current_faculties: {
                    populate: ['image', 'socials'],
                },
                previous_faculties: {
                    populate: ['image', 'socials'],
                }
            }
        }

        return super.findOne(ctx);
    }
}));
