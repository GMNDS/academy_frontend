import { runMigrations, executeQuery as query } from "/database/migrations.js";

await runMigrations();

async function RenderModel() {
  try {
    const getCourseInfo = await query(
      "SELECT course.id, course.name as course_name, course.description, course.status, course.category, professor.name, professor.last_name from course INNER JOIN professor ON course.coordenador_id = professor.id"
    );

    const template = document.querySelector("#course-template").content;
    const viewList = document.querySelector(".view-list");

    while (viewList.firstChild) {
      viewList.removeChild(viewList.firstChild);
    }

    for (let course of getCourseInfo) {
      const clone = document.importNode(template, true);
      clone.querySelector(".course-name").textContent = course.course_name;
      clone.querySelector(".course-description").textContent =
        course.description;

      let courseStatus;
      course.status ? (courseStatus = "Ativo") : (courseStatus = "Inativo");
      clone.querySelector(".course-status").textContent = courseStatus;

      const professor = `${course.name} ${course.last_name}`;
      clone.querySelector(".course-professor").textContent = professor;

      clone.querySelector(".course-category").textContent = course.category;

      clone.querySelector(".view-item").dataset.id = course.id;

      viewList.appendChild(clone);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createCourse(
  courseName,
  courseDescription,
  courseStatus,
  courseCategory,
  courseProfessor
) {
  try {
    await query(
      `INSERT INTO course (name, description, status, category, coordenador_id) VALUES ('${courseName}', '${courseDescription}', ${courseStatus}, '${courseCategory}', '${courseProfessor}')`
    );
    await RenderModel();
    toggleHide();
  } catch (error) {
    console.error("Erro ao criar curso:", error);
    alert(error);
  }
}

async function updateCourse(
  courseName,
  courseDescription,
  courseStatus,
  courseCategory,
  courseProfessor,
  courseId
) {
  try {
    const updated = await query(
      `UPDATE course SET name = '${courseName}', description = '${courseDescription}', status = ${courseStatus}, category = '${courseCategory}', coordenador_id = '${courseProfessor}' WHERE id = ${courseId}`
    );
    console.log(updated);
    await RenderModel();
    toggleHide();
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    alert(error);
  }
}

async function deleteCourse(courseId) {
  try {
    const deleted = await query(`DELETE FROM course WHERE id = ${courseId}`);
    console.log(deleted);
    await RenderModel();
  } catch (error) {
    console.error("Erro ao deletar curso:", error);
    alert(error);
  }
}

// Renderizar cursos
document.addEventListener("DOMContentLoaded", RenderModel());

function toggleHide() {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
}

const addModalButton = document.querySelector("#open-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#modal-add");
let isCreate = true;

// Função para buscar e preencher a lista de professores
async function fetchProfessors(selectedProfessorId = null) {
  try {
    const professors = await query("SELECT id, name, last_name FROM professor");
    const professorSelect = document.querySelector("#modal-course-professor");
    professorSelect.innerHTML = ""; // Limpa as opções existentes

    professors.forEach((professor) => {
      const option = document.createElement("option");
      option.value = professor.id;
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

// Quando clicar em Adicionar mostra o modal e troca isCreate para True
addModalButton.addEventListener("click", async () => {
  isCreate = true;
  document.querySelector("#course-form").reset();
  document.querySelector("#modal-title").textContent = "Adicionar Curso";
  await fetchProfessors(); // Busca e preenche os professores
  toggleHide();
});

// Quando clica fora do modal fecha ele
fade.addEventListener("click", () => {
  toggleHide();
});

// Execuções

// document.querySelector("#course-form").addEventListener("submit", (event) => {
//   event.preventDefault();
// });

document
  .querySelector("#course-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const courseName = document.querySelector("#modal-course-name").value;
    const courseDescription = document.querySelector(
      "#modal-course-description"
    ).value;
    const courseStatus =
      document.querySelector("#modal-course-status").value == 1;

    console.log(courseStatus);
    const courseCategory = document.querySelector(
      "#modal-course-category"
    ).value;
    const courseProfessor = document.querySelector(
      "#modal-course-professor"
    ).value;

    const courseId = document.querySelector("#modal-course-id").value;

    console.log(
      `nome do curso: ${courseName} \n descrição: ${courseDescription} \n status: ${courseStatus} \n categoria: ${courseCategory} \n professor: ${courseProfessor} \n id: ${courseId}`
    );

    if (
      !courseName ||
      !courseDescription ||
      !courseCategory ||
      !courseProfessor
    ) {
      console.log(
        courseName,
        courseDescription,
        courseStatus,
        courseCategory,
        courseProfessor
      );
      alert("Preencha todos os campos!");
      return;
    }

    if (isCreate) {
      await createCourse(
        courseName,
        courseDescription,
        courseStatus,
        courseCategory,
        courseProfessor
      );
    } else {
      await updateCourse(
        courseName,
        courseDescription,
        courseStatus,
        courseCategory,
        courseProfessor,
        courseId
      );
    }
  });

document
  .querySelector(".view-list")
  .addEventListener("click", async (event) => {
    const courseItem = event.target.closest("li");
    const courseId = courseItem.dataset.id;
    if (event.target.classList.contains("edit")) {
      isCreate = false;
      const modalTitle = document.querySelector("#modal-title");
      modalTitle.textContent = "Editar Curso";
      document.querySelector("#modal-course-name").value =
        courseItem.querySelector(".course-name").textContent;
      document.querySelector("#modal-course-description").value =
        courseItem.querySelector(".course-description").textContent;
      document.querySelector("#modal-course-status").value =
        courseItem.querySelector(".course-status").textContent === "Ativo"
          ? 1
          : 0;
      document.querySelector("#modal-course-category").value =
        courseItem.querySelector(".course-category").textContent;
      document.querySelector("#modal-course-id").value = courseId;

      // Obter o ID do professor responsável pelo curso
      const professorName =
        courseItem.querySelector(".course-professor").textContent;
      const professor = await query(
        `SELECT id FROM professor WHERE CONCAT(name, ' ', last_name) = '${professorName}'`
      );
      const professorId = professor[0]?.id;

      await fetchProfessors(professorId); // Busca e preenche os professores, selecionando o professor responsável
      toggleHide();
    }

    if (event.target.classList.contains("delete")) {
      await deleteCourse(courseId);
    }
  });
