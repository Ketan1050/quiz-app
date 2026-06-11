const request = require('supertest');
const app = require('../server');

let sessionId;
let questions;

describe('Quiz API', () => {

  describe('GET /api/quiz/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/quiz/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.totalQuestions).toBeGreaterThan(0);
    });
  });

  describe('GET /api/quiz/questions', () => {
    it('should return all questions without answers', async () => {
      const res = await request(app).get('/api/quiz/questions');
      expect(res.statusCode).toBe(200);
      expect(res.body.total).toBeGreaterThan(0);
      expect(res.body.questions[0]).not.toHaveProperty('answer');
      expect(res.body.questions[0]).not.toHaveProperty('explanation');
    });

    it('should filter questions by category', async () => {
      const res = await request(app).get('/api/quiz/questions?category=Docker%20%26%20Containers');
      expect(res.statusCode).toBe(200);
      expect(res.body.total).toBeGreaterThan(0);
      res.body.questions.forEach(q => {
        expect(q.category).toBe('Docker & Containers');
      });
    });
  });

  describe('GET /api/quiz/categories', () => {
    it('should return all categories with counts', async () => {
      const res = await request(app).get('/api/quiz/categories');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.categories)).toBe(true);
      expect(res.body.categories[0]).toHaveProperty('name');
      expect(res.body.categories[0]).toHaveProperty('count');
    });
  });

  describe('POST /api/quiz/start', () => {
    it('should start a quiz session with default 10 questions', async () => {
      const res = await request(app).post('/api/quiz/start').send({});
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sessionId');
      expect(res.body.questions).toHaveLength(10);
      sessionId = res.body.sessionId;
      questions = res.body.questions;
    });

    it('should start a quiz with custom question count', async () => {
      const res = await request(app).post('/api/quiz/start').send({ count: 5 });
      expect(res.statusCode).toBe(200);
      expect(res.body.questions).toHaveLength(5);
    });

    it('should not return answer field in questions', async () => {
      const res = await request(app).post('/api/quiz/start').send({});
      expect(res.statusCode).toBe(200);
      res.body.questions.forEach(q => {
        expect(q).not.toHaveProperty('answer');
      });
    });
  });

  describe('POST /api/quiz/submit', () => {
    it('should return score and results after submission', async () => {
      const answers = {};
      questions.forEach(q => { answers[q.id] = 0; });

      const res = await request(app)
        .post('/api/quiz/submit')
        .send({ sessionId, answers });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('score');
      expect(res.body).toHaveProperty('percentage');
      expect(res.body).toHaveProperty('grade');
      expect(res.body).toHaveProperty('passed');
      expect(res.body.results).toHaveLength(questions.length);
      expect(res.body.results[0]).toHaveProperty('explanation');
    });

    it('should reject double submission', async () => {
      const answers = {};
      questions.forEach(q => { answers[q.id] = 0; });

      const res = await request(app)
        .post('/api/quiz/submit')
        .send({ sessionId, answers });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Quiz already submitted');
    });

    it('should return 400 if sessionId is missing', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .send({ answers: {} });

      expect(res.statusCode).toBe(400);
    });

    it('should return 404 for unknown session', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .send({ sessionId: 'nonexistent-id', answers: {} });

      expect(res.statusCode).toBe(404);
    });
  });

});
