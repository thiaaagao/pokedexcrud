let indexPokemon = null

// VALIDATION INPUTS
const isValidInputId = () => {
    return document.getElementById("formPokemon").reportValidity();
}

// CLEAR INPUTS
const clearInputs = () => {
    const inputs = document.querySelectorAll('.inputPokemon') // reset inputs blank
    inputs.forEach(input => input.value = '')
}

// SIGN UP - POKEMON
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

// FUNCAO SET AND GET DB (CRUD - DBPOKEMON)
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_pokemon')) ?? [] // parse in JSON STRING
const setLocalStorage = (dbPokemon) => localStorage.setItem('db_pokemon', JSON.stringify(dbPokemon))


// CRUD - DBPOKEMON
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
// CRUD - DBPOKEMON


// TABLE POKEMON
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
    // document.querySelector('#tablePokemon>tbody').innerHTML=''

}

// update table
const updateTable = () => {
    const dbPokemon = readPoke()
    clearTable()
    dbPokemon.forEach(createRow)
}

updateTable()
// TABLE POKEMON

// BUTTON EDIT AND DELETE POKEMON
const editDeletePoke = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editPoke(index)
            indexPokemon = index  //indice buscar a posicao do pokemon
        } else {
            const pokemon = readPoke()[index]
            const response = confirm(`Deseja remover o ${pokemon.nomePokemon} da pokedex ?`)
            if (!!response) {
            deletePoke(index)
            updateTable()
            // console.log('deletando pokemon')
            }


        }
        // console.log(index, action)

    }

}

const fillFields = (pokemon) => {
    document.getElementById('pokemonName').value = pokemon.nomePokemon
    document.getElementById('pokemonType').value = pokemon.tipo

}

const editPoke = (index) => {
    const pokemon = readPoke()[index]
    fillFields(pokemon)
    openButton()
}

// BUTTON EDIT AND DELETE POKEMON
// Open the Save Button!!! FINALLY!
const openButton = () => {
    document.getElementById('updatePoke').removeAttribute('disabled');
    document.getElementById('Cadastro').setAttribute('disabled', 'disabled');
}
const closeButton = () => {
    document.getElementById('Cadastro').removeAttribute('disabled');
    document.getElementById('updatePoke').setAttribute('disabled', 'disabled');
}
const savePoke = () => {
    const pokemon = readPoke()[indexPokemon]
    console.log(indexPokemon, pokemon.nomePokemon)
    // closeButton()
}

// EVENTS
document.querySelector('#tablePokemon>tbody').addEventListener('click', editDeletePoke)
document.getElementById('updatePoke').addEventListener('click', savePoke)

//anotações-Adam
//data-action="delete"
//data-action="edit-${index}"
//event.target.dataset.actions.delete
