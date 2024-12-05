import { runMigrations, executeQuery as query } from "/database/migrations.js";

await runMigrations();

async function RenderMatricula() {
  try {
    const studentAll = await query("SELECT * FROM student");
    const enrollAll = await query("SELECT * FROM enroll");
    const enrollClassAll = await query("SELECT * FROM enroll");
    const GetAllMatricula = await query(
      `SELECT 
        enroll.id, 
        student.name as student_name, 
        student.email, 
        student.last_name, 
        course.name as course_name, 
        enroll.status as enroll_status,
        class.id as class_id,
        class.name as class_name,
        class_enroll.status as class_enroll_status,
        grade.p1, 
        grade.p2, 
        grade.t, 
        grade.grade 
        FROM class_enroll        
        JOIN class ON class_enroll.class_id = class.id 
        JOIN enroll ON class_enroll.enroll_id = enroll.id 
        JOIN course ON enroll.course_id = course.id 
        JOIN student ON enroll.student_id = student.id
        JOIN grade ON class_enroll.grade_id = grade.id;
       `
    );
    console.log(studentAll, enrollAll, enrollClassAll);

    const template = document.querySelector("#enroll-template").content;
    const viewList = document.querySelector(".view-list");

    while (viewList.firstChild) {
      viewList.removeChild(viewList.firstChild);
    }

    for (let matricula of GetAllMatricula) {
      const clone = document.importNode(template, true);
      clone.querySelector(
        ".student-name"
      ).textContent = `${matricula.student_name} ${matricula.last_name}`;
      clone.querySelector(".student-email").textContent = matricula.email;
      clone.querySelector(".course-name").textContent = matricula.course_name;
      clone.querySelector(".enroll-status").textContent =
        matricula.enroll_status ? "Ativo" : "Inativo";
      clone.querySelector(".class-name").textContent = matricula.class_name
        ? matricula.class_name
        : "Não matriculado em turma";
      clone.querySelector(
        ".grades"
      ).textContent = `P1: ${matricula.p1}, P2: ${matricula.p2}, T: ${matricula.t}, Nota Final: ${matricula.grade}`;
      clone.querySelector("li").dataset.id = matricula.id;

      viewList.appendChild(clone);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createMatricula(
  studentName,
  studentLastName,
  studentEmail,
  courseId,
  classId
) {
  try {
    console.log("Iniciando criação de matrícula...");

    // Inserir o estudante na tabela student
    const studentResult = await query(
      `INSERT INTO student (name, last_name, email) VALUES ('${studentName}', '${studentLastName}', '${studentEmail}') RETURNING id`
    );
    const studentId = studentResult[0].id;
    console.log("Estudante inserido com ID:", studentId);

    // Inserir na tabela enroll
    const enrollResult = await query(
      `INSERT INTO enroll (student_id, course_id) VALUES ('${studentId}', '${courseId}') RETURNING id`
    );
    const enrollId = enrollResult[0].id;
    console.log("Matrícula inserida com ID:", enrollId);

    // Inserir na tabela grade com todos os valores como NULL
    const gradeResult = await query(
      `INSERT INTO grade (p1, p2, t, grade) VALUES (0, 0, 0, 0) RETURNING id`
    );
    const gradeId = gradeResult[0].id;
    console.log("Grade criada com ID:", gradeId);

    // Inserir na tabela class_enroll com o grade_id gerado
    await query(
      `INSERT INTO class_enroll (enroll_id, class_id, grade_id, status) VALUES ('${enrollId}', '${classId}', '${gradeId}', TRUE)`
    );
    console.log("Inscrição na turma inserida com sucesso");

    // Renderizar a matrícula e alternar a visibilidade
    RenderMatricula();
    toggleHide();
    console.log("Matrícula criada e interface atualizada com sucesso");
  } catch (error) {
    console.error("Erro ao criar matrícula:", error);
  }
}

async function updateMatricula(
  studentName,
  studentLastName,
  studentEmail,
  courseId,
  classId,
  matriculaId
) {
  try {
    // Atualizar os dados do estudante na tabela student
    const studentResult = await query(
      `UPDATE student SET name = '${studentName}', last_name = '${studentLastName}', email = '${studentEmail}' WHERE id = (SELECT student_id FROM enroll WHERE id = ${matriculaId}) RETURNING id`
    );
    const studentId = studentResult[0].id;

    // Atualizar a tabela enroll
    await query(
      `UPDATE enroll SET student_id = '${studentId}', course_id = '${courseId}' WHERE id = ${matriculaId}`
    );

    // Atualizar a tabela class_enroll
    await query(
      `UPDATE class_enroll SET class_id = '${classId}' WHERE enroll_id = ${matriculaId}`
    );

    // Renderizar a matrícula e alternar a visibilidade
    RenderMatricula();
    toggleHide();
  } catch (error) {
    console.error(error);
  }
}

async function deleteMatricula(matriculaId) {
  try {
    await query(`DELETE FROM class_enroll WHERE enroll_id = ${matriculaId}`);
    await query(`DELETE FROM enroll WHERE id = ${matriculaId}`);
    RenderMatricula();
  } catch (error) {
    console.error("Erro ao deletar matrícula:", error);
  }
}

// Renderizar matrículas
addEventListener("DOMContentLoaded", RenderMatricula());

function toggleHide() {
  modal.classList.toggle("hide");
  fade.classList.toggle("hide");
}

const addModalButton = document.querySelector("#open-modal");
const fade = document.querySelector("#fade");
const modal = document.querySelector("#modal-add");
let isCreate = true;

// Função para buscar e preencher a lista de alunos

// Função para buscar e preencher a lista de cursos
async function fetchCourses(selectedCourseId = null) {
  try {
    const courses = await query("SELECT id, name FROM course");
    const courseSelect = document.querySelector("#modal-course-name");
    courseSelect.innerHTML = ""; // Limpa as opções existentes

    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.id;
      option.textContent = course.name;
      if (course.id === selectedCourseId) {
        option.selected = true;
      }
      courseSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao buscar cursos:", error);
  }
}

// Função para buscar e preencher a lista de turmas
async function fetchClasses(selectedClassId = null) {
  try {
    const classes = await query("SELECT id, name FROM class");
    const classSelect = document.querySelector("#modal-class-name");
    classSelect.innerHTML = ""; // Limpa as opções existentes

    classes.forEach((classItem) => {
      const option = document.createElement("option");
      option.value = classItem.id;
      option.textContent = classItem.name;
      if (classItem.id === selectedClassId) {
        option.selected = true;
      }
      classSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao buscar turmas:", error);
  }
}

// Quando clicar em Adicionar mostra o modal e troca isCreate para True
addModalButton.addEventListener("click", async () => {
  isCreate = true;
  document.querySelector("#modal-title").textContent = "Adicionar Matrícula";
  await fetchCourses(); // Busca e preenche os cursos
  await fetchClasses(); // Busca e preenche as turmas
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
    const studentName = document.querySelector("#modal-student-name").value;
    const studentLastName = document.querySelector(
      "#modal-student-last-name"
    ).value;
    const studentEmail = document.querySelector("#modal-student-email").value;
    const courseId = document.querySelector("#modal-course-name").value;
    const classId = document.querySelector("#modal-class-name").value;
    const matriculaId = document.querySelector("#modal-id").value;

    if (
      studentName &&
      studentLastName &&
      studentEmail &&
      courseId &&
      classId &&
      isCreate === true
    ) {
      await createMatricula(
        studentName,
        studentLastName,
        studentEmail,
        courseId,
        classId
      );
    }

    if (
      studentName &&
      studentLastName &&
      studentEmail &&
      courseId &&
      classId &&
      isCreate === false
    ) {
      await updateMatricula(
        studentName,
        studentLastName,
        studentEmail,
        courseId,
        classId,
        matriculaId
      );
    }
  });

document
  .querySelector(".view-list")
  .addEventListener("click", async (event) => {
    const matriculaItem = event.target.closest("li");
    const matriculaId = matriculaItem.dataset.id;
    if (event.target.classList.contains("edit")) {
      isCreate = false;
      const studentName =
        matriculaItem.querySelector(".student-name").textContent;
      const student = await query(
        `SELECT id, name, last_name, email FROM student WHERE CONCAT(name, ' ', last_name) = '${studentName}'`
      );
      const studentId = student[0]?.id;
      const studentFirstName = student[0]?.name;
      const studentLastName = student[0]?.last_name;
      const studentEmail = student[0]?.email;

      document.querySelector("#modal-id").value = matriculaId;
      document.querySelector("#modal-student-name").value = studentFirstName;
      document.querySelector("#modal-student-last-name").value =
        studentLastName;
      document.querySelector("#modal-student-email").value = studentEmail;

      const modalTitle = document.querySelector("#modal-title");
      modalTitle.textContent = "Editar Matrícula";

      const courseName =
        matriculaItem.querySelector(".course-name").textContent;
      const course = await query(
        `SELECT id FROM course WHERE name = '${courseName}'`
      );
      const courseId = course[0]?.id;

      const className = matriculaItem.querySelector(".class-name").textContent;
      const classItem = await query(
        `SELECT id FROM class WHERE name = '${className}'`
      );
      const classId = classItem[0]?.id;

      await fetchCourses(courseId); // Busca e preenche os cursos, selecionando o curso responsável
      await fetchClasses(classId); // Busca e preenche as turmas, selecionando a turma responsável

      toggleHide();
    }

    if (event.target.classList.contains("delete")) {
      await deleteMatricula(matriculaId);
    }
  });
