import { db } from './db';
import { Todo } from '../types';

interface Row {
  id: string;
  owner_id: string;
  text: string;
  completed: boolean;
  board_id?: string;
}

export interface ListTodosFilters {
  boardIds?: string[];
  userIds?: string[];
}

export async function listTodos(filters: ListTodosFilters): Promise<Todo[]> {
  const [conditionalsSQL, args] = buildListTodosConditionals(filters);

  const query = `
SELECT id, owner_id, text, completed, board_id
FROM todos
${conditionalsSQL};`;

  console.log('list todos called');
  const rows: Row[] = await db.any(query, args);

  return rows.map(parseRow);
}

export async function getTodo(id: string): Promise<Todo | null> {
  return (await getTodos([id]))[id] || null;
}

export async function getTodos(ids: string[]): Promise<Record<string, Todo>> {
  if (ids.length === 0) return {};

  const query = `
SELECT id, owner_id, text, completed, board_id
FROM todos
WHERE id IN ($(ids:csv));`;

  const rows: Row[] = await db.any(query, { ids });

  return rows.reduce((acc, row) => {
    acc[row.id] = parseRow(row);
    return acc;
  }, {});
}

export async function upsertTodo(todo: Todo) {
  const query = `
INSERT INTO todos (id, owner_id, text, completed, board_id) 
VALUES ($(id), $(ownerId), $(text), $(completed), $(boardId))
ON CONFLICT (id)  
DO UPDATE SET text = $(text), owner_id = $(ownerId), completed = $(completed), board_id = $(boardId);`;

  await db.none(query, todo);
}

function parseRow(row: Row): Todo {
  return {
    id: row.id,
    ownerId: row.owner_id,
    text: row.text,
    completed: row.completed,
    boardId: row.board_id,
  };
}

function buildListTodosConditionals(filters: ListTodosFilters): [string, object] {
  const conditionals: string[] = [];
  if (filters.boardIds) {
    conditionals.push(`board_id in ($(boardIds:csv))`);
  }

  if (filters.userIds) {
    conditionals.push(`owner_id in ($(userIds:csv))`);
  }

  if (conditionals.length === 0) return ['', {}];
  return [`WHERE ${conditionals.join(' AND ')}`, filters];
}
