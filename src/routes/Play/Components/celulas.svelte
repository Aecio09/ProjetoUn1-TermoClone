<script lang="ts">
    import { borda, cores } from "../testes de codigo";

    export let x
    export let y
    $: letras = $borda[y][x]
    $: cor = $cores [y][x]
</script>

<div class = {`celulas ${cor}`}>
    {letras}
</div>

<style>
    .celulas{
        width: 70px; height: 70px;
        color: white;
        background-color: #1C1C1C;
        margin: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 55px;
        border-radius: 5px;
        transition: background-color .7s;
        border: 1px solid black;

    }
    .correto{
        background-color: #0c6834;
    }
    .quase {
        background-color: #ff8c00;
    }
    .errado{
        background-color: #292929;
    }
    .errado2 {
        background-color: #9c0000;
    }
</style>