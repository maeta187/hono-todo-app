import { Hono } from 'hono';

let todoList = [
	{ id: '1', title: 'Learning Hono', completed: false },
	{ id: '2', title: 'Watch the movie', completed: false },
	{ id: '3', title: 'Buy milk', completed: false },
];

const findTodo = (id: string) => todoList.find((v) => v.id === id);

// 一覧取得
const todos = new Hono();
todos.get('/', (c) => c.json(todoList));

// 新規登録
todos.post('/', async (c) => {
	const param = await c.req.json<{ title: string }>();
	const newTodo = {
		id: String(todoList.length + 1),
		completed: false,
		title: param.title,
	};

	todoList = [...todoList, newTodo];

	return c.json(newTodo, 201);
});

// 更新
todos.put('/:id', async (c) => {
	// idはルート定義から補完が効く
	const id = c.req.param('id');
	const todo = findTodo(id);

	if (!todo) {
		return c.json({ message: 'Not Found' }, 404);
	}

	const param = (await c.req.parseBody()) as {
		title?: string;
		completed?: boolean;
	};
	todoList = todoList.map((v) => {
		if (v.id === id) {
			return { ...v, ...param };
		} else {
			return v;
		}
	});

	return new Response(null, { status: 204 });
});

// 削除
todos.delete('/:id', async (c) => {
	const id = c.req.param('id');
	const todo = findTodo(id);
	if (!todo) {
		return c.json({ message: 'not found' }, 404);
	}
	todoList = todoList.filter((todo) => todo.id !== id);

	return new Response(null, { status: 204 });
});

export { todos };
