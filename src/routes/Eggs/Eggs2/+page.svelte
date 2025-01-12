<script lang="ts">
    import { onMount } from "svelte";

let palavraAtual = ""
let entrada = ""
let ativo: boolean = false
let time: number = 30
let score = 0

let palavra = [
    "palavra", "piranha", "vasco", 'jardim', 'jogo', 'elefante', 'jacaré', 'sol', 'quadro', 'montanha', 'foca', 'gelo', 'guerra', 
'sombra', 'futebol', 'cavalo', 'rosa', 'dente', 'gato', 'jogo', 'zelo', 'inseto', 'desejo', 
'vulcão', 'rato', 'kiwi', 'zebra', 'yoga', 'serpente', 'espero', 'olho', 'noite', 'sorvete', 
'herói', 'kiwi', 'banco', 'vento', 'quadro', 'mel', 'zangado', 'limoeiro', 'óculos', 'lâmpada', 
'vaca', 'laranja', 'trem', 'intenção', 'xadrez', 'leão', 'praia', 'grande', 'guarda', 'hábito', 
'quente', 'ilha', 'quadro', 'xícara', 'pente', 'amarelo', 'dado', 'escola', 'carro', 'hipopotamo', 
'navio', 'homem', 'decoração', 'abóbora', 'bicho', 'herói', 'igreja', 'esmalte', 'tigre', 'urso', 
'xadrez', 'luz', 'olho', 'energia', 'festa', 'yogurte', 'umidade', 'uvas', 'abacaxi', 'xadrez', 
'alarme', 'caminho', 'música', 'pão', 'yoga', 'nascimento', 'tarefa', 'cachorro', 'pássaro', 
'kilograma', 'caneta', 'mestre', 'océano', 'flor', 'nuvem', 'amigo', 'urso', 'tesoura', 'jardim', 
'fogo'
]

function seleRandom () {
    const random = Math.floor(Math.random() * palavra.length)
    return palavra[random]
}
function IniciarJogo () {
time = 60
entrada = ""
palavraAtual = seleRandom()
ativo = true
score = 0

 timer = setInterval(() => {
      if (time > 0) {
        time--;
      } else {
        endGame();
      }
    }, 1000);
  }
  function endGame (){
    ativo = false
    if (timer) clearInterval(timer)
  }
function checkEntrada (){
    if (entrada.trim() === palavraAtual){
        score++
        entrada = ""
        palavraAtual = seleRandom()
        time += 0
    }
}
</script>
<nav>Digitação</nav>
<a class="menu__link" href="/">BACK</a>

    <div class="container">
      <h1>Jogo de Digitação</h1>
      {#if ativo}
        <div>
          <div class="word">{palavraAtual.toUpperCase()}</div>
          <input
            type="text"
            bind:value={entrada}
            on:input={checkEntrada}
            placeholder="Digite aqui..."
            autofocus
          />
          <div class="stats">
            <p>Pontuação: {score}</p>
            <p>Tempo restante: {time} segundos</p>
          </div>
        </div>
      {:else}
        <div class="game-over">
          <p>Fim de Jogo!</p>
          <p>Sua pontuação final: {score}</p>
          <button on:click={IniciarJogo}>Iniciar Jogo</button>
        </div>
      {/if}
    </div>
    <body>

    </body>
<style>
body {
  background-color: #292929; /* Cor de fundo desejada */
  height: 100vh; /* 100% da altura da janela */
  margin: 0;
}
  .container {
    text-align: center;
    background: #1C1C1C;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 400px;
    position: relative;
    left: 38%;
    top: 90px;
    border: 2px solid black;
    align-items: center;
  }
  h1 {
    color: aliceblue;
  }

  .word {
    font-size: 24px;
    font-weight: bold;
    color: aliceblue;
    margin-bottom: 20px;
  }

  input {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 20px;
    outline: none;
  }

  .stats {
    font-size: 16px;
    color: aliceblue;
  }

  .game-over {
    color: aliceblue;
  }

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #1C1C1C;
    color: aliceblue;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #292929;
  }
  nav {
        background-color: #1C1C1C;
        color: aliceblue;
        font-weight: bold;
        padding: 15px;
        font-size: 3em;
        text-align: center;
        margin-top: -20px;
        margin-left: -10px;
        margin-right: -10px;
    }
    a {
        text-decoration: none;
    }
    .menu__link {
        color: aliceblue;
        line-height: 2;
        position: absolute;
        top: 0;
        left: 10px;
    }

    .menu__link::before {
        content: '';
        width: 0;
        height: 2px;
        border-radius: 2px;
        background-color: #fff;
        position: absolute;
        bottom: -.25rem;
        left: 0;
        transition: width .4s;
    }
s
    .menu__link:hover::before {
        width: 100%;
    }
</style>