<script lang="ts">
    import "../../style/cssAbout.css";

    let texto = "No projeto, a IA foi utilizada em vários aspectos, como na resolução de bugs e na criação de funções para o jogo. Um exemplo disso foi quando tivemeos um problema ao verificar se o jogador poderia apertar Enter. Com a ajuda da IA, esse problema foi resolvido facilmente.";
    let participantes = ["Aécio Barbosa", "Arthur Pontes", "João Henrique", "Matheus Silva","Cristiano Caldas"];
</script>
<nav>LETRIX</nav>

<div class="center-box-container">
<div class="box">
    <h2>Uso da IA</h2>
    <h3>{texto}</h3>
    <div class="participantes">
      <h3>Participantes</h3>
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