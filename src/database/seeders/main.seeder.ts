import { seedChallenges } from './challenges.seeder';
import { seedUsers } from './users.seeder';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const mainSeeder = async () => {
    await seedUsers();
    await delay(6000);
    await seedChallenges();
};

mainSeeder();
