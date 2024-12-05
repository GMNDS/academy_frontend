import { runMigrations, executeQuery as query } from "/database/migrations.js";

await runMigrations();

async function RenderModel() {
  try {
    const getSubjectInfo = await query("SELECT * FROM subject");
    console.log(getSubjectInfo);

    const template = document.querySelector("#subject-template").content;
    const viewList = document.querySelector(".view-list");

    while (viewList.firstChild) {
      viewList.removeChild(viewList.firstChild);
    }

    for (const item of getSubjectInfo) {
      const clone = document.importNode(template, true);
      clone.querySelector(".subject-name").textContent = item.name;
      clone.querySelector(".subject-code").textContent = `Código: ${item.code}`;
      clone.querySelector("li").dataset.id = item.id;

      viewList.appendChild(clone);
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao renderizar disciplinas:", error.message);
  }
}

async function createModel(subjectName, subjectCode) {
  try {
    await query(
      `INSERT INTO subject (name, code) VALUES ('${subjectName}', '${subjectCode}')`
    );
    RenderModel();
    toggleHide();
  } catch (error) {
    alert("Erro ao criar disciplina:", error);
    alert(error);
  }
}

async function updateModel(subjectName, subjectCode, subjectId) {
  try {
    await query(
      `UPDATE subject SET name = '${subjectName}', code = '${subjectCode}' WHERE id = ${subjectId}`
    );
    RenderModel();
    toggleHide();
  } catch (error) {
    console.error("Erro ao atualizar disciplina:", error.message);
    alert(error);
  }
}

async function deleteModel(subjectId) {
  try {
    await query(`DELETE FROM subject WHERE id = ${subjectId}`);
    RenderModel();
  } catch (error) {
    console.error(error);
    alert("Erro ao deletar disciplina:", error.message);
    alert(error);
  }
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
  document.querySelector("#subject-form").reset();
  isCreate = true;
  toggleHide();
});

// Quando clica fora do modal fecha ele
fade.addEventListener("click", () => {
  toggleHide();
});

// Execuções
document
  .querySelector("#subject-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const modalName = document.querySelector("#modal-name").value;
    const modalCode = document.querySelector("#modal-code").value;
    const modalId = document.querySelector("#modal-id").value;

    if (!modalName || !modalCode) {
      alert("Preencha todos os campos");
      return;
    }

    if (isCreate == true) {
      await createModel(modalName, modalCode);
    } else {
      await updateModel(modalName, modalCode, modalId);
    }
  });

document
  .querySelector(".view-list")
  .addEventListener("click", async (event) => {
    const modalItem = event.target.closest("li");
    const modalId = modalItem.dataset.id;
    if (event.target.classList.contains("edit")) {
      isCreate = false;
      const modalTitle = document.querySelector("#modal-title");
      modalTitle.textContent = "Editar disciplina";
      const modalName = document.querySelector("#modal-name");
      modalName.value = modalItem.querySelector(".subject-name").textContent;
      const modalCode = document.querySelector("#modal-code");
      modalCode.value = modalItem
        .querySelector(".subject-code")
        .textContent.split(": ")[1];
      document.querySelector("#modal-id").value = modalId;
      toggleHide();
    }

    if (event.target.classList.contains("delete")) {
      await deleteModel(modalId);
    }
  });
