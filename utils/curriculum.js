// src/utils/curriculum.js
export const findCourseByCode = (curriculumData, code) => {
  for (const semester of curriculumData) {
    for (const course of semester.courses) {
      if (course.code === code) {
        return course;
      }
    }
  }
  return null;
};

export const canApproveCourse = (curriculumData, course) => {
  // Verificar prerrequisitos
  for (const prereqCode of course.prerequisites) {
    const prereqCourse = findCourseByCode(curriculumData, prereqCode);
    if (!prereqCourse || !prereqCourse.approved) {
      return false;
    }
  }
  return true;
};

export const calculateStats = (curriculumData) => {
  let totalCourses = 0;
  let completedCourses = 0;

  curriculumData.forEach(semester => {
    semester.courses.forEach(course => {
      totalCourses++;
      if (course.approved) completedCourses++;
    });
  });

  const progress = totalCourses > 0
    ? Math.round((completedCourses / totalCourses) * 100)
    : 0;

  return {
    totalCourses,
    completed: completedCourses,
    progress
  };
};

export const getAvailableSemesters = (curriculumData) => {
  const semesters = curriculumData.map(s => s.semester);
  const maxSemester = Math.max(...semesters, 0);
  return Array.from({ length: maxSemester + 2 }, (_, i) => i + 1);
};
