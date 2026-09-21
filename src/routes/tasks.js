const express = require('express');
const store = require('../store');

const router = express.Router();

// GET /tasks - list all tasks
router.get('/', (req, res) => {
  res.json(store.listTasks());
});

// POST /tasks - create a task. Body: { "title": "..." }
router.post('/', (req, res) => {
  const { title } = req.body ?? {};
  if (typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  try {
    res.status(201).json(store.createTask(title.trim()));
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

// POST /tasks/:id/done - mark a task as done
router.post('/:id/done', (req, res) => {
  const task = store.markDone(Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'task not found' });
  res.json(task);
});

module.exports = router;
