import { primeraLetra } from "./utils.js";

let params = new URLSearchParams(window.location.search);
const _URL = params.get("url");
console.log(_URL);

async function infoPoke() {
  try {
    let response = await fetch(_URL);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la petición del Pokemon:", error);
    return "error";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let data = await infoPoke();
  console.log("data", data);

  // Mostrar nombre y ID
  document.getElementById("pokemon-name").textContent = primeraLetra(data.name);
  document.getElementById("pokemon-id").textContent = String(data.id).padStart(
    3,
    "0"
  );

  // Mostrar habilidades
  let i = 1;

  let div = document.getElementById("ability-box");
  for (const e of data.abilities) {
    let pElement = document.createElement("p");

    pElement.id = "ability-" + i;
    pElement.classList.add("ability");

    pElement.textContent = `Habilidad ${i}: ${primeraLetra(e.ability.name)}`;

    div.appendChild(pElement);

    i++;

    if (i == 4) break;
  }

  // Mostrar altura y experiencia base
  document.getElementById("height").textContent = data.height * 0.1;
  document.getElementById("base-exp").textContent = data.base_experience;

  let div2 = document.getElementById("type-box");

  for (const e of data.types) {
    let pElement = document.createElement("p");

    pElement.id = "type-" + i;
    pElement.classList.add("type");
    pElement.classList.add(e.type.name);

    pElement.textContent = `${primeraLetra(e.type.name)}`;

    div2.appendChild(pElement);

    i++;
  }

  // Mostrar sprites
  document.getElementById("pokemon-image").src = data.sprites.front_default;
  document.getElementById("pokemon-image-shi").src = data.sprites.front_shiny;
});
