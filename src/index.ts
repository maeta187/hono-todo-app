import { Hono } from 'hono';
import { todos } from './todos/api';
import { basicAuth } from 'hono/basic-auth';

const app = new Hono();

app.use(
	'/api/*',
	basicAuth({
		username: 'admin',
		password: 'admin',
	})
);

app.route('/api/todos', todos);

export default app;
