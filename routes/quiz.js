const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const allQuestions = require('../data/questions');

const sessions = new Map();

// GET /api/quiz/start — start a new quiz session
router.post('/start', (req, res) => {
  const { count = 10 } = req.body;
  const numQuestions = Math.min(Math.max(parseInt(count) || 10, 5), allQuestions.length);

  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numQuestions);

  const sessionId = uuidv4();
  sessions.set(sessionId, {
    questions: selected,
    answers: {},
    startedAt: new Date(),
    submitted: false
  });

  res.json({
    sessionId,
    totalQuestions: numQuestions,
    questions: selected.map(({ id, question, options, category }) => ({
      id, question, options, category
    }))
  });
});

// GET /api/quiz/questions — list all available questions (no answers)
router.get('/questions', (req, res) => {
  const { category } = req.query;
  let filtered = allQuestions;

  if (category) {
    filtered = allQuestions.filter(
      q => q.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.json({
    total: filtered.length,
    categories: [...new Set(allQuestions.map(q => q.category))],
    questions: filtered.map(({ id, question, options, category }) => ({
      id, question, options, category
    }))
  });
});

// POST /api/quiz/submit — submit answers and get score
router.post('/submit', (req, res) => {
  const { sessionId, answers } = req.body;

  if (!sessionId || !answers) {
    return res.status(400).json({ error: 'sessionId and answers are required' });
  }

  const session = sessions.get(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found or expired' });
  }
  if (session.submitted) {
    return res.status(400).json({ error: 'Quiz already submitted' });
  }

  let score = 0;
  const results = session.questions.map(q => {
    const userAnswer = answers[q.id];
    const correct = userAnswer === q.answer;
    if (correct) score++;
    return {
      id: q.id,
      category: q.category,
      question: q.question,
      options: q.options,
      userAnswer: userAnswer ?? null,
      correctAnswer: q.answer,
      correct,
      explanation: q.explanation
    };
  });

  session.submitted = true;
  session.answers = answers;
  session.score = score;
  session.submittedAt = new Date();

  const total = session.questions.length;
  const percentage = Math.round((score / total) * 100);
  const timeTaken = Math.round((session.submittedAt - session.startedAt) / 1000);

  let grade;
  if (percentage >= 90) grade = 'A';
  else if (percentage >= 80) grade = 'B';
  else if (percentage >= 70) grade = 'C';
  else if (percentage >= 60) grade = 'D';
  else grade = 'F';

  res.json({
    sessionId,
    score,
    total,
    percentage,
    grade,
    timeTaken,
    passed: percentage >= 60,
    results
  });
});

// GET /api/quiz/categories
router.get('/categories', (req, res) => {
  const categories = [...new Set(allQuestions.map(q => q.category))];
  const counts = categories.map(cat => ({
    name: cat,
    count: allQuestions.filter(q => q.category === cat).length
  }));
  res.json({ categories: counts });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    totalQuestions: allQuestions.length,
    activeSessions: sessions.size,
    uptime: process.uptime()
  });
});

module.exports = router;
