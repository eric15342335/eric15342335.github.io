"use strict";

// Constants for table element IDs
const TABLE_IDS = {
  IN_PROGRESS: "in-progress-table",
  STUDIED: "studied-table"
};

// Get the current year
const CURRENT_YEAR = new Date().getFullYear();

// Determine the current semester based on the current month
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

// Path to the courses JSON file
const COURSES_JSON_PATH = "/assets/courses.json";

// CSS class for fixed-width fonts
const FIXED_WIDTH_FONT_CLASS = "fixed-width-font";

// Object keys for course properties
const COURSE_PROPERTIES = {
  CODE: "code",
  NAME: "name",
  URL: "url",
  SEMESTER: "semester",
  YEAR: "year"
};

// Text indicators for current and upcoming semesters
const CURRENT_TIMEFRAME_TEXT = " (current semester)";
const UPCOMING_TIMEFRAME_TEXT = " (upcoming semester)";

/**
 * Fetch courses data using XMLHttpRequest.
 * @param {Function} callback - Function to call with the fetched data or error.
 */
function fetchCourses(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", COURSES_JSON_PATH, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) { // Request is complete
      if (xhr.status === 200) { // Success
        try {
          const data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (parseError) {
          callback(parseError, []);
        }
      } else { // Error
        callback(new Error("Failed to fetch courses."), []);
      }
    }
  };

  xhr.send();
}

/**
 * Create a table row for a course.
 * @param {Object} course - The course object.
 * @returns {HTMLElement} - The table row element.
 */
function createCourseRow(course) {
  const row = document.createElement("tr");

  // Create and configure the code cell
  const codeCell = document.createElement("td");
  codeCell.className = FIXED_WIDTH_FONT_CLASS;
  codeCell.textContent = course[COURSE_PROPERTIES.CODE];
  row.appendChild(codeCell);

  // Create and configure the name cell with a link
  const nameCell = document.createElement("td");
  const link = document.createElement("a");
  link.href = course[COURSE_PROPERTIES.URL];
  link.textContent = course[COURSE_PROPERTIES.NAME];
  link.target = "_blank"; // Open link in a new tab
  nameCell.appendChild(link);
  row.appendChild(nameCell);

  return row;
}

/**
 * Determine if a given course is current/future based on internal logic.
 * This function treats "2024 Semester 2" logically as "2025 Semester 2" behind the scenes.
 * @param {Number} originalYear
 * @param {Number} originalSemester
 * @returns {Object} - { isCurrent: Boolean, isFuture: Boolean }
 */
function computeSemesterStatus(originalYear, originalSemester) {
  // We'll treat 2024 Semester 2 as if it were 2025 Semester 2 for logic only.
  let logicYear = originalYear;
  let logicSemester = originalSemester;

  // If the course is 2024 Semester 2, override for logic
  if (logicYear === 2024 && logicSemester === 2) {
    logicYear = 2025;
    logicSemester = 2;
  }

  // Evaluate if it's current or future based on the logicYear/logicSemester
  const isCurrent =
    (logicYear === CURRENT_YEAR && logicSemester === CURRENT_SEMESTER);
  const isFuture =
    (logicYear > CURRENT_YEAR) ||
    (logicYear === CURRENT_YEAR && logicSemester > CURRENT_SEMESTER);

  return {
    isCurrent: isCurrent,
    isFuture: isFuture
  };
}

/**
 * Display the list of courses in the appropriate tables.
 * @param {Array} courses - Array of course objects.
 */
function displayCourses(courses) {
  const loadingSpinner = document.getElementById("loading-spinner");
  const courseTables = document.getElementById("course-tables");

  // Hide loading spinner and show course tables
  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }
  if (courseTables) {
    courseTables.style.display = "block";
  }

  const inProgressTable = document.getElementById(TABLE_IDS.IN_PROGRESS);
  const studiedTable = document.getElementById(TABLE_IDS.STUDIED);

  let currentSemesterYearDisplayed = null;
  let currentTargetTable = null;

  // Sort courses by year and semester in ascending order (as originally stored)
  courses.sort(function(a, b) {
    if (a[COURSE_PROPERTIES.YEAR] !== b[COURSE_PROPERTIES.YEAR]) {
      return a[COURSE_PROPERTIES.YEAR] - b[COURSE_PROPERTIES.YEAR];
    }
    return a[COURSE_PROPERTIES.SEMESTER] - b[COURSE_PROPERTIES.SEMESTER];
  });

  // Iterate through each course to display it in the appropriate table
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];

    const originalYear = course[COURSE_PROPERTIES.YEAR];
    const originalSemester = course[COURSE_PROPERTIES.SEMESTER];
    const { isCurrent, isFuture } = computeSemesterStatus(originalYear, originalSemester);

    // This is the text we actually show the user, preserving "2024 Semester 2"
    const displayedSemesterYear = originalYear + " Semester " + originalSemester;

    // Decide which table to put this course in
    const targetTable = (isCurrent || isFuture) ? inProgressTable : studiedTable;

    // If it's a new semester or a new table, add a semester header row
    if (displayedSemesterYear !== currentSemesterYearDisplayed || targetTable !== currentTargetTable) {
      currentSemesterYearDisplayed = displayedSemesterYear;
      currentTargetTable = targetTable;

      const semesterHeaderRow = document.createElement("tr");
      const semesterHeaderCell = document.createElement("td");
      semesterHeaderCell.setAttribute("colspan", "2");
      semesterHeaderCell.textContent = displayedSemesterYear;

      // Append timeframe indicators if applicable
      if (isCurrent) {
        semesterHeaderCell.textContent += CURRENT_TIMEFRAME_TEXT;
      } else if (isFuture) {
        semesterHeaderCell.textContent += UPCOMING_TIMEFRAME_TEXT;
      }

      semesterHeaderRow.appendChild(semesterHeaderCell);

      if (targetTable) {
        targetTable.appendChild(semesterHeaderRow);
      }
    }

    // Create and append the course row to the target table
    if (targetTable) {
      const courseRow = createCourseRow(course);
      targetTable.appendChild(courseRow);
    }
  }
}

/**
 * Initialize the course display process once the DOM is fully loaded.
 */
function initializeCourseDisplay() {
  fetchCourses(function(error, courses) {
    if (!error) {
      displayCourses(courses);
    } else {
      console.error("Error fetching courses:", error);
      // Optionally, display an error message to the user
      const loadingSpinner = document.getElementById("loading-spinner");
      if (loadingSpinner) {
        loadingSpinner.textContent = "Failed to load courses.";
      }
    }
  });
}

// Wait until DOM is ready, then initialize course display
document.addEventListener("DOMContentLoaded", initializeCourseDisplay);
