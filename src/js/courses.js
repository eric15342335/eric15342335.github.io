"use strict";

// Constants for table element IDs
const TABLE_IDS = {
  COMBINED: "combined-table",
};

// Get the current year
const CURRENT_YEAR = new Date().getFullYear();

// Determine the current semester based on the current month
const CURRENT_SEMESTER = (function () {
  const now = new Date();
  const month = now.getMonth() + 1;

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
  YEAR: "year",
  RELATED_ITEMS: "relatedItems",
};

const UPCOMING_TIMEFRAME_TEXT = " (upcoming semester)";

/**
 * Fetch courses data using XMLHttpRequest.
 * @param {Function} callback - Function to call with the fetched data or error.
 */
function fetchCourses(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", COURSES_JSON_PATH, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (parseError) {
          callback(parseError, []);
        }
      } else {
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

  const codeCell = document.createElement("td");
  codeCell.className = FIXED_WIDTH_FONT_CLASS;
  codeCell.textContent = course[COURSE_PROPERTIES.CODE];
  row.appendChild(codeCell);

  const nameCell = document.createElement("td");
  const link = document.createElement("a");
  link.href = course[COURSE_PROPERTIES.URL];
  link.textContent = course[COURSE_PROPERTIES.NAME];
  link.target = "_blank";
  nameCell.appendChild(link);
  row.appendChild(nameCell);

  const relatedItemsCell = document.createElement("td");
  if (course[COURSE_PROPERTIES.RELATED_ITEMS]) {
    course[COURSE_PROPERTIES.RELATED_ITEMS].forEach((item) => {
      const itemLink = document.createElement("a");
      itemLink.href = item.url;
      itemLink.textContent = item.displayText;
      itemLink.target = "_blank";
      itemLink.style.marginRight = "10px";
      relatedItemsCell.appendChild(itemLink);
    });
  }
  row.appendChild(relatedItemsCell);

  return row;
}

/**
 * Determine if a given course is current/future based on internal logic.
 * An academic "Year" begins with Semester 1 in the fall. Semesters 2 and 3
 * of that academic year occur in the next calendar year.
 * @param {Number} originalYear - The academic year of the course.
 * @param {Number} originalSemester - The semester of the course (1, 2, or 3).
 * @returns {Object} - { isCurrent: Boolean, isFuture: Boolean }
 */
function computeSemesterStatus(originalYear, originalSemester) {
  // Determine the calendar year the course takes place in.
  // Semesters 2 (Spring) and 3 (Summer) occur in the calendar year after the academic year starts.
  let calendarYear = originalYear;
  if (originalSemester === 2 || originalSemester === 3) {
    calendarYear += 1;
  }

  const isCurrent =
    calendarYear === CURRENT_YEAR && originalSemester === CURRENT_SEMESTER;

  // To correctly compare semesters, we must account for their chronological order (2 -> 3 -> 1).
  // We can create a comparable value for each semester.
  const getSemesterOrderValue = (semester) => {
    if (semester === 1) return 3; // Fall is last
    if (semester === 2) return 1; // Spring is first
    if (semester === 3) return 2; // Summer is second
    return 0;
  };

  const courseOrderValue = getSemesterOrderValue(originalSemester);
  const currentOrderValue = getSemesterOrderValue(CURRENT_SEMESTER);

  const isFuture =
    calendarYear > CURRENT_YEAR ||
    (calendarYear === CURRENT_YEAR && courseOrderValue > currentOrderValue);

  return {
    isCurrent,
    isFuture,
  };
}

/**
 * Display the list of courses in the appropriate tables.
 * @param {Array} courses - Array of course objects.
 */
function displayCourses(courses) {
  const loadingSpinner = document.getElementById("loading-spinner");
  const courseTables = document.getElementById("course-tables");

  if (loadingSpinner) {
    loadingSpinner.style.display = "none";
  }
  if (courseTables) {
    courseTables.style.display = "block";
  }

  const combinedTable = document.getElementById(TABLE_IDS.COMBINED);

  const futureCourses = [];
  const pastCourses = [];

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const originalYear = course[COURSE_PROPERTIES.YEAR];
    const originalSemester = course[COURSE_PROPERTIES.SEMESTER];
    const { isCurrent, isFuture } = computeSemesterStatus(
      originalYear,
      originalSemester,
    );
    if (isCurrent || isFuture) {
      futureCourses.push(course);
    } else {
      pastCourses.push(course);
    }
  }

  futureCourses.sort(function (a, b) {
    if (a[COURSE_PROPERTIES.YEAR] !== b[COURSE_PROPERTIES.YEAR]) {
      return a[COURSE_PROPERTIES.YEAR] - b[COURSE_PROPERTIES.YEAR];
    }
    return a[COURSE_PROPERTIES.SEMESTER] - b[COURSE_PROPERTIES.SEMESTER];
  });

  pastCourses.sort(function (a, b) {
    if (a[COURSE_PROPERTIES.YEAR] !== b[COURSE_PROPERTIES.YEAR]) {
      return b[COURSE_PROPERTIES.YEAR] - a[COURSE_PROPERTIES.YEAR];
    }
    return b[COURSE_PROPERTIES.SEMESTER] - a[COURSE_PROPERTIES.SEMESTER];
  });

  const allCourses = [...futureCourses, ...pastCourses];

  let currentSemesterYearDisplayed = null;
  for (let i = 0; i < allCourses.length; i++) {
    const course = allCourses[i];
    const originalYear = course[COURSE_PROPERTIES.YEAR];
    const originalSemester = course[COURSE_PROPERTIES.SEMESTER];
    const { isFuture } = computeSemesterStatus(originalYear, originalSemester);
    const displayedSemesterYear = originalYear + " Semester " + originalSemester;

    if (displayedSemesterYear !== currentSemesterYearDisplayed) {
      currentSemesterYearDisplayed = displayedSemesterYear;
      const semesterHeaderRow = document.createElement("tr");
      const semesterHeaderCell = document.createElement("td");
      semesterHeaderCell.setAttribute("colspan", "3");
      semesterHeaderCell.style.textAlign = "left";
      semesterHeaderCell.textContent = displayedSemesterYear;

      if (isFuture) {
        semesterHeaderCell.textContent += UPCOMING_TIMEFRAME_TEXT;
      }
      semesterHeaderRow.appendChild(semesterHeaderCell);
      combinedTable.appendChild(semesterHeaderRow);
    }
    const courseRow = createCourseRow(course);
    combinedTable.appendChild(courseRow);
  }
}

/**
 * Initialize the course display process once the DOM is fully loaded.
 */
function initializeCourseDisplay() {
  fetchCourses(function (error, courses) {
    if (!error) {
      displayCourses(courses);
    } else {
      console.error("Error fetching courses:", error);
      const loadingSpinner = document.getElementById("loading-spinner");
      if (loadingSpinner) {
        loadingSpinner.textContent = "Failed to load courses.";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", initializeCourseDisplay);
