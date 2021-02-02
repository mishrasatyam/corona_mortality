<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Halfmoon/1.1.1/js/halfmoon.min.js"></script>
</svelte:head>
<script>
    
    function toggleDemo() {
      halfmoon.toggleDarkMode();
    }
</script>
<svg on:click={toggleDemo} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-moon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M14.53 10.53a7 7 0 0 1-9.058-9.058A7.003 7.003 0 0 0 8 15a7.002 7.002 0 0 0 6.53-4.47z"/>
</svg>

<style>
    svg{
        cursor: pointer;
    }
</style>
