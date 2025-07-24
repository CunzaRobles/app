// src/components/AddCourseModal.js
import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCurriculum } from '../context/CurriculumContext';
import { getAvailableSemesters } from '../utils/curriculum';
import ControlButton from './ControlButton';

const AddCourseModal = ({ visible, onClose }) => {
  const { addNewCourse, curriculumData } = useCurriculum();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('5');
  const [semester, setSemester] = useState('1');
  const [creditRequirement, setCreditRequirement] = useState('0');
  const [prerequisites, setPrerequisites] = useState('');

  const availableSemesters = getAvailableSemesters(curriculumData);

  const handleSave = () => {
    if (!code || !name || !credits) {
      Alert.alert('Error', 'Por favor complete los campos obligatorios');
      return;
    }

    const newCourse = {
      code,
      name,
      credits: parseInt(credits, 10),
      prerequisites: prerequisites
        ? prerequisites.split(',').map(p => p.trim())
        : [],
      creditRequirement: parseInt(creditRequirement, 10) || 0,
      approved: false
    };

    addNewCourse(newCourse, parseInt(semester, 10));
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCode('');
    setName('');
    setCredits('5');
    setSemester('1');
    setCreditRequirement('0');
    setPrerequisites('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Añadir Nuevo Curso</Text>

          <Text style={styles.inputLabel}>Código del curso *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: MAT101"
            value={code}
            onChangeText={setCode}
          />

          <Text style={styles.inputLabel}>Nombre del curso *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Cálculo Diferencial"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.inputLabel}>Créditos *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 5"
            keyboardType="numeric"
            value={credits}
            onChangeText={setCredits}
          />

          <Text style={styles.inputLabel}>Semestre</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={semester}
              style={styles.picker}
              onValueChange={itemValue => setSemester(itemValue)}
            >
              {availableSemesters.map(sem => (
                <Picker.Item
                  key={sem}
                  label={`Semestre ${sem}`}
                  value={`${sem}`}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.inputLabel}>Créditos requeridos</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 20"
            keyboardType="numeric"
            value={creditRequirement}
            onChangeText={setCreditRequirement}
          />

          <Text style={styles.inputLabel}>Prerrequisitos (separados por comas)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: MAT101,FIS101"
            value={prerequisites}
            onChangeText={setPrerequisites}
          />

          <View style={styles.buttonContainer}>
            <ControlButton
              title="Cancelar"
              onPress={() => {
                resetForm();
                onClose();
              }}
              color="#95a5a6"
              style={styles.button}
            />
            <ControlButton
              title="Guardar"
              onPress={handleSave}
              color="#27ae60"
              style={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  inputLabel: {
    marginBottom: 5,
    fontWeight: '500',
    color: '#2c3e50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AddCourseModal;
