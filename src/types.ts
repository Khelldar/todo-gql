export interface Todo {
  id: string;
  ownerId: string;
  text: string;
  completed: boolean;
  boardId: string | null;
}

export interface Board {
  id: string;
  ownerId: string;
  name: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}
