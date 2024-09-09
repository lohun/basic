import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthGuard } from './../src/auth/auth.guard';
// import { response } from 'express';

const userid = '66dde6c97956fbc621c364e5';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Specifiy the users _id

  it('Get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((result) => console.log(result.body))
      .catch((err) => console.error(err));
  });

  it('Get a user', () => {
    return request(app.getHttpServer())
      .get('/users/' + userid)
      .expect(200)
      .then((result) => console.log(result.body))
      .catch((err) => console.error(err));
  });

  it('Update user', () => {
    return request(app.getHttpServer())
      .put('/users/' + userid)
      .send({
        name: 'Nwankpele Dami',
        email: 'mails@gmail.com',
        password: 'password',
      })
      .expect(200)
      .then((response) => {
        console.log(response.body);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it('Delete a user', () => {
    return request(app.getHttpServer())
      .delete('/users/' + userid)
      .expect(200)
      .then((result) => console.log(result.body))
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await app.close();
  });
});
