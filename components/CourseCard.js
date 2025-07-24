// src/components/CourseCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useCurriculum } from '../context/CurriculumContext';
import { canApproveCourse } from '../utils/curriculum';

const CourseCard = ({ course, semester }) => {
  const { curriculumData, isEditMode, approveCourse, setCoursePending } = useCurriculum();

  const canApprove = canApproveCourse(curriculumData, course);
  const status = course.approved ? 'Aprobado' : canApprove ? 'Pendiente' : 'Bloqueado';

  const statusColors = {
    Aprobado: { bg: '#e8f5e9', border: '#4caf50' },
    Pendiente: { bg: '#fffde7', border: '#ffc107' },
    Bloqueado: { bg: '#f5f5f5', border: '#9e9e9e' }
  };

  const statusColor = statusColors[status];

  const showDetails = () => {
    const prereqList = course.prerequisites.length > 0
      ? course.prerequisites.join(', ')
      : 'Ninguno';

    Alert.alert(
      `${course.code} - ${course.name}`,
      `Créditos: ${course.credits}\n` +
      `Requisitos de crédito: ${course.creditRequirement}\n` +
      `Prerrequisitos: ${prereqList}\n` +
      `Estado: ${status}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: statusColor.bg,
          borderLeftColor: statusColor.border
        }
      ]}
      onPress={showDetails}
    >
      <View style={styles.header}>
        <Image source={require('../assets/images/course.png')} style={styles.icon} />
        <Text style={styles.code}>{course.code}</Text>
      </View>

      <Text style={styles.name}>{course.name}</Text>

      <View style={styles.footer}>
        <Text style={styles.credits}>{course.credits} créditos</Text>
        <Text style={styles.status}>{status}</Text>
      </View>

      {isEditMode && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.approveButton,
              !canApprove && styles.disabled
            ]}
            disabled={!canApprove}
            onPress={() => approveCourse(course.code)}
          >
            <Text style={styles.actionText}>Aprobar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.pendingButton]}
            onPress={() => setCoursePending(course.code)}
          >
            <Text style={styles.actionText}>Pendiente</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  name: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    minHeight: 50,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  credits: {
    color: '#3498db',
    fontWeight: '500',
  },
  status: {
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#27ae60',
  },
  pendingButton: {
    backgroundColor: '#f39c12',
  },
  disabled: {
    opacity: 0.5,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CourseCard;
