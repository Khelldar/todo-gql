import * as DataLoader from 'dataloader';
import * as Store from '../../Store';
import { Todo } from '../../types';

export function newUserDataLoader() {
  return new DataLoader(async (ids: string[]) => {
    const users = await Store.getUsers(ids);
    return ids.map(id => users[id] || null);
  });
}

export function newBoardDataLoader() {
  return new DataLoader(async (ids: string[]) => {
    const boards = await Store.getBoards(ids);
    return ids.map(id => boards[id] || null);
  });
}

export function newUserTodosDataLoader() {
  return new DataLoader(async (userIds: string[]) => {
    const todos = await Store.listTodos({ userIds });
    const todosByUser = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
      if (!acc[todo.ownerId]) {
        acc[todo.ownerId] = [];
      }
      acc[todo.ownerId].push(todo);
      return acc;
    }, {});
    return userIds.map(userId => todosByUser[userId] || []);
  });
}

export function newBoardTododsDataLoader() {
  return new DataLoader(async (boardIds: string[]) => {
    const todos = await Store.listTodos({ boardIds });
    const todosByBoard = todos.reduce<Record<string, Todo[]>>((acc, todo) => {
      if (!acc[todo.boardId]) {
        acc[todo.boardId] = [];
      }
      acc[todo.boardId].push(todo);
      return acc;
    }, {});
    return boardIds.map(boardId => todosByBoard[boardId] || []);
  });
}
