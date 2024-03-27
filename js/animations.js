const pokeBall = document.querySelector(".pokeball-img");
const backGround = document.querySelector(".background-container");
const swiper = document.querySelector(".background-swiper");
const btnSwiperRed = document.querySelector(".red");
const btnSwiperBlue = document.querySelector(".blue");
const title = document.querySelector(".title");
const bagColor = document.querySelector(".bag-text");

let changed = false;
btnSwiperRed.classList.add("button-checked");
pokeBall.src = "./img/assets/pokeball-red.png";
pokeBall.classList.add("pokeball-red");

function changePokemon() {
  if (!changed) {
    pokeBall.classList.remove("pokeball-red");
    pokeBall.classList.add("pokeball-blue");
    pokeBall.src = "./img/assets/pokeball-blue.png";
    backGround.classList.add("blueBack");
    btnSwiperRed.classList.remove("button-checked");
    btnSwiperBlue.classList.add("button-checked");
    bagColor.style.color = "rgba(62, 117, 195, 1)";
    changed = true;
    title.innerText = "Catch them all!";
  } else {
    pokeBall.classList.remove("pokeball-blue");
    pokeBall.classList.add("pokeball-red");
    pokeBall.src = "./img/assets/pokeball-red.png";
    backGround.classList.remove("blueBack");
    btnSwiperRed.classList.add("button-checked");
    btnSwiperBlue.classList.remove("button-checked");
    bagColor.style.color = "rgba(194, 0, 1, 1)";
    changed = false;
    title.innerText = "Who is that Pokémon?";
  }
}

swiper.addEventListener("click", changePokemon);


setInterval(changePokemon, 12000);



const pokemonTypesClick = document.querySelectorAll(".types");

pokemonTypesClick.forEach(function (type) {
  type.addEventListener("click", function (event) {
    const btnAll = document.getElementById("pokemon");
    btnAll.classList.remove("types-click");
    pokemonTypesClick.forEach(function (type) {
      type.classList.remove("types-click");
    });
    
    event.currentTarget.classList.add("types-click");
  });
});

const buttonDropDown = document.querySelector("dropbtn");
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const scrollButton = document.getElementById("exploreButton");
  const section = document.getElementById("pokemon-types");

  scrollButton.addEventListener("click", function() {
    section.scrollIntoView(
      {behavior: 'smooth', block: 'start' });
  });
});