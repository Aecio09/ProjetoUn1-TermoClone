<script lang="ts">
    import Key from "./teclas.svelte";
    import { adv, borda, cores, fim, info, palavra } from "../testes de codigo";
    import "../../../style/CssPlay.css"

    const linha1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const linha2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const linha3 = ["ENTER", 'z', 'x', 'c', 'v', 'b', 'n', 'm', "DEL"];

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

    function handleEnter() {
        let { Tentativa, Char }: any = $info;
        if (Char !== 5) return;

        info.set({
            Tentativa: Tentativa + 1,
            Char: 0,
        });

        let prevtentativa = $info.Tentativa - 1;
        let novaCor: any = $cores;
        let CharCount = new Map();

        for (let i = 0; i < 5; i++) {
            let char = $palavra[i].toUpperCase();
            CharCount.set(char, (CharCount.get(char) || 0) + 1);
        }

        for (let i = 0; i < 5; i++) {
            let char = $borda[prevtentativa][i].toUpperCase();
            adv.update((prevchars) => prevchars + char);

            if ($palavra[i].toUpperCase() === char) {
                novaCor[prevtentativa][i] = "correto";
                CharCount.set(char, CharCount.get(char) - 1);
            }
        }

        for (let i = 0; i < 5; i++) {
            let char = $borda[prevtentativa][i].toUpperCase();
            if (novaCor[prevtentativa][i] !== "correto") {
                if ($palavra.toUpperCase().includes(char) && CharCount.get(char) > 0) {
                    novaCor[prevtentativa][i] = "quase";
                    CharCount.set(char, CharCount.get(char) - 1);
                } else {
                    novaCor[prevtentativa][i] = "errado";
                }
            }
        }

        cores.set(novaCor);

        setTimeout(() => {
            if ($adv === $palavra.toUpperCase() || prevtentativa === 5) {
                fim.set(true);
            } else {
                adv.set("");
            }
        }, 2000);
    }

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

    function getKeyState(char: string) {
        let highestState = "";
        for (let tentativa = 0; tentativa < $cores.length; tentativa++) {
            for (let i = 0; i < $cores[tentativa].length; i++) {
                if ($borda[tentativa][i].toUpperCase() === char.toUpperCase()) {
                    const currentState = $cores[tentativa][i];
                    if (currentState === "correto") return "correto";
                    if (currentState === "quase" && highestState !== "correto") highestState = "quase";
                    if (currentState === "pressionada" && !highestState) highestState = "pressionada";
                    if (currentState === "errado" && !highestState) highestState = "errado";
                }
            }
        }
        return highestState;
    }
</script>

<svelte:window on:keydown={e => keypress(e.key.toUpperCase() === "BACKSPACE" ? "DEL" : e.key.toUpperCase() === "ENTER" ? "ENTER" : /^[A-Z]$/.test(e.key.toUpperCase()) ? e.key.toUpperCase() : "")} />

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
