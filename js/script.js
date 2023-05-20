// id = formPokemon
const isValidInputId = () => {
    return document.getElementById("formPokemon").reportValidity();
}


// id="pokemonName"
// id="pokemonType"
const clearInputs = () => {
    const inputs = document.querySelectorAll('.inputPokemon') // reset inputs blank
    inputs.forEach(input => input.value = '')
}

const cadastrarPokemon = () => {
    if (isValidInputId()) {
        const pokemon = {
            nomePokemon: document.getElementById("pokemonName").value,
            tipo: document.getElementById("pokemonType").value
        }
        createPokemon(pokemon)
        clearInputs()
        updateTable()
    }
}


/* ESSA MERDA VAI SAIR ! */
const pokeTemp = {
    nomePokemon: 'dragonite',
    tipo: 'dragao'
}

// FUNCAO SET AND GET DB
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_pokemon')) ?? [] // parse in JSON STRING
const setLocalStorage = (dbPokemon) => localStorage.setItem('db_pokemon', JSON.stringify(dbPokemon))

// C - CREATE POKEMON DB
const createPokemon = (pokemon) => {
    const dbPokemon = getLocalStorage()
    dbPokemon.push(pokemon)
    setLocalStorage(dbPokemon)
}

// R - READ POKE DB
const readPoke = () => getLocalStorage()

// U - UPDATE DB
const updatePoke = (index, pokemon) => {
    const dbPokemon = readPoke()
    dbPokemon[index] = pokemon;
    setLocalStorage(dbPokemon)
}

// D - DELETE DB
const deletePoke = (index) => {
    const dbPokemon = readPoke()
    dbPokemon.splice(index, 1)
    setLocalStorage(dbPokemon)
}

// create row
const createRow = (pokemon, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td style="border: 1px solid #000">${index + 1}</td>
        <td style="border: 1px solid #000">${pokemon.nomePokemon}</td>
        <td style="border: 1px solid #000">${pokemon.tipo}</td>
        <td style="border: 1px solid #000"><input type="button" id="edit-${index}" value="Editar Pokemon">&#124;<input
        type="button" id="delete-${index}" value="Deletar Pokemon">
        </td>
    `
    document.querySelector('#tablePokemon>tbody').appendChild(newRow)
    // id="tablePokemon"
}

// clear table
const clearTable = () => {
    const rows = document.querySelectorAll('#tablePokemon>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row))
}

// update table
const updateTable = () => {
    const dbPokemon = readPoke()
    clearTable()
    dbPokemon.forEach(createRow)
}

updateTable()

const editDeletePoke = (event) => {
    if (event.target.type == 'button'){

        const [action, index] = event.target.id.split('-')
        if(action == 'edit'){
            console.log('editando pokemon')
        }else{
            console.log('deletando pokemon')
        }
        //console.log(index, action)

    }

}
// Events
document.querySelector('#tablePokemon>tbody').addEventListener('click', editDeletePoke)

//anotações-Adam
//data-action="delete"
//data-action="edit-${index}"
//event.target.dataset.actions.delete
