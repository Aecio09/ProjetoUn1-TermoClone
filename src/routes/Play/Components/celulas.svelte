<script lang="ts">
    import { borda, cores } from "../testes de codigo";
    import "/arquivos temporarios/testept2/src/style/CssPlay.css"
    export let x
    export let y
    $: letras = $borda[y][x]
    $: cor = $cores [y][x]
</script>

<div class = {`celulas ${cor}`}>
    {letras}
</div>