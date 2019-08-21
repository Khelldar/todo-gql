import { Resolvers } from './generated/resolvers';
import { Context } from './context';
import * as Store from '../Store';
import * as Service from '../Service';

export const resolvers: Resolvers<Context> = {
  Query: {
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
    owner: async (todo, _, context) => Store.getUser(todo.ownerId),
    board: async (todo, _, context) => Store.getBoard(todo.boardId),
  },
  Board: {
    todos: async (board, _, context) => Store.listTodos({ boardIds: [board.id] }),
  },
  User: {
    todos: async (user, _, context) => Store.listTodos({ userIds: [user.id] }),
  },
};
