<script lang="ts">
    import { borda } from "../Store"
    import Celulas from "./celulas.svelte";
    import "../../../style/CssPlay.css"
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