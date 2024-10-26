"use strict";

const TABLE_IDS = {
  IN_PROGRESS: "in-progress-table",
  STUDIED: "studied-table"
};

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_SEMESTER = (function() {
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

// Use XMLHttpRequest instead of fetch
function fetchCourses(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", COURSES_JSON_PATH, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      try {
        var data = JSON.parse(xhr.responseText);
        callback(null, data);
      } catch (error) {
        callback(error, []);
      }
    } else if (xhr.readyState === 4) {
      callback(new Error("Failed to fetch courses."), []);
    }
  };
  xhr.send();
}

function createCourseRow(course) {
  const row = document.createElement("tr");
  const codeCell = document.createElement("td");
  codeCell.classList.add(FIXED_WIDTH_FONT_CLASS);
  codeCell.textContent = course[COURSE_PROPERTIES.CODE];

  const nameCell = document.createElement("td");
  const link = document.createElement("a");
  link.href = course[COURSE_PROPERTIES.URL];
  link.textContent = course[COURSE_PROPERTIES.NAME];
  nameCell.appendChild(link);

  row.appendChild(codeCell);
  row.appendChild(nameCell);
  return row;
}

function displayCourses(courses) {
  const loadingSpinner = document.getElementById("loading-spinner");
  const courseTables = document.getElementById("course-tables");
  
  // Hide loading spinner and show course tables
  loadingSpinner.style.display = "none";
  courseTables.style.display = "block";

  const inProgressTable = document.getElementById(TABLE_IDS.IN_PROGRESS);
  const studiedTable = document.getElementById(TABLE_IDS.STUDIED);

  let currentSemesterYear = null;
  let currentTable = null;

  for (var i = 0; i < courses.length; i++) {
    var course = courses[i];
    var year = course[COURSE_PROPERTIES.YEAR];
    var semester = course[COURSE_PROPERTIES.SEMESTER];
    var isCurrent = year === CURRENT_YEAR && semester === CURRENT_SEMESTER;
    var isFuture = year > CURRENT_YEAR || (year === CURRENT_YEAR && semester > CURRENT_SEMESTER);

    var semesterYear = year + " Semester " + semester;
    var targetTable = isCurrent || isFuture ? inProgressTable : studiedTable;

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
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fetchCourses(function(error, courses) {
    if (!error) {
      displayCourses(courses);
    } else {
      console.error("Error fetching courses:", error);
    }
  });
});
