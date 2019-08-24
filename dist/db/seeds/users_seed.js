"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function seed(knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(() => {
        // Inserts seed entries
        return knex('users').insert([
            {
                email: 'iexample1@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 1,
            },
            {
                email: 'iexample2@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 1,
            },
            {
                email: 'iexample3@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 1,
            },
            {
                email: 'mexample1@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 2,
            },
            {
                email: 'mexample2@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 2,
            },
            {
                email: 'mexample3@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 2,
            },
            {
                email: 'wexample1@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 3,
            },
            {
                email: 'wexample2@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 3,
            },
            {
                email: 'wexample3@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 3,
            },
            {
                email: 'aexample1@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 4,
            },
            {
                email: 'aexample2@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 4,
            },
            {
                email: 'aexample3@mail.com',
                password: '202cb962ac59075b964b07152d234b70',
                role: 4,
            },
        ]);
    });
}
exports.seed = seed;
