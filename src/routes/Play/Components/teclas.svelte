<script lang="ts">
    export let char;
    export let keypress;
    export let state = ""; // Estado dinâmico da tecla (e.g., "correto", "quase", "errado")
</script>

<div class="key {state}" on:click={() => keypress(char.toUpperCase())}>
    {char.toUpperCase()}
</div>

<style>
    .key {
        background-color: #1C1C1C;
        color: whitesmoke;
        padding: 20px 18px;
        margin: 4px 3px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s;
        border: 1px solid black;
    }

    .key:hover {
        background-color: #292929;
    }
    

    .errado {
        background-color: #292929;
        border: 1px solid black;

    }
</style>
