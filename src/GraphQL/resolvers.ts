import * as uuid from 'uuid';
import { Resolvers } from './generated/resolvers';
import { Context } from './context';
import * as Store from '../Store';

export const resolvers: Resolvers<Context> = {
  Query: {
    listTodos: async (_, _args, context) => {
      const todos = await Store.listTodos();
      return { todos };
    },
  },
  Mutation: {
    createTodo: async (_, args, context) => {
      const todo = {
        id: uuid.v4(),
        text: args.input.text,
        completed: false,
        boardId: null,
      };

      await Store.upsertTodo(todo);
      return { todo };
    },
  },
};
