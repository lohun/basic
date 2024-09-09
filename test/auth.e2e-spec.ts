import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthGuard } from './../src/auth/auth.guard';
// import { response } from 'express';
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

  it('register new user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'Nwankpele Damilola',
        email: 'mail@gmail.com',
        password: 'password',
      })
      .expect(201)
      .then((response) => {
        console.log(response.body);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  it('login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'mail@gmail.com',
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

  afterAll(async () => {
    await app.close();
  });
});
