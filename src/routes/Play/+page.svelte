<script>
    import Borda from "./Components/borda.svelte";
    import Teclado from "./Components/teclado.svelte";
    import { fim } from "./testes de codigo";
    import Fim from "./Components/Fim.svelte";
    import { fade } from "svelte/transition";
    import "../../style/Paginas.css"
</script>


<main>
    <nav>LETRIX</nav>

    {#if $fim}
        <Fim />
        {:else}
        <div in:fade = {{duration: 600}}>
        <Borda />
        <Teclado />
        </div>
    {/if}
</main>

<a class="menu__link" href="/">
    <span class="arrow"></span>
    BACK
</a>