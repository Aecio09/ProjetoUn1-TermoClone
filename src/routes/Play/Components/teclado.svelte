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
            let novaborda = prevborda;
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

            if ($palavra[i].toUpperCase() === char) {
                novaCor[prevtentativa][i] = "correto";
            } else if ($palavra.toUpperCase().includes(char)) {
                novaCor[prevtentativa][i] = "quase";
            } else {
                novaCor[prevtentativa][i] = "errado";
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
                let novaborda = prevborda;
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
    function getKeyState(char: string) {
        for (let tentativa = 0; tentativa < $cores.length; tentativa++) {
            for (let i = 0; i < $cores[tentativa].length; i++) {
                if ($borda[tentativa][i].toUpperCase() === char.toUpperCase()) {
                    return $cores[tentativa][i]; // Retorna "correto", "quase" ou "errado"
                }
            }
        }
        return ""; // Sem estado definido
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
