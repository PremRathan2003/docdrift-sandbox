// Task priority: every task now carries a priority of 'low', 'medium' or 'high'.
// POST /tasks accepts an optional "priority" field; it defaults to 'medium'.

const LEVELS = ['low', 'medium', 'high'];

export function normalisePriority(value) {
  if (value === undefined) return 'medium';
  if (!LEVELS.includes(value)) {
    const error = new Error(`priority must be one of: ${LEVELS.join(', ')}`);
    error.status = 400;
    throw error;
  }
  return value;
}

export function withPriority(task, priority) {
  return { ...task, priority: normalisePriority(priority) };
}
