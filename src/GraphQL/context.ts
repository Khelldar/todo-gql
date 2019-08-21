export type Context = ReturnType<typeof context>;

export function context({ req }) {
  //this is a standin for real authentication
  const userId = req.headers['x-user'] || 'default';
  return {
    userId,
  };
}
