import { Resolvers } from './generated/resolvers';
import { Context } from './contextWithDataLoaders';
import * as Store from '../Store';
import * as Service from '../Service';

export const resolvers: Resolvers<Context> = {
  Query: {
    listUsers: async () => {
      const users = await Store.listUsers();
      return { users };
    },
    listTodos: async (_, args, context) => {
      const todos = await Store.listTodos({});
      return { todos };
    },
    listBoards: async (_, args, context) => {
      const boards = await Store.listBoards();
      return { boards };
    },
  },
  Mutation: {
    createTodo: async (_, args, context) => {
      const todo = await Service.createTodo(context, args.input);
      return { todo };
    },
    updateTodo: async (_, args, context) => {
      const todo = await Service.updateTodo(context, args.input);
      return { todo };
    },
    createBoard: async (_, args, context) => {
      const board = await Service.createBoard(context, args.input);
      return { board };
    },
    updateBoard: async (_, args, context) => {
      const board = await Service.updateBoard(context, args.input);
      return { board };
    },
    addTodoToBoard: async (_, args, context) => {
      await Service.addTodoToBoard(context, args.input);
      return {};
    },
  },
  Todo: {
    owner: async (todo, _, context) => context.userDataLoader.load(todo.ownerId),
    board: async (todo, _, context) => context.boardDataLoader.load(todo.boardId),
  },
  Board: {
    todos: async (board, _, context) => context.boardTodosDataLoader.load(board.id),
  },
  User: {
    todos: async (user, _, context) => context.userTodosDataLoader.load(user.id),
  },
};
