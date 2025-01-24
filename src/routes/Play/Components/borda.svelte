<script lang="ts">
    import { borda } from "../testes de codigo"
    import Celulas from "./celulas.svelte";
    import "/arquivos temporarios/testept2/src/style/CssPlay.css"
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