# Task API

A tiny task tracker API, used as a test repository for DocDrift.

## Running

```bash
npm install
npm start
```

The server listens on port 3000 by default. See [docs/configuration.md](docs/configuration.md).

## Endpoints

### `GET /tasks`

Returns all tasks.

```json
[
  { "id": 1, "title": "Write docs", "completed": false, "priority": "medium", "createdAt": "2026-09-21T10:00:00.000Z" }
]
```

### `POST /tasks`

Creates a task. Request body:

```json
{ "title": "Write docs", "priority": "high" }
```

Responds `201 Created` with the new task:

```json
{ "id": 1, "title": "Write docs", "completed": false, "priority": "high", "createdAt": "2026-09-21T10:00:00.000Z" }
```

Returns `400` if `title` is missing, if `priority` is invalid, and `409` when the task limit is reached.

### `POST /tasks/:id/complete`

Marks a task as completed and returns it with `"completed": true`. Returns `404` for an unknown id.
