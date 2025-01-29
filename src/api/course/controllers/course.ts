/**
 * course controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::course.course', ({ strapi }) => ({
    async findOne(ctx) {
        const query = {
            ...ctx.query,
            populate: {
                course_reviews: {
                    populate: ['reviewed_in_sem'],
                }
            },
        }

        ctx.query = query;
        return super.findOne(ctx);
    },
    async find(ctx) {
        const filters = ctx.query.filters;
        if (filters) {
            const query = {
                ...ctx.query,
                populate: {
                    course_reviews: {
                        populate: ['reviewed_in_sem'],
                    }
                },
            }

            ctx.query = query;
            return super.find(ctx);
        }
        else {
            const courses = await super.find(ctx);

            const enhancedCourses = await Promise.all(
                courses.data.map(async (course) => {
                    const reviewCount = await strapi.entityService.count('api::course-review.course-review', {
                        filters: {
                            courseId: course.id,
                        },
                    });
                    course.reviewCount = reviewCount;
                    return course;
                })
            );

            courses.data = enhancedCourses;
            return courses;
        }
    }
}));
