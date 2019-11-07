export type Context = ReturnType<typeof context>;
import * as DataLoader from 'dataloader';
import * as Store from '../Store';

export function context({ req }) {
  /*
  'x-user' is for mocking authentication.
  Context is a great place to put authorization tokens
  so that you can pass them to downstream functions/services.
  */
  const userId = req.headers['x-user'] || 'default';

  return {
    userId,
    userDataLoader: new DataLoader(async (ids: string[]) => {
      const users = await Store.getUsers(ids);
      return ids.map(id => users[id] || null);
    }),
  };
}
