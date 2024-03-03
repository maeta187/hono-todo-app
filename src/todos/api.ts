import { Hono } from 'hono';

let todoList = [
	{ id: '1', title: 'Learning Hono', completed: false },
	{ id: '2', title: 'Watch the movie', completed: false },
	{ id: '3', title: 'Buy milk', completed: false },
];

const todos = new Hono();
todos.get('/', (c) => c.json(todoList));

export { todos };
