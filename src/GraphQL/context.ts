import * as DataLoader from 'dataloader';
import * as Store from '../Store';
export type Context = ReturnType<typeof context>;

export function context({ req }) {
  //this is a standin for real authentication
  const userId = req.headers['x-user'] || 'default';
  return {
    userId,
    userTodosDataLoader: new DataLoader(async (userIds: string[]) => {
      const todos = await Store.listTodos({ userIds });
      const todosByUser = todos.reduce((acc, todo) => {
        if (!acc[todo.ownerId]) {
          acc[todo.ownerId] = [];
        }
        acc[todo.ownerId].push(todo);
        return acc;
      }, {});
      return userIds.map(userId => todosByUser[userId] || []);
    }),
  };
}
