// In-memory task store. Data is lost when the server restarts.
const limit = Number(process.env.TASKS_LIMIT ?? 100);

let nextId = 1;
const tasks = [];

function listTasks() {
  return tasks;
}

function createTask(title, priority = 'medium') {
  if (tasks.length >= limit) {
    throw new Error(`Task limit of ${limit} reached`);
  }
  const task = { id: nextId++, title, completed: false, priority, createdAt: new Date().toISOString() };
  tasks.push(task);
  return task;
}

function markCompleted(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) task.completed = true;
  return task;
}

module.exports = { listTasks, createTask, markCompleted };
