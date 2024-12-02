import { runMigrations, executeQuery as query } from "/database/migrations.js";

await runMigrations();

async function RenderCampus() {
  try {
    const GetAllCampus = await query("SELECT * FROM campus");
    console.log(GetAllCampus);

    const template = document.querySelector("#campus-template").content;
    const viewList = document.querySelector(".view-list");

    GetAllCampus.forEach((campus) => {
      const clone = document.importNode(template, true);
      clone.querySelector("h2").textContent = campus.name;
      clone.querySelector("li").dataset.id = campus.id;

      viewList.appendChild(clone);
    });
  } catch (error) {
    console.error(error);
  }
}

async function createCampus(campusName) {
  await query(`INSERT INTO campus (name) VALUES ('${campusName}')`);
  location.reload();
}

async function updateCampus(campusName, campusId) {
  await query(
    `UPDATE campus SET name = '${campusName}' WHERE id = ${campusId}`
  );
  location.reload();
}

async function deleteCampus(campusId) {
  await query(`DELETE FROM campus WHERE id = ${campusId}`);
  location.reload();
}

// Renderizar campus
addEventListener("DOMContentLoaded", RenderCampus());

function toggleHide() {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
}

const addModalButton = document.querySelector("#open-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#modal-add");
let isCreate = true;

// Quando clicar em Adicionar mostra o modal e troca isCreate para True
addModalButton.addEventListener("click", () => {
  isCreate = true;
  console.log(isCreate);
  toggleHide();
});

// Quando clica fora do modal fecha ele
fade.addEventListener("click", () => {
  toggleHide();
});

// Execuções
document
  .querySelector("#send-view")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const campusName = document.querySelector("#campus").value;
    const campusId = document.querySelector("#campus-id").value;
    console.log(campusId);
    if (campusName && isCreate == true) {
      await createCampus(campusName);
    }

    if (campusName && isCreate == false) {
      await updateCampus(campusName, campusId);
    }
  });

document
  .querySelector(".view-list")
  .addEventListener("click", async (event) => {
    const campusItem = event.target.closest("li");
    const campusId = campusItem.dataset.id;
    if (event.target.classList.contains("edit")) {
      isCreate = false;
      console.log(isCreate);
      const modalTitle = document.querySelector("#modal-title");
      modalTitle.textContent = "Editar campus";
      const campusName = document.querySelector("#campus");
      campusName.value = campusItem.querySelector("h2").textContent;
      document.querySelector("#campus-id").value = campusId;
      toggleHide();
    }

    if (event.target.classList.contains("delete")) {
      await deleteCampus(campusId);
    }
  });
