import { Context } from './context';
import * as Store from '../Store';
import * as isValidUuid from 'uuid-validate';
import { UserInputError } from 'apollo-server-errors';

export interface AddTodoToBoardInput {
  todoId: string;
  boardId: string;
}
export async function addTodoToBoard(context: Context, input: AddTodoToBoardInput) {
  const { todoId, boardId } = input;
  if (!isValidUuid(todoId) || !isValidUuid(boardId)) {
    throw new UserInputError(`todoId and boardId are required and must be valid uuids`);
  }

  const board = await Store.getBoard(boardId);
  if (!board) {
    throw new UserInputError(`board with id '${boardId} does not exist`);
  }

  const todo = await Store.getTodo(todoId);
  if (!todo) {
    throw new UserInputError(`todo with id '${todoId} does not exist`);
  }

  await Store.upsertTodo({
    ...todo,
    boardId,
  });
}
