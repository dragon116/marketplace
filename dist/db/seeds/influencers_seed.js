"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function seed(knex) {
    // Deletes ALL existing entries
    return knex('influencers')
        .del()
        .then(() => {
        // Inserts seed entries
        return knex('influencers').insert([
            {
                userid: 1,
                name: 'iname1',
                surname: 'isurname1',
                birthday: '1990-12-06',
                gender: 'male',
            },
            {
                userid: 2,
                name: 'iname2',
                surname: 'isurname2',
                birthday: '1990-12-06',
                gender: 'male',
            },
            {
                userid: 3,
                name: 'iname3',
                surname: 'isurname3',
                birthday: '1990-12-06',
                gender: 'male',
            },
        ]);
    });
}
exports.seed = seed;
