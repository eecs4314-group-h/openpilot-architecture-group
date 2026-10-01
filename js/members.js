/*
 * ================================================================
 * GOOGLE SHEET CONFIGURATION — PASTE YOUR PUBLISHED CSV URL BELOW
 * ================================================================
 */
const GOOGLE_SHEET_CSV_URL = "PASTE_GOOGLE_SHEET_CSV_URL_HERE";

const GROUP_MEMBERS = [
  "Setayesh Chegini",
  "Spence Hashemi",
  "Mehdi Jafarian",
  "David Odidi",
];

const teamContainer = document.getElementById("team-members");

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
    throw new Error("The published spreadsheet did not contain any rows.");
  }

  const headers = rows[0].map((header) => header.toLowerCase());
  const nameColumn = headers.indexOf("name");
  const studentNumberColumn = headers.indexOf("student number");

  if (nameColumn === -1 || studentNumberColumn === -1) {
    throw new Error('The spreadsheet must have "Name" and "Student Number" headers.');
  }

  const studentNumbers = new Map();

  rows.slice(1).forEach((columns) => {
    const name = (columns[nameColumn] || "").trim();
    const studentNumber = (columns[studentNumberColumn] || "").trim();

    if (name) {
      studentNumbers.set(name.toLowerCase(), studentNumber);
    }
  });

  return studentNumbers;
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

    card.append(heading, detail);
    teamContainer.append(card);
  });

  teamContainer.setAttribute("aria-busy", "false");
}

async function loadMembers() {
  try {
    if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL === "PASTE_GOOGLE_SHEET_CSV_URL_HERE") {
      throw new Error("Google Sheet CSV URL has not been configured in js/members.js.");
    }

    const response = await fetch(GOOGLE_SHEET_CSV_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Google Sheet request failed with status ${response.status}.`);
    }

    const csvText = await response.text();
    renderMembers(getStudentNumbers(csvText));
  } catch (error) {
    console.error("Unable to load team member information from the Google Sheet:", error);
    renderMembers(new Map(), "Unable to load");
  }
}

loadMembers();
