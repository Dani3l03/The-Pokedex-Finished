import * as fetchPokemon from "./fetch.js";
import fetchAllPokemon from "./fetchAll.js";

export default function selectTypePokemon() {
  const pokemonTypesClick = document.querySelectorAll(".types");
  const pokemonButtonLoad = document.querySelector(".button-load");
  const pokemonErrorMsg = document.querySelector(".error-msg");

  pokemonTypesClick.forEach((pokeType) => {
    pokeType.addEventListener("click", async () => {
      try {
        const type = pokeType.id;
        const pokeApiType = `https://pokeapi.co/api/v2/type/${type}`;
        const result = await fetch(pokeApiType);
        const data = await result.json();

        const pokemonList = data.pokemon.map((pokemon) => pokemon.pokemon.name);
        const pokemonCount = pokemonList.length;
        const results = document.querySelector(".search-numbers");
        results.innerText = `${pokemonCount} Pokémon`;

        pokemonList.forEach((pokemon) => {
          pokemonButtonLoad.style.display = "none";
          const allCards = document.querySelectorAll(
            ".pokemon-container-result"
          );
          allCards.forEach((card) => {
            card.style.display = "none";
          });
          showPokemonData(pokemon);
        });
      } catch (e) {}
    });
  });

  async function getPokemonData(pokemonList) {
    const pokeApi = `https://pokeapi.co/api/v2/pokemon/${pokemonList}`;
    const result = await fetch(pokeApi);
    const data = await result.json();
    return data;
  }

  function resetarDados() {
    const hpText = document.getElementById("hp-text");
    const attkText = document.getElementById("attk-text");
    const defText = document.getElementById("def-text");
    const spaText = document.getElementById("spa-text");
    const spdText = document.getElementById("spd-text");
    const speedText = document.getElementById("speed-text");

    const weakElements = [
      document.getElementById("weak-one"),
      document.getElementById("weak-two"),
      document.getElementById("weak-three"),
      document.getElementById("weak-four"),
      document.getElementById("weak-five"),
    ];

    weakElements.forEach(Element => {
    Element.textContent = "";
    Element.style.backgroundColor = `transparent`;
    Element.style.color = `none`;
    Element.style.display = 'none'
    
  });

    hpText.textContent = "HP";
    hpText.style.color = "rgba(122, 125, 128, 1)";
    hpText.style.fontWeight = "400";

    attkText.textContent = "Attack";
    attkText.style.color = "rgba(122, 125, 128, 1)";
    attkText.style.fontWeight = "400";

    defText.textContent = "Defense";
    defText.style.color = "rgba(122, 125, 128, 1)";
    defText.style.fontWeight = "400";

    spaText.textContent = "Sp.Attack";
    spaText.style.color = "rgba(122, 125, 128, 1)";
    spaText.style.fontWeight = "400";

    spdText.textContent = "Sp.Defense";
    spdText.style.color = "rgba(122, 125, 128, 1)";
    spdText.style.fontWeight = "400";

    speedText.textContent = "Speed";
    speedText.style.color = "rgba(122, 125, 128, 1)";
    speedText.style.fontWeight = "400";
  }

  async function showPokemonData(pokemon) {
    pokemonErrorMsg.classList.add("hide");
    const data = await getPokemonData(pokemon);
    const pokemonNameSearched = data.name;
    const pokemonNumberSearched = data.id;
    const pokemonTypeSearched = data.types.map((typeObj) => typeObj.type.name);
    const pokemonImageSearched =
      data.sprites.other["official-artwork"]["front_default"];

    createCard(data);

    function createCard() {
      const pokemonContainer = document.querySelector(
        ".pokemon-container-results"
      );
      const card = document.createElement("div");
      card.classList.add("pokemon-container-result");

      // MODAL - criação e fetch.
      async function createModalData(data) {
        card.addEventListener("click", async () => {
          resetarDados();
          const modal = document.querySelector(".modal-fade");
          modal.classList.add("active");
          console.log(`Card de ${data.name} clicado!`);

          const closeModalButton = document.querySelector(
            ".button-close button"
          );
          if (closeModalButton) {
            closeModalButton.addEventListener("click", () => {
              const modal = document.querySelector(".modal-fade");
              modal.classList.remove("active");
              resetarDados();
            });
          }
          const modalImg = document.querySelector(".modal-img-back img");
          const modalName = document.querySelector(".modal-name h3");
          const modalNumber = document.querySelector(".modal-name p");
          const modalTypeOne = document.getElementById("type-one");
          const modalTypeTwo = document.getElementById("type-two");
          const modalHeight = document.getElementById("height");
          const modalWeight = document.getElementById("weight");
          const modalAbilitie = document.getElementById("abilitie");
          const modalContainerImg = document.querySelector(".modal-img");

          modalImg.src = data.sprites.other["home"].front_default;

          modalName.textContent =
            data.name.charAt(0).toUpperCase() + data.name.slice(1);

          modalNumber.textContent = `#${data.id}`;

          modalTypeOne.textContent =
            data.types[0].type.name.charAt(0).toUpperCase() +
            data.types[0].type.name.slice(1);

          modalTypeOne.style.backgroundColor = `var(--type-${data.types[0].type.name})`;
          modalTypeOne.style.color = `var(--type-${data.types[0].type.name}-name)`;

          if (data.types.length > 1) {
            modalTypeTwo.textContent =
              data.types[1].type.name.charAt(0).toUpperCase() +
              data.types[1].type.name.slice(1);

            modalTypeTwo.style.backgroundColor = `var(--type-${data.types[1].type.name})`;
            modalTypeTwo.style.color = `var(--type-${data.types[1].type.name}-name)`;
            modalTypeTwo.style.display = "block"
          } else {
            modalTypeTwo.textContent = "";
            modalTypeTwo.style.background = "none";
            modalTypeTwo.style.display = "none"
          }
          modalContainerImg.style.backgroundImage = `url('./img/assets/bg-types/${data.types[0].type.name}.svg')`;

          modalHeight.textContent = `${data.height / 10} m`;
          modalWeight.textContent = `${data.weight / 10} kg`;
          modalAbilitie.textContent =
            data.abilities[0].ability.name.charAt(0).toUpperCase() +
            data.abilities[0].ability.name.slice(1);

          const pokemonTypeSearched = data.types.map((type) => type.type.name);

          const pokemonStats = {
            HP: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spAttack: data.stats[3].base_stat,
            spDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
          };

          function preencherBarras(stats) {
            const hpText = document.getElementById("hp-text");
            const attkText = document.getElementById("attk-text");
            const defText = document.getElementById("def-text");
            const spaText = document.getElementById("spa-text");
            const spdText = document.getElementById("spd-text");
            const speedText = document.getElementById("speed-text");

            hpText.addEventListener("mouseover", function () {
              hpText.textContent = `HP: ${pokemonStats.HP}`;
              hpText.style.color = "red";
              hpText.style.fontWeight = "800";
            });

            attkText.addEventListener("mouseover", function () {
              attkText.textContent = `Attack: ${pokemonStats.attack}`;
              attkText.style.color = "red";
              attkText.style.fontWeight = "800";
            });
            defText.addEventListener("mouseover", function () {
              defText.textContent = `Defense: ${pokemonStats.defense}`;
              defText.style.color = "red";
              defText.style.fontWeight = "800";
            });
            spaText.addEventListener("mouseover", function () {
              spaText.textContent = `Sp.Attack: ${pokemonStats.spAttack}`;
              spaText.style.color = "red";
              spaText.style.fontWeight = "800";
            });
            spdText.addEventListener("mouseover", function () {
              spdText.textContent = `Sp.Defense: ${pokemonStats.spDefense}`;
              spdText.style.color = "red";
              spdText.style.fontWeight = "800";
            });
            speedText.addEventListener("mouseover", function () {
              speedText.textContent = `Speed: ${pokemonStats.speed}`;
              speedText.style.color = "red";
              speedText.style.fontWeight = "800";
            });

            for (const stat in stats) {
              const ulElement = document.getElementById(stat);
              const statValue = stats[stat];
              const percentage = (statValue / 200) * 100;
              const liElements = ulElement.querySelectorAll("li");

              liElements.forEach((li, index) => {
                if (index < Math.round(percentage / 10)) {
                  li.style.backgroundColor = "red";
                } else {
                  li.style.backgroundColor = "rgba(77, 80, 83, 0.2)";
                }
              });
            }
          }

          preencherBarras(pokemonStats);

          for (const type of pokemonTypeSearched) {
            const pokeApiType = `https://pokeapi.co/api/v2/type/${type}`;
            const result = await fetch(pokeApiType);
            const dataType = await result.json();

            const pokemonWeaknesses =
              dataType.damage_relations.double_damage_from;
            const usedWeaknesses = [];

            const weakElements = [
              document.getElementById("weak-one"),
              document.getElementById("weak-two"),
              document.getElementById("weak-three"),
              document.getElementById("weak-four"),
              document.getElementById("weak-five"),
            ];

            pokemonWeaknesses.forEach((weakness, index) => {
              if (!usedWeaknesses.includes(weakness.name)) {
                const currentWeaknessElement = weakElements[index];
                currentWeaknessElement.textContent =
                  weakness.name.charAt(0).toUpperCase() +
                  weakness.name.slice(1);
                currentWeaknessElement.style.display = 'block'
                currentWeaknessElement.style.backgroundColor = `var(--type-${weakness.name})`;
                currentWeaknessElement.style.color = `var(--type-${weakness.name}-name)`;
                usedWeaknesses.push(weakness.name);
              } else {
                currentWeaknessElement.textContent = "";
                currentWeaknessElement.style.backgroundColor = `transparent`;
                currentWeaknessElement.style.color = `none`;
              }
            });
          }
        });
      }

      createModalData(data);

      const name = document.createElement("p");
      name.classList.add("poke-name");
      const namePokeTextFinal = (
        pokemonNameSearched.charAt(0).toUpperCase() +
        pokemonNameSearched.slice(1)
      ).replace(/-/g, " ");
      name.innerText = namePokeTextFinal;

      const nameType = document.createElement("div");
      nameType.classList.add("name-type");

      const number = document.createElement("p");
      number.classList.add("number");
      number.innerText = "#" + pokemonNumberSearched;

      const type = document.createElement("span");
      type.classList.add("type");
      const typeImage = document.createElement("img");

      const imageDiv = document.createElement("div");
      imageDiv.classList.add("pokemon-img");
      const image = document.createElement("img");
      image.src = pokemonImageSearched;

      card.appendChild(imageDiv);
      imageDiv.appendChild(image);
      card.appendChild(number);
      card.appendChild(nameType);
      nameType.appendChild(name);
      nameType.appendChild(type);
      type.appendChild(typeImage);
      pokemonContainer.appendChild(card);

      if (pokemonTypeSearched[1]) {
        type.classList.add("type");
        const typeImage = document.createElement("img");
        type.appendChild(typeImage);
        pokemonTypeSearched.forEach(() => {
          switch (pokemonTypeSearched[1]) {
            case "fire":
              typeImage.src = "img/assets/icon-types/fire.svg";
              break;
            case "water":
              typeImage.src = "img/assets/icon-types/water.svg";
              break;
            case "grass":
              typeImage.src = "img/assets/icon-types/grass.svg";
              break;
            case "flying":
              typeImage.src = "img/assets/icon-types/flying.svg";
              break;
            case "electric":
              typeImage.src = "img/assets/icon-types/electric.svg";
              break;
            case "normal":
              typeImage.src = "img/assets/icon-types/normal.svg";
              break;
            case "rock":
              typeImage.src = "img/assets/icon-types/rock.svg";
              break;
            case "ice":
              typeImage.src = "img/assets/icon-types/ice.svg";
              break;
            case "bug":
              typeImage.src = "img/assets/icon-types/bug.svg";
              break;
            case "poison":
              typeImage.src = "img/assets/icon-types/poison.svg";
              break;
            case "ground":
              typeImage.src = "img/assets/icon-types/ground.svg";
              break;
            case "steel":
              typeImage.src = "img/assets/icon-types/steel.svg";
              break;
            case "ghost":
              typeImage.src = "img/assets/icon-types/ghost.svg";
              break;
            case "fairy":
              typeImage.src = "img/assets/icon-types/fairy.svg";
              break;
            case "fighting":
              typeImage.src = "img/assets/icon-types/fighting.svg";
              break;
            case "psychic":
              typeImage.src = "img/assets/icon-types/psychic.svg";
              break;
            case "dragon":
              typeImage.src = "img/assets/icon-types/dragon.svg";
              break;
            case "dark":
              typeImage.src = "img/assets/icon-types/dark.svg";
              break;
          }
        });
      }

      if (pokemonTypeSearched[0]) {
        pokemonTypeSearched.forEach(() => {
          switch (pokemonTypeSearched[0]) {
            case "fire":
              typeImage.src = "img/assets/icon-types/fire.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "water":
              typeImage.src = "img/assets/icon-types/water.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "grass":
              typeImage.src = "img/assets/icon-types/grass.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "flying":
              typeImage.src = "img/assets/icon-types/flying.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "electric":
              typeImage.src = "img/assets/icon-types/electric.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "normal":
              typeImage.src = "img/assets/icon-types/normal.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "rock":
              typeImage.src = "img/assets/icon-types/rock.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "ice":
              typeImage.src = "img/assets/icon-types/ice.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "bug":
              typeImage.src = "img/assets/icon-types/bug.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "poison":
              typeImage.src = "img/assets/icon-types/poison.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "ground":
              typeImage.src = "img/assets/icon-types/ground.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "steel":
              typeImage.src = "img/assets/icon-types/steel.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "ghost":
              typeImage.src = "img/assets/icon-types/ghost.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "fairy":
              typeImage.src = "img/assets/icon-types/fairy.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "fighting":
              typeImage.src = "img/assets/icon-types/fighting.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "psychic":
              typeImage.src = "img/assets/icon-types/psychic.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "dragon":
              typeImage.src = "img/assets/icon-types/dragon.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
            case "dark":
              typeImage.src = "img/assets/icon-types/dark.svg";
              imageDiv.style.backgroundColor = `var(--type-${pokemonTypeSearched[0]})`;
              break;
          }
        });
      }

      const palavrasChave = [
        "-tail",
        "-mane",
        "-galar",
        "eternamax",
        "average",
        "unbound",
        "-male",
        "altered",
        "totem",
        "-disguised",
        "-wash",
        "-bolt",
        "-shocks",
        "-frost",
        "-mow",
        "-crowned",
        "-dawn",
        "-roaming",
        "-small",
        "-large",
        "-super",
        "-power",
        "-ultra",
        "-limited",
        "-build",
        "-stretchy",
        "-mode",
        "-gmax",
        "-yellow",
        "-plumage",
        "-dusk",
        "-meteor",
        "-incarnate",
        "-orange",
        "-red",
        "-green",
        "-blue",
        "-indigo",
        "-violet",
        "-gulping",
        "-gorging",
        "-mask",
        "-rock",
        "-libre",
        "-phd",
        "-cosplay",
        "-cap",
        "-starter",
        "-belle",
        "-pop",
        "-therian",
        "iron",
        "-sunny",
        "-blaze",
        "-zen",
        "-hisui",
        "-belly",
        "-single",
        "-bond",
        "-ash",
        "-hangry",
        "-sensu",
        "-terras",
        "-stellar",
        "-dada",
        "-busted",
        "-amped",
        "-low",
        "-female",
        "-shadow",
        "-origin",
        "-original",
        "-trash",
        "-school",
        "-striped",
        "-hero",
        "-droopy",
        "-wake",
      ];

      for (let palavra of palavrasChave) {
        if (pokemonNameSearched.toLowerCase().includes(palavra)) {
          card.style.display = "none";
          return;
        }
      }
    }
  }
}
