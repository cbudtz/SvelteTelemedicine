<script>
    import { Button,Input } from 'sveltestrap';
    let todo = {text:""}
    let todos;

    const getTodos = async ()=>{
        const res = await fetch('api/todos');
        todos = await res.json();
        return todos;
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
<Button on:click={()=>postTodo()}>Make Todo</Button>
<Button on:click={()=>todos = getTodos()}>Get Todos</Button>
{JSON.stringify(todos)}

{#await todos}
    <p>loading...</p>
{:then todos}
    {#if todos}
    <ul>
        {#each todos as todo (todo.id)}
            <li>{todo.text}</li>
        {/each}
    </ul>
    {/if}
{/await}