<script lang="ts">
    import "../../../style/CssPlay.css";
    export let char;
    export let keypress;
    export let state = "";
</script>
<div class="key {state}" on:click={() => keypress(char.toUpperCase())}>
    {char.toUpperCase()}
</div>