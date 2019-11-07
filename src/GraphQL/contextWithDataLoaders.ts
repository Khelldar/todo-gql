import {
  newUserTodosDataLoader,
  newUserDataLoader,
  newBoardTododsDataLoader,
  newBoardDataLoader,
} from './DataLoaders';

export type Context = ReturnType<typeof context>;

export function context({ req }) {
  /*
  'x-user' is for mocking authentication.
  Context is a great place to put authorization tokens
  so that you can pass them to downstream functions/services.
  */
  const userId = req.headers['x-user'] || 'default';

  return {
    userId,
    userDataLoader: newUserDataLoader(),
    boardDataLoader: newBoardDataLoader(),
    boardTodosDataLoader: newBoardTododsDataLoader(),
    userTodosDataLoader: newUserTodosDataLoader(),
  };
}
