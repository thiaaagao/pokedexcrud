
function cadastrarPokemon(){
    pokeTemp.pokemon = document.getElementById("inputId").value;
    pokeTemp.tipo = document.getElementById("inputType").value;

    if (!pokeTemp.pokemon || !pokeTemp.tipo) {
        alert('Preencha todos os campos!')
        return;
    }
    createPokemon(pokeTemp);
}



// var inputs = $('input').on('keyup', verificarInputs);

// function verificarInputs() {
//     const preenchidos = inputs.get().every(({value}) => value)
//     $('button').prop('disabled', !preenchidos);
// }


const pokeTemp = {
    pokemon: 'dragonite',
    tipo: 'fogo'
}

// FUNCAO SET AND GET DB
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_pokemon')) ?? []
const setLocalStorage = (dbPokemon) => localStorage.setItem('db_pokemon', JSON.stringify(dbPokemon))

// C - CREATE POKEMON
const createPokemon = (pokemon) => {
    const dbPokemon = getLocalStorage()
    dbPokemon.push (pokemon)
    setLocalStorage(dbPokemon)
}
// R - READ POKE
const readPoke = () => getLocalStorage()

// U - UPDATE
const updatePoke = (index, pokemon) => {
    const dbPokemon = readPoke()
    dbPokemon[index] = pokemon;
    setLocalStorage(dbPokemon)
}

// D - DELETE
const deletePoke = (index) => {
    const dbPokemon = readPoke()
    dbPokemon.slice(index, 1)
    setLocalStorage(dbPokemon)
}