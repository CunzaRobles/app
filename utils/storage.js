// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRICULUM_KEY = '@curriculum_data';

export const saveCurriculumData = async (data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(CURRICULUM_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Error saving curriculum data', e);
    return false;
  }
};

export const loadCurriculumData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(CURRICULUM_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error loading curriculum data', e);
    return null;
  }
};

export const exportCurriculum = async () => {
  const data = await loadCurriculumData();
  if (data) {
    // Implementar lógica para exportar a archivo
    return true;
  }
  return false;
};

export const importCurriculum = async (file) => {
  // Implementar lógica para importar desde archivo
  return true;
};
