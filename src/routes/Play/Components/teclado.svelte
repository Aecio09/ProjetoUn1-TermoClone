<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import Key from "./teclas.svelte";
    import { adv, borda, cores, fim, info, palavra } from "../testes de codigo";

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

        for (let i = 0; i < 5; i++) {
            let char = $borda[prevtentativa][i].toUpperCase();
            adv.update((prevchars) => prevchars + char);

            // Verificar e atualizar estado da tecla
            if ($palavra[i].toUpperCase() === char) {
                novaCor[prevtentativa][i] = "correto"; // Prioridade mais alta
            } else if ($palavra.toUpperCase().includes(char) && novaCor[prevtentativa][i] !== "correto") {
                novaCor[prevtentativa][i] = "quase"; // Atualizar para "quase" se não for "correto"
            } else if (novaCor[prevtentativa][i] !== "correto" && novaCor[prevtentativa][i] !== "quase") {
                novaCor[prevtentativa][i] = "errado"; // Atualizar apenas se não for "correto" ou "quase"
            }
        }

        cores.set(novaCor);

        if ($adv === $palavra.toUpperCase() || prevtentativa === 5) {
            fim.set(true);
        } else {
            adv.set("");
        }
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
    function getKeyState(char: string) {
        let highestState = ""; // Variável para armazenar o estado mais forte da tecla
        for (let tentativa = 0; tentativa < $cores.length; tentativa++) {
            for (let i = 0; i < $cores[tentativa].length; i++) {
                if ($borda[tentativa][i].toUpperCase() === char.toUpperCase()) {
                    const currentState = $cores[tentativa][i];
                    if (currentState === "correto") return "correto"; // Estado mais forte
                    if (currentState === "quase") highestState = "quase"; // Atualizar se o estado for "quase"
                    if (!highestState) highestState = "errado"; // Atualizar para "errado" apenas se nenhum estado mais forte foi encontrado
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

<style>
    .teclado {
        position: fixed;
        width: fit-content;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%, 0%);
    }

    .linha {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
