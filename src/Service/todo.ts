import { Context } from './context';
import * as Store from '../Store';
import * as uuid from 'uuid';
import * as isValidUuid from 'uuid-validate';
import { Todo } from '../types';
import { UserInputError } from 'apollo-server-errors';

export interface CreateTodoInput {
  text: string;
}
export async function createTodo(
  context: Context,
  input: CreateTodoInput
): Promise<Todo> {
  const todo = {
    id: uuid.v4(),
    ownerId: context.userId,
    text: input.text,
    completed: false,
    boardId: null,
  };

  await Store.upsertTodo(todo);
  return todo;
}

export interface UpdateTodoInput {
  id: string;
  text?: string;
  completed?: boolean;
  boardId?: string;
}
export async function updateTodo(
  context: Context,
  input: UpdateTodoInput
): Promise<Todo> {
  const { id, text, completed } = input;
  if (!isValidUuid(id)) throw new UserInputError(`'${id}' is not a uuid`);

  const todo = await Store.getTodo(id);
  if (!todo) throw new UserInputError(`todo with id '${id} does not exist`);

  const updatedTodo = {
    ...todo,
    text: text ? text : todo.text,
    completed: completed != undefined ? completed : todo.completed,
  };
  await Store.upsertTodo(updatedTodo);
  return updatedTodo;
}
