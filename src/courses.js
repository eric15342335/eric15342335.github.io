"use strict";

const TABLE_IDS = {
  IN_PROGRESS: "in-progress-table",
  STUDIED: "studied-table"
};

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_SEMESTER = (() => {
  const now = new Date();
  const month = now.getMonth() + 1; // getMonth() returns 0-11

  if (month >= 9 && month <= 12) {
    return 1; // September to December
  } else if (month >= 1 && month <= 5) {
    return 2; // January to May
  } else {
    return 3; // June to August (summer semester)
  }
})();
const COURSES_JSON_PATH = "/assets/courses.json";
const FIXED_WIDTH_FONT_CLASS = "fixed-width-font";

const COURSE_PROPERTIES = {
  CODE: "code",
  NAME: "name",
  URL: "url",
  SEMESTER: "semester",
  YEAR: "year"
};

const currentTimeframeText = " (current semester)";
const upcomingTimeframeText = " (upcoming semester)";

const fetchCourses = async () => {
  try {
    const response = await fetch(COURSES_JSON_PATH);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

const createCourseRow = (course) => {
  const row = document.createElement("tr");
  const codeCell = document.createElement("td");
  codeCell.id = FIXED_WIDTH_FONT_CLASS;
  codeCell.textContent = course[COURSE_PROPERTIES.CODE];

  const nameCell = document.createElement("td");
  const link = document.createElement("a");
  link.href = course[COURSE_PROPERTIES.URL];
  link.textContent = course[COURSE_PROPERTIES.NAME];
  nameCell.appendChild(link);

  row.appendChild(codeCell);
  row.appendChild(nameCell);
  return row;
};

const displayCourses = (courses) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  const courseTables = document.getElementById("course-tables");
  
  // Hide loading spinner and show course tables
  loadingSpinner.style.display = "none";
  courseTables.style.display = "block";

  const inProgressTable = document.getElementById(TABLE_IDS.IN_PROGRESS);
  const studiedTable = document.getElementById(TABLE_IDS.STUDIED);

  let currentSemesterYear = null;
  let currentTable = null;

  courses.forEach((course) => {
    const { [COURSE_PROPERTIES.YEAR]: year, [COURSE_PROPERTIES.SEMESTER]: semester } = course;
    const isCurrent = year === CURRENT_YEAR && semester === CURRENT_SEMESTER;
    const isFuture = year > CURRENT_YEAR || (year === CURRENT_YEAR && semester > CURRENT_SEMESTER);

    const semesterYear = `${year} Semester ${semester}`;
    const targetTable = isCurrent || isFuture ? inProgressTable : studiedTable;

    if (semesterYear !== currentSemesterYear || targetTable !== currentTable) {
      currentSemesterYear = semesterYear;
      currentTable = targetTable;
      const semesterRow = document.createElement("tr");
      const semesterCell = document.createElement("td");
      semesterCell.setAttribute("colspan", "2");
      semesterCell.textContent = semesterYear;
      
      if (isCurrent) {
        semesterCell.textContent += currentTimeframeText;
      } else if (isFuture) {
        semesterCell.textContent += upcomingTimeframeText;
      }
      
      semesterRow.appendChild(semesterCell);
      targetTable.appendChild(semesterRow);
    }

    const row = createCourseRow(course);
    targetTable.appendChild(row);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const courses = await fetchCourses();
  displayCourses(courses);
});
