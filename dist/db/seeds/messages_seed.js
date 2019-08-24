"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function seed(knex) {
    // Deletes ALL existing entries
    return knex('messages')
        .del()
        .then(() => {
        // Inserts seed entries
        return knex('messages').insert([
            {
                from: 1,
                to: 4,
                message: 'from 1 to 4',
                created_at: '2019-08-16 10:20:00',
                updated_at: '2019-08-16 10:20:00',
            },
            {
                from: 4,
                to: 1,
                message: 'from 4 to 1',
                created_at: '2019-08-16 10:21:00',
                updated_at: '2019-08-16 10:21:00',
            },
        ]);
    });
}
exports.seed = seed;
