// In-memory task store. Data is lost when the server restarts.
const limit = Number(process.env.TASKS_LIMIT ?? 100);

// Ids start at 1 and are never reused.
let nextId = 1;
const tasks = [];

function listTasks() {
  return tasks;
}

function createTask(title) {
  if (tasks.length >= limit) {
    throw new Error(`Task limit of ${limit} reached`);
  }
  const task = { id: nextId++, title, done: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  return task;
}

function findTask(id) {
  return tasks.find((t) => t.id === id);
}

function markDone(id) {
  const task = findTask(id);
  if (task) task.done = true;
  return task;
}

module.exports = { listTasks, createTask, markDone };
