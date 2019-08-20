import { db } from './db';
import { Board } from '../types';

interface Row {
  id: string;
  owner_id: string;
  name: string;
}

export async function listBoards(): Promise<Board[]> {
  const query = `
SELECT id, owner_id, name
FROM boards;`;

  const rows: Row[] = await db.any(query);

  return rows.map(parseRow);
}

export async function getBoard(id: string): Promise<Board | null> {
  return (await getBoards([id]))[id] || null;
}

export async function getBoards(ids: string[]): Promise<Record<string, Board>> {
  if (ids.length === 0) return {};

  const query = `
SELECT id, owner_id, name
FROM boards
WHERE id IN ($(ids:csv));`;

  const rows: Row[] = await db.any(query, { ids });

  return rows.reduce((acc, row) => {
    acc[row.id] = parseRow(row);
    return acc;
  }, {});
}

export async function upsertBoard(board: Board) {
  const query = `
INSERT INTO boards (id, owner_id, name) 
VALUES ($(id), $(ownerId), $(name))
ON CONFLICT (id)  
DO UPDATE SET owner_id = $(ownerId), name = $(name);`;
  await db.none(query, board);
}

function parseRow(row: Row): Board {
  return { id: row.id, ownerId: row.owner_id, name: row.name };
}
