<script lang="ts">
import { palavra, adv, info, cores, criarGrid, borda, fim } from "../testes de codigo";

function jogarnovamente() {

    let listapalavras : string = [
  'abaco', 'batia', 'calor', 'dolar', 'elise', 'fazer', 'girar', 'haver', 'jogar',
   'lados', 'manto', 'nuvem', 'olhos', 'poder', 'quase', 'raiar', 'saber', 'tarde', 'viver', 'lazer', 'zebra', 'caixa', 'banco', 'letra', 'norte', 'amigo', 'grupo',
  'gente', 'navio', 'corte', 'quase', 'vazio', 'temer', 'poder', 'clima', 'jogar', 'visto',
  'carta', 'saque', 'julho', 'aviso', 'louca', 'louco', 'olhos', 'carne', 'reais', 'homem', 'mundo',
]

let palavrinha : string = listapalavras[Math.floor(Math.random() * listapalavras.length)]
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
</div>

<div class="center">
    <button on:click={jogarnovamente}>TENTAR DE NOVO</button>
</div>

<style>
    strong{
        font-weight: 900;
    }
    h3{
        font-size: 2em;
        color: aliceblue;
    }
    button {
        background-color: #1C1C1C;
        color: aliceblue;
        margin-top: 20px;
        padding: 20px 50px;
        cursor: pointer;
        border: 5em;
        border-color: black;
        border: 2px solid black;
        font-weight: bold;
        border-radius: 0.2em;
    }
    button:hover {
 animation: shake3856 0.3s linear infinite both;
}

@keyframes shake3856 {
 0% {
  -webkit-transform: translate(0);
  transform: translate(0);
 }

 20% {
  -webkit-transform: translate(-2px, 2px);
  transform: translate(-2px, 2px);
 }

 40% {
  -webkit-transform: translate(-2px, -2px);
  transform: translate(-2px, -2px);
 }

 60% {
  -webkit-transform: translate(2px, 2px);
  transform: translate(2px, 2px);
 }

 80% {
  -webkit-transform: translate(2px, -2px);
  transform: translate(2px, -2px);
 }

 100% {
  -webkit-transform: translate(0);
  transform: translate(0);
 }
}

    .center {
        margin: 20px auto;
        width: fit-content;
        text-align: center;
    }
</style>