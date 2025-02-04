import { writable } from "svelte/store"

let listapalavras = [
    'abaco', 'batia', 'calor', 'dolar', 'elise', 'fazer', 'girar', 'haver', 'jogar',
     'lados', 'manto', 'nuvem', 'olhos', 'poder', 'quase', 'raiar', 'saber', 'tarde', 'viver', 'lazer', 'zebra', 'caixa', 'banco', 'letra', 'norte', 'amigo', 'grupo',
    'gente', 'navio', 'corte', 'quase', 'vazio', 'temer', 'poder', 'clima', 'jogar', 'visto',
    'carta', 'saque', 'julho', 'aviso', 'louca', 'louco', 'olhos', 'carne', 'reais', 'homem', 'mundo',
  ]


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