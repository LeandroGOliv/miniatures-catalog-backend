import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';
import { getAuthToken } from './helpers/auth.helper.js';
import request from 'supertest';
import { CreateMiniatureDto } from '../src/miniatures/dto/create-miniature.dto.js';
import { UpdateMiniatureDto } from '../src/miniatures/dto/update-miniature.dto.js';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

describe('Miniatures (e2e)', () => {
  let app: INestApplication;
  let access_token: string;
  let createdId: number;

  const createPayload: CreateMiniatureDto = {
    name: 'miniature-test',
    brand: 'brand-test',
    description: 'description-test',
    price: 10,
    imgUrl: 'url-test',
    condition: 'GOOD',
  };

  const editPayload: UpdateMiniatureDto = {
    name: 'miniature-test-edited',
    brand: 'brand-test-edited',
    description: 'description-test-edited',
    price: 20,
    imgUrl: 'url-test-edited',
    condition: 'EXCELLENT',
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(
      new PrismaClientExceptionFilter(httpAdapter, {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2011: HttpStatus.BAD_REQUEST,
        P2025: HttpStatus.NOT_FOUND,
      }),
    );

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
    access_token = await getAuthToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /miniatures → 201, should create a miniature', async () => {
    const res = await request(app.getHttpServer())
      .post('/miniatures')
      .set('Authorization', `Bearer ${access_token}`)
      .send(createPayload)
      .expect(201);

    expect(res.body.id).toBeDefined();
    createdId = res.body.id;
  });

  it('GET /miniatures → 200, should list all miniatures', async () => {
    const res = await request(app.getHttpServer())
      .get('/miniatures')
      .expect(200);

    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.meta).toBeDefined();
    expect(res.body.meta.total).toBeGreaterThan(0);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(10);
    expect(res.body.meta.totalPages).toBeGreaterThanOrEqual(1);
  });

  it('GET /miniatures?page=1&limit=5 → 200, should paginate correctly', async () => {
    const res = await request(app.getHttpServer())
      .get('/miniatures?page=1&limit=5')
      .expect(200);

    expect(res.body.data.length).toBeLessThanOrEqual(5);
    expect(res.body.meta.page).toBe(1);
    expect(res.body.meta.limit).toBe(5);
  });

  it('GET /miniatures/:id → 200, should return the created miniature', async () => {
    const res = await request(app.getHttpServer())
      .get(`/miniatures/${createdId}`)
      .expect(200);

    expect(res.body).toMatchObject({
      id: createdId,
      ...createPayload,
    });
  });

  it('PATCH /miniatures/:id → 200, should update the miniature', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/miniatures/${createdId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send(editPayload)
      .expect(200);

    expect(res.body).toMatchObject({
      id: createdId,
      ...editPayload,
    });
  });

  it('DELETE /miniatures/:id → 204, should delete the miniature', async () => {
    await request(app.getHttpServer())
      .delete(`/miniatures/${createdId}`)
      .set('Authorization', `Bearer ${access_token}`)
      .expect(204);
  });

  it('POST /miniatures → 401, should reject request without token', async () => {
    await request(app.getHttpServer())
      .post('/miniatures')
      .send(createPayload)
      .expect(401);
  });

  it('POST /miniatures → 401, should reject request with invalid token', async () => {
    await request(app.getHttpServer())
      .post('/miniatures')
      .set('Authorization', 'Bearer token-invalido')
      .send(createPayload)
      .expect(401);
  });

  it('PATCH /miniatures/:id → 401, should reject request without token', async () => {
    await request(app.getHttpServer())
      .patch(`/miniatures/${createdId}`)
      .send(editPayload)
      .expect(401);
  });

  it('DELETE /miniatures/:id → 401, should reject request without token', async () => {
    await request(app.getHttpServer())
      .delete(`/miniatures/${createdId}`)
      .expect(401);
  });

  it('POST /miniatures → 400, should reject payload missing required fields', async () => {
    await request(app.getHttpServer())
      .post('/miniatures')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ name: 'só o nome' })
      .expect(400);
  });

  it('POST /miniatures → 400, should reject invalid condition value', async () => {
    await request(app.getHttpServer())
      .post('/miniatures')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ ...createPayload, condition: 'INVALIDO' })
      .expect(400);
  });

  it('POST /miniatures → 400, should reject negative price', async () => {
    await request(app.getHttpServer())
      .post('/miniatures')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ ...createPayload, price: -1 })
      .expect(400);
  });

  it('GET /miniatures/:id → 404, should return not found for unknown id', async () => {
    await request(app.getHttpServer()).get('/miniatures/999999').expect(404);
  });

  it('PATCH /miniatures/:id → 404, should return not found for unknown id', async () => {
    await request(app.getHttpServer())
      .patch('/miniatures/999999')
      .set('Authorization', `Bearer ${access_token}`)
      .send(editPayload)
      .expect(404);
  });

  it('DELETE /miniatures/:id → 404, should return not found for unknown id', async () => {
    await request(app.getHttpServer())
      .delete('/miniatures/999999')
      .set('Authorization', `Bearer ${access_token}`)
      .expect(404);
  });
});
