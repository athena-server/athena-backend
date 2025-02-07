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
                pagination : {
                    limit : -1, //disable pagination
                },

            }

            ctx.query = query;
            return super.find(ctx);
        }
        else {
            ctx.query.pagination = {limit: -1}; //disable pagination
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
            enhancedCourses.sort( (x,y) => {
                if(x.reviewCount > y.reviewCount)
                    return -1;
                else if(x.reviewCount < y.reviewCount)
                    return 1;
                else 
                    return 0;
            });
            courses.data = enhancedCourses;
            return courses;
        }
    }
}));
