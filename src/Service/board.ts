import { Context } from './context';
import * as Store from '../Store';
import * as uuid from 'uuid';
import * as isValidUuid from 'uuid-validate';
import { Board } from '../types';
import { UserInputError } from 'apollo-server-errors';

export interface CreateBoardInput {
  name: string;
}
export async function createBoard(
  context: Context,
  input: CreateBoardInput
): Promise<Board> {
  const board = {
    id: uuid.v4(),
    ownerId: context.userId,
    name: input.name,
  };

  await Store.upsertBoard(board);
  return board;
}

export interface UpdateBoardInput {
  id: string;
  name?: string;
}
export async function updateBoard(context: Context, input: UpdateBoardInput) {
  const { id, name } = input;
  if (!isValidUuid(id)) throw new UserInputError(`'${id}' is not a uuid`);

  const board = await Store.getBoard(id);
  if (!board) throw new UserInputError(`board with id '${id} does not exist`);

  const updatedBoard = {
    ...board,
    name: name ? name : board.name,
  };
  await Store.upsertBoard(updatedBoard);
  return updatedBoard;
}
