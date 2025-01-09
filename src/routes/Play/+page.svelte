<script>
    import Borda from "./Components/borda.svelte";
    import Teclado from "./Components/teclado.svelte";
    import { fim } from "./testes de codigo";
    import Fim from "./Components/Fim.svelte";
    import { fade } from "svelte/transition";
</script>


<main>
    <nav>Termo</nav>

    {#if $fim}
        <Fim />
        {:else}
        <div in:fade = {{duration: 600}}>
        <Borda />
        <Teclado />
        </div>
    {/if}
</main>

<a class="menu__link" href="/">BACK</a>

<style>
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