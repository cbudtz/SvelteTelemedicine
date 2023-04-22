import { json } from '@sveltejs/kit';

const todos = [{id: 1, text: 'Todo 1'}, {id: 2, text: 'Todo 2'}];

export const GET = async (request) => {
    return json(todos);
}

export const POST = async ({request}) => {
    const todo = await request.json();
    todo.id = todos.length + 1;
    todos.push(todo);
    return json(todo);
}