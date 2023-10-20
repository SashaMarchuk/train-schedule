import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
    // Create 5 sample users
    const users = [];
    for (let i = 1; i <= 5; i++) {
        const user = await prisma.user.create({
            data: {
                username: `user${i}`,
                email: `user${i}@example.com`,
                password: await bcrypt.hash('password', 10),
                trainSchedules: {
                    create: [],
                },
            },
        });
        users.push(user);
    }

    // Assign between 1 to 5 train schedules to each user
    for (const user of users) {
        const numSchedules = Math.floor(Math.random() * 5) + 1; // Random number of schedules between 1 and 5
        for (let i = 1; i <= numSchedules; i++) {
            await prisma.trainSchedule.create({
                data: {
                    train_name: `User${user.user_id} Train ${i}`,
                    departure_station: `Station ${i}`, // Sample departure station name
                    arrival_station: `Station ${i + 1}`, // Sample arrival station name
                    departure_time: new Date(),
                    arrival_time: new Date(),
                    user: { connect: { user_id: user.user_id } },
                },
            });
        }
    }

    console.log('Sample users and train schedules created.');

    // Close the Prisma client
    prisma.$disconnect();
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// {
//     "email": "user1@example.com",
//     "password": "password"
// }
