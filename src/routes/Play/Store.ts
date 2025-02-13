import { writable } from "svelte/store"

let listapalavras = [
    "amigo", "banco", "canto", "dardo", "estar", "falar", "gosto", "hotel", "ideia", "jogar",
    "lugar", "mundo", "nobre", "olhar", "pular", "quase", "risco", "saber", "tocar", "unido",
    "vazio", "zebra", "abrir", "bicho", "casar", "dizer", "etapa", "festa", "girar", "haste",
    "lindo", "marca", "nuvem", "ostra", "pedra", "quina", "rosto", "sinal", "tigre", "ultra",
    "velho", "xampu", "zumbi", "acaso", "bater", "corte", "danca", "ecoar", "fugir", "grito",
    "honra", "igual", "jovem", "lutar", "mesmo", "ninar", "opcao", "ponto", "quilo", "rival",
];


export function criarGrid (){
    let grid = []
    for (let i = 0; i < 6; i++){
        grid.push([])
        for(let j = 0; j < 5; j++)
            grid[i][j] = ""
        }
        return grid
}
export const info = writable ({
    Char: 0,
    Tentativa: 0
})
export const borda = writable(criarGrid())
export const palavra = writable (listapalavras[Math.floor(Math.random() * listapalavras.length)])
export const adv = writable("")
export const cores = writable(criarGrid())
export const fim = writable(false)
export const listapalavrass = writable(listapalavras)
export const posicao = writable(0)