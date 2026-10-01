/*
 * =====================================================================
 * GOOGLE FORMS + SHEETS CONFIGURATION — REPLACE ALL FOUR VALUES BELOW
 * Full setup instructions are in README.md.
 * =====================================================================
 */
const GOOGLE_FORM_ID = "1FAIpQLSfOShtEKYaiJvwRHARHP9VGsE4iLjbSz1NXv24DU9K1NvY6qQ";
const GOOGLE_FORM_NAME_ENTRY_ID = "entry.489204874";
const GOOGLE_FORM_STUDENT_NUMBER_ENTRY_ID = "entry.353591388";
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT865JKq86Cs6w6FJxd6-ka60rjATrPSTY2llm50AcC_yRNvl5dwvJCJrBaq6olv32X2hetWk2UBGjt/pub?gid=1497950523&single=true&output=csv";

const GROUP_MEMBERS = [
  "Setayesh Chegini",
  "Spence Hashemi",
  "Mehdi Jafarian",
  "David Odidi",
];

const teamContainer = document.getElementById("team-members");
const studentNumberDialog = document.getElementById("student-number-dialog");
const studentNumberForm = document.getElementById("student-number-form");
const memberNameSelect = document.getElementById("member-name");
const studentNumberInput = document.getElementById("student-number");
const formStatus = document.getElementById("student-number-status");
const submitButton = document.getElementById("student-number-submit");
const closeButton = document.getElementById("student-number-dialog-close");
const cancelButton = document.getElementById("student-number-cancel");

let displayedStudentNumbers = new Map();

function isPlaceholder(value) {
  return !value || value.includes("PASTE_");
}

function isSheetConfigured() {
  return !isPlaceholder(GOOGLE_SHEET_CSV_URL);
}

function isFormConfigured() {
  return [
    GOOGLE_FORM_ID,
    GOOGLE_FORM_NAME_ENTRY_ID,
    GOOGLE_FORM_STUDENT_NUMBER_ENTRY_ID,
  ].every((value) => !isPlaceholder(value));
}

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let value = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && insideQuotes && nextCharacter === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      row.push(value.trim());
      value = "";
    } else if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }
      row.push(value.trim());
      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }
      row = [];
      value = "";
    } else {
      value += character;
    }
  }

  row.push(value.trim());
  if (row.some((cell) => cell !== "")) {
    rows.push(row);
  }

  return rows;
}

function getStudentNumbers(csvText) {
  const rows = parseCsv(csvText.replace(/^\uFEFF/, ""));

  if (rows.length === 0) {
    throw new Error("The published response sheet did not contain any rows.");
  }

  const headers = rows[0].map((header) => header.toLowerCase());
  const nameColumn = headers.indexOf("name");
  const studentNumberColumn = headers.indexOf("student number");

  if (nameColumn === -1 || studentNumberColumn === -1) {
    throw new Error('The response sheet must have "Name" and "Student Number" columns.');
  }

  const studentNumbers = new Map();

  // Google Forms appends new responses at the bottom. Reading top to bottom
  // means a later response replaces an earlier response for the same member.
  rows.slice(1).forEach((columns) => {
    const name = (columns[nameColumn] || "").trim();
    const studentNumber = (columns[studentNumberColumn] || "").trim();

    if (name && GROUP_MEMBERS.some((member) => member.toLowerCase() === name.toLowerCase())) {
      studentNumbers.set(name.toLowerCase(), studentNumber);
    }
  });

  return studentNumbers;
}

function openSubmissionForm(name) {
  memberNameSelect.value = name;
  studentNumberInput.value = "";
  studentNumberInput.setCustomValidity("");
  setFormStatus("");
  studentNumberDialog.showModal();
  studentNumberInput.focus();
}

function renderMembers(studentNumbers, fallbackMessage = "") {
  teamContainer.replaceChildren();

  GROUP_MEMBERS.forEach((name) => {
    const card = document.createElement("article");
    card.className = "member-card";

    const heading = document.createElement("h3");
    heading.textContent = name;

    const detail = document.createElement("p");
    detail.append("Student Number:");

    const number = document.createElement("strong");
    number.textContent = fallbackMessage || studentNumbers.get(name.toLowerCase()) || "Not added yet";
    detail.append(number);

    const action = document.createElement("button");
    action.className = "member-action";
    action.type = "button";
    action.textContent = "Add / Update Student Number";
    action.addEventListener("click", () => openSubmissionForm(name));

    card.append(heading, detail, action);
    teamContainer.append(card);
  });

  teamContainer.setAttribute("aria-busy", "false");
}

function createFreshCsvUrl() {
  const csvUrl = new URL(GOOGLE_SHEET_CSV_URL);
  csvUrl.searchParams.set("websiteRefresh", Date.now().toString());
  return csvUrl.toString();
}

async function fetchStudentNumbers() {
  const response = await fetch(createFreshCsvUrl(), { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Google Sheet request failed with status ${response.status}.`);
  }

  return getStudentNumbers(await response.text());
}

async function loadMembers() {
  if (!isSheetConfigured()) {
    displayedStudentNumbers = new Map();
    renderMembers(displayedStudentNumbers);
    console.info("Google Sheet CSV URL has not been configured yet. Showing the empty team state.");
    return;
  }

  try {
    displayedStudentNumbers = await fetchStudentNumbers();
    renderMembers(displayedStudentNumbers);
  } catch (error) {
    console.error("Unable to load student numbers from the published response sheet:", error);
    renderMembers(new Map(), "Unable to load");
  }
}

function setFormStatus(message, state = "") {
  formStatus.textContent = message;
  formStatus.className = "form-status";

  if (state) {
    formStatus.classList.add(`is-${state}`);
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

async function refreshUntilSubmissionAppears(expectedName, expectedNumber) {
  if (!isSheetConfigured()) {
    return false;
  }

  for (let attempt = 0; attempt < 10; attempt += 1) {
    await wait(3000);

    try {
      const latestNumbers = await fetchStudentNumbers();

      if (latestNumbers.get(expectedName.toLowerCase()) === expectedNumber) {
        displayedStudentNumbers = latestNumbers;
        renderMembers(displayedStudentNumbers);
        return true;
      }
    } catch (error) {
      console.warn("Waiting for the published response sheet to update:", error);
    }
  }

  return false;
}

async function saveStudentNumber(event) {
  event.preventDefault();

  const name = memberNameSelect.value;
  const studentNumber = studentNumberInput.value.trim();

  if (!/^\d+$/.test(studentNumber)) {
    studentNumberInput.setCustomValidity("Enter a student number using digits only.");
    studentNumberInput.reportValidity();
    return;
  }

  studentNumberInput.setCustomValidity("");

  if (!isFormConfigured()) {
    setFormStatus("The Google Form is not configured yet. Follow the setup steps in README.md.", "error");
    return;
  }

  const formAction = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;
  const responseData = new URLSearchParams();
  responseData.set(GOOGLE_FORM_NAME_ENTRY_ID, name);
  responseData.set(GOOGLE_FORM_STUDENT_NUMBER_ENTRY_ID, studentNumber);

  submitButton.disabled = true;
  setFormStatus("Saving student number…");

  try {
    await fetch(formAction, {
      method: "POST",
      mode: "no-cors",
      body: responseData,
    });

    // Update the card immediately, then confirm against the published Sheet.
    displayedStudentNumbers.set(name.toLowerCase(), studentNumber);
    renderMembers(displayedStudentNumbers);
    setFormStatus("Student number saved successfully.", "success");

    const sheetUpdated = await refreshUntilSubmissionAppears(name, studentNumber);
    if (!sheetUpdated && isSheetConfigured()) {
      setFormStatus("Student number saved successfully. The published sheet may take a little longer to update.", "success");
    }
  } catch (error) {
    console.error("Unable to submit the student number to Google Forms:", error);
    setFormStatus("The student number could not be saved. Please try again.", "error");
  } finally {
    submitButton.disabled = false;
  }
}

studentNumberForm.addEventListener("submit", saveStudentNumber);
closeButton.addEventListener("click", () => studentNumberDialog.close());
cancelButton.addEventListener("click", () => studentNumberDialog.close());
studentNumberDialog.addEventListener("click", (event) => {
  if (event.target === studentNumberDialog) {
    studentNumberDialog.close();
  }
});
studentNumberInput.addEventListener("input", () => studentNumberInput.setCustomValidity(""));

renderMembers(displayedStudentNumbers);
loadMembers();
