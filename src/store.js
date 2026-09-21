// In-memory task store. Data is lost when the server restarts.
const limit = Number(process.env.MAX_TASKS ?? 500);

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

function markDone(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.done = true;
  return task;
}

module.exports = { listTasks, createTask, markDone };
