// src/context/CurriculumContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { loadCurriculumData, saveCurriculumData } from '../utils/storage';
import { calculateStats, canApproveCourse } from '../utils/curriculum';

export const CurriculumContext = createContext();

export const CurriculumProvider = ({ children }) => {
  const [curriculumData, setCurriculumData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [stats, setStats] = useState({ totalCourses: 0, completed: 0, progress: 0 });

  // Cargar datos al iniciar
  useEffect(() => {
    const loadData = async () => {
      const data = await loadCurriculumData();
      if (data) {
        setCurriculumData(data);
        updateStats(data);
      } else {
        // Datos iniciales
        const initialData = [
          {
            semester: 1,
            credits: 20,
            courses: [
              { code: "MAT101", name: "Cálculo Diferencial", credits: 5, prerequisites: [], creditRequirement: 0, approved: false },
              { code: "FIS101", name: "Física General I", credits: 4, prerequisites: [], creditRequirement: 0, approved: false },
              { code: "PROG101", name: "Introducción a la Programación", credits: 5, prerequisites: [], creditRequirement: 0, approved: false },
              { code: "HUM101", name: "Humanidades I", credits: 3, prerequisites: [], creditRequirement: 0, approved: false },
              { code: "ADM101", name: "Administración General", credits: 3, prerequisites: [], creditRequirement: 0, approved: false }
            ]
          },
          // ... más semestres
        ];
        setCurriculumData(initialData);
        updateStats(initialData);
      }
    };
    loadData();
  }, []);

  // Guardar datos cuando cambian
  useEffect(() => {
    saveCurriculumData(curriculumData);
    updateStats(curriculumData);
  }, [curriculumData]);

  const updateStats = (data) => {
    const s = calculateStats(data);
    setStats(s);
  };

  const approveCourse = (courseCode) => {
    setCurriculumData(prevData =>
      prevData.map(sem => ({
        ...sem,
        courses: sem.courses.map(course =>
          course.code === courseCode && canApproveCourse(prevData, course)
            ? { ...course, approved: true }
            : course
        )
      }))
    );
  };

  const setCoursePending = (courseCode) => {
    setCurriculumData(prevData =>
      prevData.map(sem => ({
        ...sem,
        courses: sem.courses.map(course =>
          course.code === courseCode
            ? { ...course, approved: false }
            : course
        )
      }))
    );
  };

  const addNewCourse = (newCourse, semesterNumber) => {
    setCurriculumData(prevData => {
      const exists = prevData.find(s => s.semester === semesterNumber);
      if (exists) {
        return prevData.map(s =>
          s.semester === semesterNumber
            ? {
                ...s,
                credits: s.credits + newCourse.credits,
                courses: [...s.courses, newCourse],
              }
            : s
        );
      } else {
        const newSemester = {
          semester: semesterNumber,
          credits: newCourse.credits,
          courses: [newCourse],
        };
        return [...prevData, newSemester].sort((a, b) => a.semester - b.semester);
      }
    });
  };

  const resetProgress = () => {
    setCurriculumData(prevData =>
      prevData.map(s => ({
        ...s,
        courses: s.courses.map(course => ({ ...course, approved: false })),
      }))
    );
  };

  return (
    <CurriculumContext.Provider
      value={{
        curriculumData,
        isEditMode,
        stats,
        setIsEditMode,
        approveCourse,
        setCoursePending,
        addNewCourse,
        resetProgress
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
};

export const useCurriculum = () => useContext(CurriculumContext);
