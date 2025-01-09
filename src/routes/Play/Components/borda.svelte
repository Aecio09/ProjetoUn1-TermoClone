<script lang="ts">
    import { borda } from "../testes de codigo"
    import Celulas from "./celulas.svelte";
</script>

<div class="game">
    {#each $borda as coluna, y}
        <div class="linhas">
            {#each coluna as linhas, x}
                <Celulas {y} {x}/>
            {/each}
        </div>
    {/each}
</div>

<style>
    .game{
        margin: 50px auto;
        width: fit-content;
    }
    .linhas{
        display: flex;
    }
</style>