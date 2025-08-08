'use client';

import { useEffect, useState } from 'react';

interface Course {
  code: string;
  name: string;
  links?: string[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load courses data
    const loadCourses = async () => {
      try {
        const response = await fetch('/courses.json');
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Failed to load courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <>
      <header>
        <h1>Courses</h1>
      </header>

      <main>
        <p>
          The University of Hong Kong, Bachelor of Arts and Science in Applied
          Artificial Intelligence{' '}
          (<a href="https://saasweb.hku.hk/current/aai.php">BASc(AppliedAI)</a>)
        </p>

        {loading ? (
          <div id="loading-spinner" className="loading-spinner"></div>
        ) : (
          <div id="course-tables">
            <table id="combined-table" className="course-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Related Links</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course.code}</td>
                    <td>{course.name}</td>
                    <td>
                      {course.links?.map((link, linkIndex) => (
                        <span key={linkIndex}>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {new URL(link).hostname}
                          </a>
                          {linkIndex < course.links!.length - 1 && ', '}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p>
          <a href="/ChengHoMingTranscript.pdf">Transcript</a>
          <br />
          <a href="https://github.com/eric15342335?tab=repositories">GitHub Repositories</a>
        </p>
      </main>
    </>
  );
}