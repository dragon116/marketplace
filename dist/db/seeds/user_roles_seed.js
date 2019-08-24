"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function seed(knex) {
    // Deletes ALL existing entries
    return knex('user_roles')
        .del()
        .then(() => {
        // Inserts seed entries
        return knex('user_roles').insert([
            { id: 1, name: 'Influencer' },
            { id: 2, name: 'Marketer' },
            { id: 3, name: 'Marketer watcher' },
            { id: 4, name: 'Account Manager' },
        ]);
    });
}
exports.seed = seed;
