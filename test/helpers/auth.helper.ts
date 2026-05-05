import { INestApplication } from '@nestjs/common';
import request from 'supertest';

export async function getAuthToken(app: INestApplication) {
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_TEST_PASSWORD,
    })
    .expect(201);

  if (!res.body.token) {
    throw new Error(`Falha ao autenticar: ${JSON.stringify(res.body)}`);
  }

  return res.body.token;
}
