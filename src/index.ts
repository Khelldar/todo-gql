import * as express from 'express';
import * as cors from 'cors';
import { ENV } from './env';
import { server } from './GraphQL';
import { migrate } from './Store';

console.log('starting up!');
console.log(ENV);

//make sure our database is up to date
migrate();

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: ENV.PORT }, () => {
  console.log(`listening at :${ENV.PORT}...`);
});
