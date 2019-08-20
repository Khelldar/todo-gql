export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  boardId?: string;
}

export interface Board {
  id: string;
  name: string;
}
