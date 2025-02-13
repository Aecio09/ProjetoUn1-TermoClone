<script lang="ts">
    import "../../../style/CssPlay.css";
    export let char;
    export let keypress;
    export let state = "";
</script>

<button type="button" class="key {state}" on:click={() => keypress(char.toUpperCase())} aria-label="{char.toUpperCase()} key">
    {char.toUpperCase()}
</button>