import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex('marketers')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('marketers').insert([
        {
          userid: 4,
          name: 'mname1',
          surname: 'msurname1',
          job_description: 'job1',
          phone_number: '12345678990',
          owner: 10,
        },
        {
          userid: 5,
          name: 'mname2',
          surname: 'msurname2',
          job_description: 'job2',
          phone_number: '12345678990',
          owner: 11,
        },
        {
          userid: 6,
          name: 'mname3',
          surname: 'msurname3',
          job_description: 'job3',
          phone_number: '12345678990',
          owner: 12,
        },
      ]);
    });
}
