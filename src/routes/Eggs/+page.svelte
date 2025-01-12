<script lang="ts">
    import { onMount } from "svelte";

    let dinoTop = 0; // Posição inicial do dinossauro (no chão)
    let isJumping = false; // Indica se o dinossauro está pulando
    let cactusLeft = 1855; // Posição inicial do cacto
    let stoneLeft = 1855; // Posição inicial da pedra
    let gameOver = false; // Estado do jogo
    let cactusInterval: any; // Variável para armazenar o intervalo de movimento do cacto
    let stoneInterval: any; // Variável para armazenar o intervalo de movimento da pedra
    let jumpCounter = 0; // Contador de pulos bem-sucedidos
    let contador = 0; // Contador de saltos bem-sucedidos
    let cactusSpeed = 20; // Velocidade inicial do cacto
    let stoneSpeed = 20; // Velocidade inicial da pedra

    // Função para o pulo
    const jump = () => {
        if (!isJumping && !gameOver) {
            isJumping = true;
            let upInterval = setInterval(() => {
                if (dinoTop >= 130) { // Altura máxima do salto
                    clearInterval(upInterval);
                    let downInterval = setInterval(() => {
                        if (dinoTop <= 0) { // Retorna ao chão
                            clearInterval(downInterval);
                            isJumping = false;
                            contar(); // Chama a função contar quando o pulo é bem-sucedido
                        } else {
                            dinoTop -= 7; // Descendo
                        } 
                    }, 20);
                } else {  
                    dinoTop += 7; // Subindo
                }
            }, 20);
        }
    };

    // Função para mover o cacto
    const moveCactus = () => {
        cactusInterval = setInterval(() => {
            cactusLeft -= 5; // Move o cacto para a esquerda
            if (cactusLeft < -20) {
                cactusLeft = 1855; // Reseta o cacto quando sai da tela
            }
            // Colisão
            if (
                cactusLeft > 0 &&
                cactusLeft < 50 &&
                dinoTop === 0 // Colisão só no chão
            ) {
                clearInterval(cactusInterval);
                gameOver = true;
            }
        }, cactusSpeed); // Usa a variável `cactusSpeed` para controlar a velocidade
    };

    // Função para mover a pedra
    const moveStone = () => {
        stoneInterval = setInterval(() => {
            stoneLeft -= 5; // Move a pedra para a esquerda
            if (stoneLeft < -20) {
                stoneLeft = 1700; // Reseta a pedra quando sai da tela
            }
            // Colisão
            if (
                stoneLeft > 0 &&
                stoneLeft < 50 &&
                dinoTop === 0 // Colisão só no chão
            ) {
                clearInterval(stoneInterval);
                gameOver = true;
            }
        }, stoneSpeed); // Usa a variável `stoneSpeed` para controlar a velocidade
    };

    // Função para reiniciar o jogo
    function restarParafalse() {
        // Reseta as variáveis para o estado inicial
        dinoTop = 0;
        isJumping = false;
        cactusLeft = 1855;
        stoneLeft = 1855;
        gameOver = false;
        contador = 0; // Resetando o contador quando o jogo é reiniciado
        jumpCounter = 0; // Resetando o contador de pulos
        cactusSpeed = 20;
        stoneSpeed = 20;

        // Para os obstáculos em movimento anterior e reinicia o movimento
        clearInterval(cactusInterval);
        clearInterval(stoneInterval);
        moveCactus(); // Reinicia o movimento do cacto
        moveStone(); // Reinicia o movimento da pedra
    }

    // Função para contar saltos bem-sucedidos
    function contar() {
        if (!gameOver) {
            contador = contador + 1; // Incrementa o contador
            jumpCounter += 1; // Aumenta o contador de pulos bem-sucedidos

            // Se o número de pulos bem-sucedidos atingir 5, aumenta a velocidade dos obstáculos
            if (jumpCounter % 5 === 0) {
                cactusSpeed -= 2; // Aumenta a velocidade do cacto (diminui o intervalo)
                stoneSpeed -= 2; // Aumenta a velocidade da pedra (diminui o intervalo)
                clearInterval(cactusInterval); // Para o intervalo atual do cacto
                clearInterval(stoneInterval); // Para o intervalo atual da pedra
                moveCactus(); // Reinicia o movimento do cacto com a nova velocidade
                moveStone(); // Reinicia o movimento da pedra com a nova velocidade
            }
        }
    }

    // Inicia os obstáculos ao montar o componente
    onMount(() => {
        moveCactus(); // Inicia o movimento do cacto
        moveStone(); // Inicia o movimento da pedra
        window.addEventListener("keydown", handleKeyDown);
    });

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === " " && !gameOver) { // Verifica se a tecla de espaço foi pressionada
            jump();
        }
        if (event.key === " " && gameOver) {
            restarParafalse(); // Reinicia o jogo ao pressionar espaço quando o jogo acabar
        }
    };
</script>

<nav>DINOSSAURO</nav>


<a class="menu__link" href="/">BACK</a>


<div class="game" on:click={jump}>
    <div class="dino" style="bottom: {dinoTop}px;"></div>
    <div class="cactus" style="left: {cactusLeft}px;"></div>
    <div class="stone" style="left: {stoneLeft}px;"></div>
    <div class="game-over {gameOver ? 'active' : ''}">
        Fim De Jogo
    </div>
</div>

<div class="contagem"><h2>RECORDE = {contador}</h2></div>
<style>
    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
    }

    .game {
        position: relative; top: 20px;
        width: 1850px;
        height: 200px;
        background-color: #292929;
        border: 2px solid black;
        overflow: hidden;
    }

    .dino {
        position: absolute;
        width: 40px;
        height: 45px;
        background-image: url('dino.png');
        background-size: cover;
        bottom: 20px;
        left: 50px;
        transition: bottom 0.1s linear;
    }

    .cactus {
        position: absolute;
        width: 40px;
        height: 40px;
        background-image: url('cacto.png');
        background-size: cover;
        bottom: -10px;
        left: 400px;
    }

    .stone { 
        position: absolute;
        width: 40px;
        height: 40px;
        background-image: url('pedra.png');
        background-size: cover;
        bottom: -10px;
        left: 1300px;
    }

    .game-over {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #e74c3c;
        font-weight: bold;
        display: none;
    }

    .game-over.active {
        display: block;
    } 
    .contagem {
        margin-top: 50px;
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

.menu__link:hover::before {
  width: 100%;
}
</style>