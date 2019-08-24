"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function seed(knex) {
    // Deletes ALL existing entries
    return knex('watchers')
        .del()
        .then(() => {
        // Inserts seed entries
        return knex('watchers').insert([
            {
                userid: 7,
                name: 'wname1',
                surname: 'wsurname1',
                owner: 4,
            },
            {
                userid: 8,
                name: 'wname2',
                surname: 'wsurname2',
                owner: 5,
            },
            {
                userid: 9,
                name: 'wname3',
                surname: 'wsurname3',
                owner: 6,
            },
        ]);
    });
}
exports.seed = seed;
