import * as uuid from 'uuid';
import * as isValidUuid from 'uuid-validate';
import { Resolvers } from './generated/resolvers';
import { Context } from './context';
import * as Store from '../Store';
import { UserInputError } from 'apollo-server-core';

export const resolvers: Resolvers<Context> = {
  Query: {
    listTodos: async (_, _args, context) => {
      const todos = await Store.listTodos({});
      return { todos };
    },
    listBoards: async (_, _args, context) => {
      const boards = await Store.listBoards();
      return { boards };
    },
  },
  Mutation: {
    createTodo: async (_, args, context) => {
      const todo = {
        id: uuid.v4(),
        ownerId: context.userId,
        text: args.input.text,
        completed: false,
        boardId: null,
      };

      await Store.upsertTodo(todo);
      return { todo };
    },
    updateTodo: async (_, args, context) => {
      const { id, text, completed } = args.input;
      if (!isValidUuid(id)) throw new UserInputError(`'${id}' is not a uuid`);

      const todo = await Store.getTodo(id);
      if (!todo) throw new UserInputError(`todo with id '${id} does not exist`);

      const updatedTodo = {
        ...todo,
        text: text ? text : todo.text,
        completed: completed ? completed : todo.completed,
      };
      await Store.upsertTodo(updatedTodo);
      return { todo: updatedTodo };
    },
    createBoard: async (_, args, context) => {
      const board = {
        id: uuid.v4(),
        ownerId: context.userId,
        name: args.input.name,
      };

      await Store.upsertBoard(board);
      return { board };
    },
    updateBoard: async (_, args, context) => {
      const { id, name } = args.input;
      if (!isValidUuid(id)) throw new UserInputError(`'${id}' is not a uuid`);

      const board = await Store.getBoard(id);
      if (!board) throw new UserInputError(`board with id '${id} does not exist`);

      const updatedBoard = {
        ...board,
        name: name ? name : board.name,
      };
      await Store.upsertBoard(updatedBoard);
      return { board: updatedBoard };
    },
    addTodoToBoard: async (_, args, context) => {
      /*
     This resolver has a lot going on.
     If you start to see this level of complexity in resolvers,
     consider refactoring your project to have a "Service" layer
     that owns business logic like validation,null checks,
      permission checks, etc...

     For the sake of simplicity in this project, we're doing it here.
     */
      const { todoId, boardId } = args.input;
      if (!isValidUuid(todoId) || !isValidUuid(boardId)) {
        throw new UserInputError(
          `todoId and boardId are required and must be valid uuids`
        );
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

      return {};
    },
  },
  Todo: {
    owner: async (todo, _, context) => {
      const users = await Store.getUsers([todo.ownerId]);
      return users[todo.ownerId];
    },
    board: async (todo, _, context) => {
      const boards = Store.getBoards([todo.boardId]);
      return boards[todo.boardId];
    },
  },
  Board: {
    todos: async (board, _, context) => Store.listTodos({ boardIds: [board.id] }),
  },
};
