<script lang="ts">
import { palavra, adv, info, cores, criarGrid, borda, fim } from "../Store";
import { listapalavrass } from "../Store";
import "../../../style/FimDoJogo.css"

function jogarnovamente() {
let palavrinha : string = $listapalavrass[Math.floor(Math.random() * $listapalavrass.length)]
palavra.set(palavrinha)

    info.set({
        Tentativa: 0,
        Char: 0
    })
    adv.set("")
    cores.set(criarGrid())
    borda.set(criarGrid())
    fim.set(false)
}
</script>

<div class="center">
    <h3>A palavra certa era: <strong>{$palavra.toUpperCase()}</strong></h3>
    <h3>Sua palavra: <strong>{$adv}</strong></h3>
    <button on:click={jogarnovamente}>TENTAR DE NOVO</button>
</div>