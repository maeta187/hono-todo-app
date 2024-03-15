import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { Bindings } from '../interface/bindings';
import { createTodo, CreateTodo, deleteTodo, getTodo, getTodos, updateTodo, UpdateTodo } from '../model';

const todos = new Hono<{ Bindings: Bindings }>();

// 一覧取得
todos.get('/', async (c) => {
	const todos = await getTodos(c.env.HONO_TODO);
	return c.json(todos);
});

// 新規登録
todos.post(
	'/',
	validator('json', (value: { title: string }, c) => {
		const title = value.title.trim();
		if (!title.length || typeof title !== 'string') {
			return c.text('Invalid!', 400);
		}
		return {
			body: title,
		};
	}),
	async (c) => {
		const param = await c.req.json<CreateTodo>();
		const newTodo = await createTodo(c.env.HONO_TODO, param);

		return c.json(newTodo, 201);
	}
);

// 更新
todos.put('/:id', async (c) => {
	// idはルート定義から補完が効く
	const id = c.req.param('id');
	const todo = await getTodo(c.env.HONO_TODO, id);
	if (!todo) {
		return c.json({ message: 'not found' }, 404);
	}
	const param = await c.req.json<UpdateTodo>();

	await updateTodo(c.env.HONO_TODO, id, param);

	return new Response(null, { status: 204 });
});

// 削除
todos.delete('/:id', async (c) => {
	const id = c.req.param('id');
	const todo = await getTodo(c.env.HONO_TODO, id);
	if (!todo) {
		return c.json({ message: 'not found' }, 404);
	}

	await deleteTodo(c.env.HONO_TODO, id);

	return new Response(null, { status: 204 });
});

export { todos };
