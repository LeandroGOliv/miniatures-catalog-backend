import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';
import request from 'supertest';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login successfully', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_TEST_PASSWORD,
      })
      .expect(201);

    expect(res.body.token).toBeDefined();
  });

  it('should fail with wrong password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: process.env.ADMIN_USER,
        password: 'test_wrong_password',
      })
      .expect(401);
  });

  it('should fail with wrong username', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test_wrong_username',
        password: process.env.ADMIN_TEST_PASSWORD,
      })
      .expect(401);
  });
});
