<nav>Termo</nav>

<div class="alunos">
    <h2>ALUNOS:</h2>
    <ul>
        <li>Aécio barbosa </li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
    </ul>
</div>

<img src="ifpe.png" alt=""/>


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
    .alunos {
        left: 50%;
        font-size: 2em;
        font-weight: bold;
        color: aliceblue;
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