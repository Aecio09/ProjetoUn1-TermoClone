<nav>Termo</nav>


<a class="play" href="/Play">PLAY</a>

<a class="play" href="/About">ABOUT</a>

<body>
    
</body>

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
    .play {
        text-align: center;
        color: aliceblue;
        border: 2px solid black;
        font-size: 4em;
        left: 0px;
        display: block;
        margin-left: 800px;
        margin-right: 800px;
        margin-top: 50px;
        text-decoration: none;
        font-weight: bold;
        border-radius: 0.2em;
        line-height: 2;
        position: relative;
    }
    .play::before {
  content: '';
  width: 0;
  height: 2px;
  border-radius: 2px;
  background-color: #fff;
  position: absolute;
  bottom: -.25rem;
  left: 50%;
  transition: width .4s, left .4s;
}

.play:hover::before {
  width: 100%;
  left: 0;
}
    body {
        background-color: #292929;
    }
</style>