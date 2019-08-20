import { db } from './db';
import { Todo } from '../types';

interface Row {
  id: string;
  text: string;
  completed: boolean;
  board_id?: string;
}

export async function listTodos(): Promise<Todo[]> {
  const query = `
SELECT id, text, completed, board_id
FROM todos;`;

  const rows: Row[] = await db.any(query);

  return rows.map(parseRow);
}

export async function getTodos(ids: string[]): Promise<Record<string, Todo>> {
  if (ids.length === 0) return {};

  const query = `
SELECT id, text, completed, board_id
FROM todos
WHERE id IN ($ids:csv);`;

  const rows: Row[] = await db.any(query, { ids });

  return rows.reduce((acc, row) => {
    acc[row.id] = parseRow(row);
    return acc;
  }, {});
}

export async function upsertTodo(todo: Todo) {
  const query = `
INSERT INTO todos (id, text, completed, board_id) 
VALUES ($(id), $(text), $(completed), $(boardId))
ON CONFLICT (id)  
DO UPDATE SET text = $(text), completed = $(completed), board_id = $(boardId);`;
  await db.none(query, todo);
}

function parseRow(row: Row): Todo {
  return { id: row.id, text: row.text, completed: row.completed, boardId: row.board_id };
}
