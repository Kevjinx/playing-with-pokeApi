
//DOM elements
const stats = document.querySelectorAll('.stat-number');
const pokemonBtn = document.getElementById('enter-pokemon-btn')
const pokemonNameInput = document.getElementById('pokemon-name')
const topImg = document.getElementById('img-top')


const nameInputHandler = () => {
  getPokemonByName(pokemonNameInput.value)
}

const getPokemonByName = name => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {})
  .then((res) => res.json())
  .then((json) => {
    getStatsFromPokemonJson(json)
    setImageFromJson(json)
  })
  .catch(err => console.log(err))
}

const getAbilitesFromPokemonJson = json => {
  return json.abilities.map(abilityObj => {
    console.log(abilityObj.ability.name)
    return abilityObj.ability.name
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




//add div for abilities


//species
//stats
//type
//weight
//image


//eventlistners
pokemonBtn.addEventListener('click', nameInputHandler);

pokemonNameInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') nameInputHandler()
})
