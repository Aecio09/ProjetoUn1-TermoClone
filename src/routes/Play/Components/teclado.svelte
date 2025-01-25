<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Key from "./teclas.svelte";
    import { adv, borda, cores, fim, info, palavra } from "../testes de codigo";
    import "../../../style/CssPlay.css"

    const linha1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const linha2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const linha3 = ["ENTER", 'z', 'x', 'c', 'v', 'b', 'n', 'm', "DEL"];

    // Função para gerenciar a tecla "DEL"
    function handleDel() {
        if ($info.Char === 0) return;

        info.update((prev) => ({
            Char: prev.Char - 1,
            Tentativa: prev.Tentativa,
        }));

        borda.update((prevborda) => {
            let novaborda: any = prevborda;
            novaborda[$info.Tentativa][$info.Char] = "";
            return novaborda;
        });
    }

    // Função para gerenciar a tecla "ENTER"
    function handleEnter() {
    let { Tentativa, Char }: any = $info;
    if (Char !== 5) return;

    info.set({
        Tentativa: Tentativa + 1,
        Char: 0,
    });

    let prevtentativa = $info.Tentativa - 1;
    let novaCor: any = $cores;
    let CharDuplos = new Set();

    // Primeira parte: marcar todas as teclas como pressionadas inicialmente, se não forem "correto" ou "quase"
    for (let i = 0; i < 5; i++) {
        if (novaCor[prevtentativa][i] !== "correto" && novaCor[prevtentativa][i] !== "quase") {
            novaCor[prevtentativa][i] = "pressionada"; // Marca como pressionada inicialmente
        }
    }

    // Segunda parte: fazer a comparação com a palavra e ajustar a cor conforme necessário
    for (let i = 0; i < 5; i++) {
        let char = $borda[prevtentativa][i].toUpperCase();
        adv.update((prevchars) => prevchars + char);

        // Se a letra for correta, marca como "correto"
        if ($palavra[i].toUpperCase() === char) {
            novaCor[prevtentativa][i] = "correto"; // Prioridade mais alta
        }
        // Se a letra está na palavra, mas na posição errada
        else if ($palavra.toUpperCase().includes(char) && novaCor[prevtentativa][i] !== "correto") {
            if (!CharDuplos.has(char)) {
                novaCor[prevtentativa][i] = "quase"; // Se a letra está na palavra mas na posição errada
                CharDuplos.add(char);
            }
        }
        // Se a letra não está na palavra
        else {
            novaCor[prevtentativa][i] = "errado"; // Se a letra não está na palavra, marca como "errado"
        }
    }

    // Modificação para o caso das teclas que estão em "pressionada"
    for (let i = 0; i < 5; i++) {
        // Se a tecla estava "pressionada" e a letra não foi correta, transforma em "errado"
        if (novaCor[prevtentativa][i] === "pressionada") {
            let char = $borda[prevtentativa][i].toUpperCase();
            if ($palavra[i].toUpperCase() !== char) {
                novaCor[prevtentativa][i] = "errado"; // Marca como errado caso a letra não seja correta
            }
        }
    }

    // Verificação final após todas as comparações
    if (prevtentativa == 5) { // Se for a última tentativa
        if ($adv === $palavra.toUpperCase()) {
            for (let i = 0; i < 5; i++) {
                novaCor[prevtentativa][i] = "correto"; // Marca tudo como "correto" se a palavra estiver correta
            }
        } else {
            for (let i = 0; i < 5; i++) {
                novaCor[prevtentativa][i] = "errado2"; // Marca tudo como "errado2" se a palavra estiver errada
            }
        }
    }

    cores.set(novaCor);

    setTimeout(() => {
        if ($adv === $palavra.toUpperCase() || prevtentativa === 5) {
            fim.set(true); // Fim do jogo se a palavra estiver correta ou a última tentativa for feita
        } else {
            adv.set(""); // Limpa a palavra tentada e começa uma nova tentativa
        }
    }, 2000);
}
    // Função para gerenciar teclas individuais
    function keypress(char: string = "") {
        if (char === "DEL") {
            handleDel();
        } else if (char === "ENTER") {
            handleEnter();
        } else {
            let { Tentativa, Char }: any = $info;
            if (Char === 5) return;

            borda.update((prevborda) => {
                let novaborda: any = prevborda;
                novaborda[$info.Tentativa][$info.Char++] = char.toUpperCase();
                return novaborda;
            });
        }
    }

    // Função para lidar com pressionamento de teclas físicas
    function handleKeydown(event: KeyboardEvent) {
        const key = event.key.toUpperCase();
        if (key === "ENTER") {
            keypress("ENTER");
        } else if (key === "BACKSPACE") {
            keypress("DEL");
        } else if (/^[A-Z]$/.test(key)) {
            keypress(key); // Trata letras do alfabeto
        }
    }

    // Adicionar e remover o listener global
    onMount(() => {
        window.addEventListener("keydown", handleKeydown);
    });

    onDestroy(() => {
        window.removeEventListener("keydown", handleKeydown);
    });

    // Função para determinar o estado de uma tecla
// Função para determinar o estado de uma tecla
function getKeyState(char: string) {
    let highestState = ""; // Variável para armazenar o estado mais forte da tecla
    for (let tentativa = 0; tentativa < $cores.length; tentativa++) {
        for (let i = 0; i < $cores[tentativa].length; i++) {
            if ($borda[tentativa][i].toUpperCase() === char.toUpperCase()) {
                const currentState = $cores[tentativa][i];

                // Se a tecla for "correto", é a prioridade mais alta
                if (currentState === "correto") return "correto"; 
                // Se a tecla for "quase" e não foi marcado como "correto", registra como "quase"
                if (currentState === "quase" && highestState !== "correto") highestState = "quase";
                // Se a tecla for "pressionada" e não foi marcada como "correto" ou "quase", registra como "pressionada"
                if (currentState === "pressionada" && !highestState) highestState = "pressionada";
                // Se a tecla for "errado" e nenhum estado mais forte foi encontrado, registra como "errado"
                if (currentState === "errado" && !highestState) highestState = "errado";
            }
        }
    }

    return highestState; // Retorna o estado mais relevante
}

</script>

<div class="teclado">
    <div class="linha">
        {#each linha1 as char}
            <Key {char} keypress={keypress} state={getKeyState(char)} />
        {/each}
    </div>

    <div class="linha">
        {#each linha2 as char}
            <Key {char} keypress={keypress} state={getKeyState(char)} />
        {/each}
    </div>

    <div class="linha">
        {#each linha3 as char}
            <Key {char} keypress={keypress} state={getKeyState(char)} />
        {/each}
    </div>
</div>