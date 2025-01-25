const { courses } = require("./courses");
const setup = async () => {
    try {

        // Loop through each course and insert into the database
        for (const course of courses) {
            const existingCourse = await strapi.query('api::course.course').findOne({
                where: { courseId: course.courseId },
            });


            // Skip if the course already exists
            if (!existingCourse) {
                await strapi.entityService.create('api::course.course', {
                    data: {
                        courseTitle: course.courseTitle,
                        courseId: course.courseId,
                    },
                });

                console.log(`Course "${course.courseTitle}" added successfully.`);
            } else {
                console.log(`Course "${course.courseTitle}" already exists. Skipping.`);
            }
        }
    } catch (error) {
        console.error('Error while seeding courses:', error);
    }
};

async function main() {
    const { createStrapi, compileStrapi } = require('@strapi/strapi');

    const appContext = await compileStrapi();
    const app = await createStrapi(appContext).load();

    app.log.level = 'error'; // Optional, reduce verbosity for logging

    // Access Strapi services after it has been loaded

    // Start the seeding process
    await setup();

    await app.destroy();

    process.exit(0);
}

// Run the main seeding function
main().catch((error) => {
    console.error(error);
    process.exit(1);
});