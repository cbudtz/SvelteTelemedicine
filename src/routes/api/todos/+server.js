import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma';


export const GET = async (request) => {
    const todos = await prisma.todo.findMany({
        include: {author: true}
    });
    return json(todos);
}

export const POST = async ({ request }) => {
    const todo = await request.json();
    const result = await prisma.todo.create({data:todo});
    return json(result);
}