import { writable } from "svelte/store"

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
export const palavra = writable("CARRO")
export const adv = writable("")
export const cores = writable(criarGrid())
export const fim = writable(false)