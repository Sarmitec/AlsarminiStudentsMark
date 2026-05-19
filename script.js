const subjectMenuButton = document.getElementById("subjectMenuButton");
const subjectMenu = document.getElementById("subjectMenu");
const subjectTitle = document.getElementById("subjectTitle");
const addRowButton = document.getElementById("addRowButton");
const tableBody = document.getElementById("tableBody");

const subjects = [
  "اللغة العربية",
  "الرياضيات",
  "الفيزياء",
  "الكيمياء",
  "العلوم",
  "الفرنسية",
  "الانكليزية",
  "التربية الدينية",
  "التاريخ",
  "الجغرافيا",
  "الفلسفة",
];

subjectMenuButton.addEventListener("click", () => {
  subjectMenu.classList.toggle("show");
});

window.addEventListener("click", (event) => {
  if (!event.target.closest(".menu")) {
    subjectMenu.classList.remove("show");
  }
});

subjectMenu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    const subject = item.getAttribute("data-subject");
    subjectTitle.textContent = subject;
    subjectMenu.classList.remove("show");
    resetTable();
  });
});

addRowButton.addEventListener("click", () => {
  const row = createRow();
  tableBody.appendChild(row);
});

function createRow() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input type="text" placeholder="اسم الطالب" class="student-name" /></td>
    <td><input type="number" min="0" max="100" class="work-input" data-part="oral" /></td>
    <td><input type="number" min="0" max="100" class="work-input" data-part="homework" /></td>
    <td><input type="number" min="0" max="100" class="work-input" data-part="study1" /></td>
    <td><input type="number" min="0" max="100" class="work-input" data-part="study2" /></td>
    <td><input type="text" class="result-cell" readonly value="0" /></td>
    <td><input type="number" min="0" max="100" class="exam-input" data-part="oralExam" /></td>
    <td><input type="number" min="0" max="100" class="exam-input" data-part="writtenExam" /></td>
    <td><input type="text" class="result-cell" readonly value="0" /></td>
      <td><input type="text" class="result-cell half-result" readonly value="0" /></td>
  `;
  attachInputListeners(row);
  return row;
}

function attachInputListeners(row) {
  row.querySelectorAll("input[type='number']").forEach((input) => {
    input.addEventListener("input", () => updateRowTotals(row));
  });
}

function updateRowTotals(row) {
  const workInputs = Array.from(row.querySelectorAll(".work-input"));
  const oralExamInput = row.querySelector(".exam-input[data-part='oralExam']");
  const writtenExamInput = row.querySelector(".exam-input[data-part='writtenExam']");
  const resultCells = row.querySelectorAll(".result-cell");

  const workSum = workInputs.reduce((sum, input) => {
    const value = Number(input.value);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);

  const oralExam = Number(oralExamInput.value) || 0;
  const writtenExam = Number(writtenExamInput.value) || 0;
  const finalSum = workSum + oralExam + writtenExam;
  const halfSum = (finalSum / 2).toFixed(2);

  resultCells[0].value = workSum;
  resultCells[1].value = finalSum;
  resultCells[2].value = Number(halfSum);
}

function resetTable() {
  tableBody.innerHTML = "";
  const firstRow = createRow();
  tableBody.appendChild(firstRow);
}

// Initialize default row listeners
resetTable();

// ── Rotate / un-rotate screen ──────────────────
const rotateButton = document.getElementById("rotateButton");
rotateButton.addEventListener("click", () => {
  document.body.classList.toggle("rotated-mode");
  rotateButton.textContent = document.body.classList.contains("rotated-mode") ? "🔙" : "🔄";
});

// ── Table fullscreen mode ──────────────────────
const fullTableButton = document.getElementById("fullTableButton");
fullTableButton.addEventListener("click", () => {
  const body = document.body;
  const isFull = body.classList.toggle("table-fullscreen-mode");
  fullTableButton.textContent = isFull ? "↙ إخفاء كامل الشاشة" : "⛶ ملء الشاشة بالجدول";
  fullTableButton.title = isFull ? "العودة للوضع الطبيعي" : "ملء الشاشة بالجدول";
});
