import { db } from './db';
import { User } from '../types';

interface Row {
  id: string;
  first_name: string;
  last_name: string;
}

export async function listUsers(): Promise<User[]> {
  const query = `
SELECT id, first_name, last_name
FROM users;`;

  const rows: Row[] = await db.any(query);

  return rows.map(parseRow);
}

export async function getUser(id: string): Promise<User | null> {
  return (await getUsers([id]))[id] || null;
}

export async function getUsers(ids: string[]): Promise<Record<string, User>> {
  if (ids.length === 0) return {};

  const query = `
SELECT id, first_name, last_name
FROM users
WHERE id IN ($(ids:csv));`;

  // console.log(`looking up the following users '${ids}'...`);
  const rows: Row[] = await db.any(query, { ids });

  return rows.reduce((acc, row) => {
    acc[row.id] = parseRow(row);
    return acc;
  }, {});
}

function parseRow(row: Row): User {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
  };
}
