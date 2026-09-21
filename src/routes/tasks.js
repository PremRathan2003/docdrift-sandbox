const express = require('express');
const store = require('../store');

const router = express.Router();

// GET /tasks - list all tasks
router.get('/', (req, res) => {
  res.json(store.listTasks());
});

// POST /tasks - create a task. Body: { "title": "...", "priority": "low" | "medium" | "high" }
router.post('/', (req, res) => {
  const { title, priority = 'medium' } = req.body ?? {};
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  if (!['low', 'medium', 'high'].includes(priority)) {
    return res.status(400).json({ error: 'priority must be low, medium or high' });
  }
  try {
    res.status(201).json(store.createTask(title.trim(), priority));
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

// POST /tasks/:id/complete - mark a task as completed
router.post('/:id/complete', (req, res) => {
  const task = store.markCompleted(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'task not found' });
  res.json(task);
});

module.exports = router;
