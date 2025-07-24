// src/components/SemesterSection.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CourseCard from './CourseCard';

const SemesterSection = ({ semester }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/semester.png')} style={styles.icon} />
        <Text style={styles.title}>Semestre {semester.semester}</Text>
        <Text style={styles.credits}>{semester.credits} créditos</Text>
      </View>

      {semester.courses.map(course => (
        <CourseCard
          key={course.code}
          course={course}
          semester={semester.semester}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  credits: {
    backgroundColor: '#e74c3c',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    fontWeight: 'bold',
  },
});

export default SemesterSection;
