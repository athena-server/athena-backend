/**
 * course-review controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::course-review.course-review', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: ['courseId', 'reviewed_in_sem'],
        }
        return super.find(ctx);
    },
    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: ['courseId', 'reviewed_in_sem'],
        }

        return super.findOne(ctx);
    }

}));
