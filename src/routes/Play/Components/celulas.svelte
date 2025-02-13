<script lang="ts">
    import { borda, cores, info } from "../Store";
    import "../../../style/CssPlay.css";

    export let x: number; 
    export let y: number; 

    $: letras = $borda[y][x]; 
    $: cor = $cores[y][x];
    $: selecionada = $info.Tentativa === y && $info.Char === x;

    function handleClick() {
        if (y === $info.Tentativa) {
            info.set({
                Tentativa: y,
                Char: x,
            });
        }
    }
</script>

<div class={`celulas ${cor} ${selecionada ? 'selecionada' : ''}`} on:click={handleClick}>
    {letras}
</div>