import { runMigrations, executeQuery as query } from "/database/migrations.js";

await runMigrations();

async function RenderModel() {
  try {
    const getClassInfo = await query(
      "SELECT CONCAT(professor.name, ' ' , professor.last_name) as professor, subject.name as disciplina, class.name as turma, class.id as turma_id FROM class INNER JOIN professor on professor.id=professor_id INNER JOIN subject on subject.id=subject_id"
    );
    console.log(getClassInfo);

    const template = document.querySelector("#template").content;
    const viewList = document.querySelector(".view-list");

    while (viewList.firstChild) {
      viewList.removeChild(viewList.firstChild);
    }

    for (let classItem of getClassInfo) {
      const clone = document.importNode(template, true);
      clone.querySelector(".class-name").textContent = classItem.turma;
      clone.querySelector(".subject-name").textContent = classItem.disciplina;
      clone.querySelector(".professor-name").textContent = classItem.professor;
      clone.querySelector(".view-item").dataset.id = classItem.turma_id;

      viewList.appendChild(clone);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createModel(modelName) {
  await query(`INSERT INTO model (name) VALUES ('${modelName}')`);
  RenderModel();
  toggleHide();
}

async function updateModel(modelName, modelId) {
  await query(`UPDATE model SET name = '${modelName}' WHERE id = ${modelId}`);
  RenderModel();
  toggleHide();
}

async function deleteModel(modelId) {
  await query(`DELETE FROM model WHERE id = ${modelId}`);
  RenderModel();
}

// Renderizar model
addEventListener("DOMContentLoaded", RenderModel());

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
    const modelName = document.querySelector("#modal-name").value;
    const modelId = document.querySelector("#modal-id").value;
    console.log(modelId);
    if (modelName && isCreate == true) {
      await createModel(modelName);
    }

    if (modelName && isCreate == false) {
      await updateModel(modelName, modelId);
    }
  });

document
  .querySelector(".view-list")
  .addEventListener("click", async (event) => {
    const modelItem = event.target.closest("li");
    const modelId = modelItem.dataset.id;
    if (event.target.classList.contains("edit")) {
      isCreate = false;
      console.log(isCreate);
      const modalTitle = document.querySelector("#modal-title");
      modalTitle.textContent = "Editar model";
      const modelName = document.querySelector("#modal-name");
      modelName.value = modelItem.querySelector("h2").textContent;
      document.querySelector("#modal-id").value = modelId;
      toggleHide();
    }

    if (event.target.classList.contains("delete")) {
      await deleteModel(modelId);
    }
  });
