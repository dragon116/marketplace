'use strict';

import { server } from '../src/server';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

const tokenInfluencer =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWV4YW1wbGUxQG1haWwuY29tIiwicGFzc3dvcmQiOiIyMDJjYjk2MmFjNTkwNzViOTY0YjA3MTUyZDIzNGI3MCIsInJvbGUiOjQsImF2YXRhciI6bnVsbCwiYWx0IjpudWxsLCJsaXZlIjoxLCJpYXQiOjE1NjY1MDk1ODF9.j_VqtgnM7aIBK_nbYNBhYWQXUUObcUvlleCNpXBQR-Q';
const tokenMarketer =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtZXhhbXBsZTFAbWFpbC5jb20iLCJwYXNzd29yZCI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sZSI6MiwiYXZhdGFyIjpudWxsLCJhbHQiOm51bGwsImxpdmUiOjEsImlhdCI6MTU2NjYzOTY1MX0.SCtXTGGK3_lCm5q7QkDoqoy6P84kz53O-PuO0FCegmY';
const tokenWatcher =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJ3ZXhhbXBsZTFAbWFpbC5jb20iLCJwYXNzd29yZCI6IjIwMmNiOTYyYWM1OTA3NWI5NjRiMDcxNTJkMjM0YjcwIiwicm9sZSI6MywiYXZhdGFyIjpudWxsLCJhbHQiOm51bGwsImxpdmUiOjEsImlhdCI6MTU2NjYzOTY3M30.02o0yGkMq6D2Y-fT4prOfjwwG7yEFcPh21OM35p4Sow';
const tokenAdmin =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiYWV4YW1wbGUxQG1haWwuY29tIiwicGFzc3dvcmQiOiIyMDJjYjk2MmFjNTkwNzViOTY0YjA3MTUyZDIzNGI3MCIsInJvbGUiOjQsImF2YXRhciI6bnVsbCwiYWx0IjpudWxsLCJsaXZlIjoxLCJpYXQiOjE1NjY1MDk1ODF9.j_VqtgnM7aIBK_nbYNBhYWQXUUObcUvlleCNpXBQR-Q';

describe('API Integration Tests', () => {
  describe('================================= Auth API =================================', () => {
    describe('#GET /api/v1/signup', () => {
      it('should create a normal user with email and password', (done) => {
        chai
          .request(server)
          .post('/api/v1/signup')
          .set('Content-Type', 'application/json')
          .send({
            email: 'example@mail.com',
            password: '123',
          })
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#GET /api/v1/login', () => {
      it('should login with email and password', (done) => {
        chai
          .request(server)
          .post('/api/v1/login')
          .set('Content-Type', 'application/json')
          .send({
            email: 'example@mail.com',
            password: '123',
          })
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });
  });

  describe('================================= Influeners API =================================', () => {
    describe('#GET /api/v1/influencers', () => {
      it('should get all influencers', (done) => {
        chai
          .request(server)
          .get('/api/v1/influencers')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenAdmin)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body.status).to.eql(200);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });
    });

    describe('#POST /api/v1/influencer', () => {
      it('should create an influencer', (done) => {
        chai
          .request(server)
          .post('/api/v1/influencer')
          .set('Content-Type', 'application/json')
          .send({
            name: 'iname4',
            surname: 'isurname4',
            birthday: '1990-01-02',
            gender: 'male',
          })
          .set('Authorization', tokenInfluencer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#PUT /api/v1/influencer/:id', () => {
      it('should update an influencer', (done) => {
        chai
          .request(server)
          .put('/api/v1/influencer/4')
          .set('Content-Type', 'application/json')
          .send({
            name: 'iname4',
            surname: 'isurname4',
            birthday: '1990-01-02',
            gender: 'male',
          })
          .set('Authorization', tokenInfluencer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#DELETE /api/v1/influencer/:id', () => {
      it('should delete an influencer', (done) => {
        chai
          .request(server)
          .put('/api/v1/influencer/4')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenInfluencer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });
  });

  describe('================================= Marketers API =================================', () => {
    describe('#GET /api/v1/marketers', () => {
      it('should get all marketers', (done) => {
        chai
          .request(server)
          .get('/api/v1/marketers')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenAdmin)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body.status).to.eql(200);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });
    });

    describe('#POST /api/v1/marketer', () => {
      it('should create an marketer', (done) => {
        chai
          .request(server)
          .post('/api/v1/marketer')
          .set('Content-Type', 'application/json')
          .send({
            name: 'mname4',
            surname: 'msurname4',
            job_description: 'job4',
            phone_number: '1234567890',
          })
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#PUT /api/v1/marketer/:id', () => {
      it('should update an marketer', (done) => {
        chai
          .request(server)
          .put('/api/v1/marketer/4')
          .set('Content-Type', 'application/json')
          .send({
            name: 'mname4',
            surname: 'msurname4',
            job_description: 'job4',
            phone_number: '1234567890',
          })
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#DELETE /api/v1/marketer/:id', () => {
      it('should delete an marketer', (done) => {
        chai
          .request(server)
          .put('/api/v1/marketer/4')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });
  });

  describe('================================= Watchers API =================================', () => {
    describe('#GET /api/v1/watchers', () => {
      it('should get all watchers', (done) => {
        chai
          .request(server)
          .get('/api/v1/watchers')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body.status).to.eql(200);
            done();
          });
      });
    });

    describe('#POST /api/v1/watcher', () => {
      it('should create an watcher', (done) => {
        chai
          .request(server)
          .post('/api/v1/watcher')
          .set('Content-Type', 'application/json')
          .send({
            name: 'wname4',
            surname: 'wsurname4',
            userid: '7',
            owner: '4',
          })
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body.status).to.eql(200);
            done();
          });
      });
    });

    describe('#POST /api/v1/watcher', () => {
      it('should create an watcher', (done) => {
        chai
          .request(server)
          .post('/api/v1/watcher')
          .set('Content-Type', 'application/json')
          .send({
            name: 'wname4',
            surname: 'wsurname4',
            userid: '7',
            owner: '4',
          })
          .set('Authorization', tokenInfluencer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body.status).to.eql(404);
            console.log(res.body.message);
            done();
          });
      });
    });

    describe('#PUT /api/v1/watcher/:id', () => {
      it('should update an watcher', (done) => {
        chai
          .request(server)
          .put('/api/v1/watcher/4')
          .set('Content-Type', 'application/json')
          .send({
            name: 'wname4',
            surname: 'wsurname4',
          })
          .set('Authorization', tokenWatcher)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#DELETE /api/v1/watcher/:id', () => {
      it('should delete an watcher', (done) => {
        chai
          .request(server)
          .put('/api/v1/watcher/4')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenWatcher)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });
  });

  describe('================================= Messages API =================================', () => {
    describe('#GET /api/v1/messages', () => {
      it('should get all messages', (done) => {
        chai
          .request(server)
          .get('/api/v1/messages')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenAdmin)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            expect(res.body.status).to.eql(200);
            expect(res.body.data).to.be.an('array');
            done();
          });
      });
    });

    describe('#POST /api/v1/message', () => {
      it('should create an message', (done) => {
        chai
          .request(server)
          .post('/api/v1/message')
          .set('Content-Type', 'application/json')
          .send({
            from: 1,
            to: 4,
            message: 'from 1 to 4 (2)',
          })
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#PUT /api/v1/message/:id', () => {
      it('should update an message', (done) => {
        chai
          .request(server)
          .put('/api/v1/message/5')
          .set('Content-Type', 'application/json')
          .send({
            from: 1,
            to: 4,
            message: 'from 1 to 4 (3)',
          })
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });

    describe('#DELETE /api/v1/message/:id', () => {
      it('should delete an message', (done) => {
        chai
          .request(server)
          .put('/api/v1/message/4')
          .set('Content-Type', 'application/json')
          .set('Authorization', tokenMarketer)
          .end((err, res) => {
            expect(res.status).to.eql(200);
            done();
          });
      });
    });
  });
});
