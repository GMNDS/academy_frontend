import { runMigrations, executeQuery as query } from "/database/migrations.js";

await runMigrations();

async function RenderModel() {
  try {
    const getClassInfo = await query(
      "SELECT CONCAT(professor.name, ' ' , professor.last_name) as professor, subject.name as disciplina, class.name as turma, class.id as turma_id FROM class INNER JOIN professor on professor.id=professor_id INNER JOIN subject on subject.id=subject_id"
    );
    // console.log(getClassInfo);

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

async function createClass(className, professorId, subjectId) {
  try {
    await query(
      `INSERT INTO class (name, subject_id, professor_id) VALUES ('${className}', ${subjectId}, ${professorId})`
    );
    RenderModel();
    toggleHide();
  } catch (error) {
    console.error("Erro ao criar a classe:", error);
    alert(error);
  }
}

async function updateClass(className, profesorId, subjectId, classId) {
  try {
    await query(
      `UPDATE class SET name = '${className}', professor_id = ${profesorId}, subject_id = ${subjectId} WHERE id = ${classId}`
    );
    RenderModel();
    toggleHide();
  } catch (error) {
    console.error("Erro ao atualizar a classe:", error);
    alert(error);
  }
}

async function deleteClass(classId) {
  try {
    const deleted = await query(`DELETE FROM class WHERE id = ${classId}`);
    console.log(deleted);
    await RenderModel();
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    alert(error);
  }
}

async function fetchProfessors(selectedProfessorId = null) {
  try {
    const professors = await query("SELECT id, name, last_name FROM professor");
    const professorSelect = document.querySelector("#modal-professor-name");
    professorSelect.innerHTML = ""; // Limpa as opções existentes

    professors.forEach((professor) => {
      const option = document.createElement("option");
      option.value = professor.id;
      option.id = `pro${professor.id}`;
      option.textContent = `${professor.name} ${professor.last_name}`;
      if (professor.id === selectedProfessorId) {
        option.selected = true;
      }
      professorSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
  }
}

async function fetchSubjects(selectedSubjectId = null) {
  try {
    const subjects = await query("SELECT id, name, code FROM subject");
    const subjectSelect = document.querySelector("#modal-subject-name");
    subjectSelect.innerHTML = ""; // Limpa as opções existentes

    subjects.forEach((subject) => {
      const option = document.createElement("option");
      option.value = subject.id;
      option.textContent = subject.name;
      if (subject.id === selectedSubjectId) {
        option.selected = true;
      }
      subjectSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
  }
}

// Renderizar turma
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
addModalButton.addEventListener("click", async () => {
  isCreate = true;
  await fetchProfessors();
  await fetchSubjects();
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
    const className = document.querySelector("#modal-class-name").value;
    const professorId = document.querySelector("#modal-professor-name").value;
    const subjectId = document.querySelector("#modal-subject-name").value;
    const classId = document.querySelector("#modal-id").value;
    if (className && professorId && subjectId && classId && isCreate == true) {
      await createClass(className, professorId, subjectId);
    }

    if (className && professorId && subjectId && classId && isCreate == false) {
      await updateClass(className, professorId, subjectId, classId);
    }
  });

document
  .querySelector(".view-list")
  .addEventListener("click", async (event) => {
    const classItem = event.target.closest("li");
    const classId = classItem.dataset.id;
    document.querySelector("#modal-id").value = classId;
    if (event.target.classList.contains("edit")) {
      isCreate = false;
      const modalTitle = document.querySelector("#modal-title");
      modalTitle.textContent = "Editar Turma";
      const modalName = document.querySelector("#modal-class-name");
      modalName.value = classItem.querySelector(".class-name").textContent;

      const professorName =
        classItem.querySelector(".professor-name").textContent;
      const professor = await query(
        `SELECT id FROM professor WHERE CONCAT(name, ' ', last_name) = '${professorName}'`
      );
      const professorId = professor[0]?.id;
      await fetchProfessors(professorId);

      const subjectName = classItem.querySelector(".subject-name").textContent;
      const subject = await query(
        `SELECT id FROM subject WHERE name = '${subjectName}'`
      );
      const subjectId = subject[0]?.id;
      await fetchSubjects(subjectId);
      toggleHide();
    }

    if (event.target.classList.contains("delete")) {
      console.log("deleta?");

      console.log(classId);
      // console.log(await query(`DELETE FROM subject WHERE id = ${classId}`));
      await deleteClass(classId);
      // console.log(deletando);
    }
  });
