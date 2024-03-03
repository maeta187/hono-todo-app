import { Hono } from 'hono';

let todoList = [
	{ id: '1', title: 'Learning Hono', completed: false },
	{ id: '2', title: 'Watch the movie', completed: false },
	{ id: '3', title: 'Buy milk', completed: false },
];

const todos = new Hono();
todos.get('/', (c) => c.json(todoList));

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

export { todos };
