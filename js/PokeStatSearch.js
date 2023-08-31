
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const searchResultsContainer = document.querySelector( '#searchResults' );
const searchFormNode = document.querySelector( '#searchForm' );
const userSearchInput = document.querySelector( '#searchText' );
const randomInput = document.querySelector('#random')

// Perform a search when the user submits the form
searchFormNode.addEventListener( 'submit', ev => {
  console.log( 'Form submitted!' );
  ev.preventDefault(); // Stop the form submit from reloading the page

  loadPokemonDetails( userSearchInput.value); // Give the user's input text to our AJAX function

});

let random = Math.round(Math.random()*1008)

randomInput.addEventListener( 'click', ev => {
  console.log( 'Form submitted!' );
  ev.preventDefault(); // Stop the form submit from reloading the page

  loadPokemonDetails(random); // Give the user's input text to our AJAX function

  random = Math.round(Math.random()*1008)

});

//Search data about the pokemon

const loadPokemonDetails = (id) => {

    axios.get( `https://pokeapi.co/api/v2/pokemon/${id}`   
            ) 
        .then( res => {
  
          // console.log( 'Data:', res.data );
          // // What do you do with the data you now have?

          searchResultsContainer.replaceChildren(); // clear

          pokemon = res.data
        
          // JUST FOR DEBUGGING:
          window.res = res; // make a quick global variable for debugging
      
          //This is to get the sprite images of each Pokemon
          const spriteFront = document.createElement('img');
          spriteFront.src = pokemon.sprites.front_default

          const spriteBack = document.createElement('img');
          spriteBack.src = pokemon.sprites.back_default
  

          let typesList = []    //created an empty array for listing the types list

          for (let i = 0; i < pokemon.types.length; i++) {
            typesList[i] = pokemon.types[i].type.name
          }

          let baseStatValues = []  //created an empty array for storing base stat values
          let totalStat = 0

          for (let i = 0; i < pokemon.stats.length; i++) {
            baseStatValues[i] = pokemon.stats[i].base_stat
            totalStat += pokemon.stats[i].base_stat
          }

         let statList = {HP: baseStatValues[0], Attack: baseStatValues[1], Defense: baseStatValues[2], SpecialAttk: baseStatValues[3], SpecialDef: baseStatValues[4], Speed: baseStatValues[5]}

         //probably not the best way to add the values to the statList object....


            const divTag = document.createElement('div');
            divTag.innerHTML = `
              <h1>${ pokemon.name} </h1> <h3>Pokedex ID: ${pokemon.id}</h3>
              <h3>(${typesList})</h3>
              <h4> HP: ${statList.HP}, Attack: ${statList.Attack}, Defense: ${statList.Defense}, Special Attack: ${statList.SpecialAttk}, Special Defense: ${statList.SpecialDef}, Speed: ${statList.Speed} </h4>
              <h2> Total Base Stat: ${totalStat} </h2>
            `;
            divTag.className = 'result';


            //add results to html page
            searchResultsContainer.appendChild(spriteFront)
            searchResultsContainer.appendChild(spriteBack)
            searchResultsContainer.appendChild( divTag );

        })
        .catch( err => {
          console.warn( 'Error loading search results:', err );
        });
}




