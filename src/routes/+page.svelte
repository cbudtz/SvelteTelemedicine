<script>
    import { Button,Input } from 'sveltestrap';
    let todo = {text:""}
    let todos;

    const getTodos = async ()=>{
        const res = await fetch('api/todos');
        todos = await res.json();
    }
    const postTodo = async ()=>{
        const res = await fetch('api/todos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        todos = [...todos,await res.json()];
    }
</script>
<h1>Den store TODO app</h1>
<Input bind:value={todo.text}></Input>
<Button on:click={postTodo}>Make Todo</Button>
<Button on:click={getTodos}>Get Todos</Button>

    {#if todos}
    <ul>
        {#each todos as todo (todo.id)}
            <li>{todo.text}</li>
        {/each}
    </ul>
    {/if}