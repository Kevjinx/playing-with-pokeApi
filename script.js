
//DOM elements
const stats = document.querySelectorAll('.stat-number');
const pokemonBtn = document.getElementById('enter-pokemon-btn')
const pokemonNameInput = document.getElementById('pokemon-name')
const topImg = document.getElementById('img-top')
const postSearchContainer = document.getElementById('post-search-container')
const abilitiesContainer = document.getElementById('abilities-container')
const topDetailsContainer = document.getElementById('top-detail-container')



const nameInputHandler = () => {
  getPokemonByName(pokemonNameInput.value.toLowerCase())
  postSearchContainer.style.visibility = 'visible';
  resetSearch()
}

const getPokemonByName = name => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {})
  .then((res) => res.json())
  .then((json) => {
    getStatsFromPokemonJson(json)
    setImageFromJson(json)
    getAbilitesFromPokemonJson(json)
    setNameFromJson(json)
    setPokedexNumberFromJson(json)
  })
  .catch(err => console.log(err))
}

const getAbilitesFromPokemonJson = json => {
  json.abilities.forEach(abilityObj => {
    const abilityElement = document.createElement('p')
    abilityElement.innerHTML = abilityObj.ability.name
    abilitiesContainer.appendChild(abilityElement)
  })
}

const getStatsFromPokemonJson = json => {
  json.stats.forEach((stat, index) => { //stat = obj
    stats[index].innerText = stat.base_stat
  })
}


const setImageFromJson = json => {
  topImg.src = json.sprites.front_default
  return json.sprites.front_default
}

const resetSearch = () => {
  const children = Array.from(topDetailsContainer.children)
  children.forEach(child => {
    child.innerText = '';
  })
  abilitiesContainer.innerHTML = '';
  pokemonNameInput.value = ''
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const setNameFromJson = json => {
  const nameEle = document.getElementById('name-top')
  const pokemonNameStr = json.forms[0].name;
  nameEle.innerHTML = capitalizeFirstLetter(pokemonNameStr);
}

const setPokedexNumberFromJson = json => {
  const pokedexNumEle = document.getElementById('pokedex-number')
  const pokedexNum = json.game_indices[0].game_index;
  pokedexNumEle.innerHTML = `#${pokedexNum}`;
}




//species
//type
//weight
//name - checked
//pokedex number -- checked
//image - checked
//stats - checked
//abilities - checked
//reset abilities and other appending - checked
//png of pokemons, hover show name, clickable
//adjacent pokemon with pokedex number



//eventlistners
pokemonBtn.addEventListener('click', nameInputHandler);

pokemonNameInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') nameInputHandler()
})
