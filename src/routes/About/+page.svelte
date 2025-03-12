<script lang="ts">
    import "../../style/cssAbout.css";

    let texto ="In the project, AI was used in various aspects, such as bug fixing and function creation for the game. One example of this was when we had an issue checking if the player could press Enter. With the help of AI, this problem was easily resolved."
    let participantes = ["Aécio Barbosa", "Arthur Pontes", "João Henrique", "Matheus Silva","Cristiano Caldas"];
</script>
<nav>LETRIX</nav>

<div class="center-box-container">
<div class="box">
    <h2>Use of AI</h2>
    <h3>{texto}</h3>
    <div class="participantes">
      <h3>Participants</h3>
      <ul>
        {#each participantes as nome}
          <li>{nome}</li>
        {/each}
      </ul>
    </div>
  </div>
</div>
<img src="ifpe_logo.png" alt="">

<a class="botao-link" href="Eggs/Eggs2">Ir para Eggs2</a>

<a class="menu__link" href="/">
    <span class="arrow"></span>
    BACK
</a>