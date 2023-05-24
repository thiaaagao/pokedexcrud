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
const savePokemon = () => {
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

const pokeTemp = {
    nomePokemon: 'dragonite',
    tipo: 'dragao'
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
    pokemon.index = indexPokemon
    fillFields(pokemon)
    openButton()

}

// BUTTON EDIT AND DELETE POKEMON
// Open the Save Button!!! FINALLY!
const openButton = () => {
    document.getElementById('updatePoke').setAttribute("type", "button");
    document.getElementById('cancelUpdatepoke').setAttribute('type', 'button');
    document.getElementById('Cadastro').setAttribute('type', 'hidden');
}
const closeButton = () => {
    document.getElementById('Cadastro').setAttribute('type', 'button');
    document.getElementById('updatePoke').setAttribute('type', 'hidden');
    document.getElementById('cancelUpdatepoke').setAttribute('type', 'hidden');
    clearInputs()
}
const savePoke = (pokemon) => {
    updatePoke(indexPokemon, pokemon)
    updateTable()
    closeButton()

}

// EVENTS
document.querySelector('#tablePokemon>tbody').addEventListener('click', editDeletePoke)
document.getElementById('updatePoke').addEventListener('click', editPoke)
document.getElementById('cancelUpdatepoke').addEventListener('click', closeButton)

//anotações-Adam
//data-action="delete"
//data-action="edit-${index}"
//event.target.dataset.actions.delete
