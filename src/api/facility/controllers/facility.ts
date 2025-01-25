/**
 * facility controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::facility.facility', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: 'data',
        }

        return super.find(ctx);
    },
    async findOne(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: 'data',
        }

        return super.findOne(ctx);
    }
}));
