// src/screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Share
} from 'react-native';
import { useCurriculum } from '../context/CurriculumContext';
import SemesterSection from '../components/SemesterSection';
import AddCourseModal from '../components/AddCourseModal';
import ControlButton from '../components/ControlButton';
import ProgressStats from '../components/ProgressStats';

const HomeScreen = () => {
  const {
    curriculumData,
    isEditMode,
    setIsEditMode,
    stats,
    resetProgress
  } = useCurriculum();
  const [modalVisible, setModalVisible] = useState(false);

  const handleShare = async () => {
    try {
      const message = `Mi progreso: ${stats.completed}/${stats.totalCourses} cursos completados (${stats.progress}%).`;
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Error al compartir', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Mapa Curricular</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          <Text style={styles.editButtonText}>
            {isEditMode ? 'Salir' : 'Editar'}
          </Text>
        </TouchableOpacity>
      </View>

      <ProgressStats stats={stats} />

      <ScrollView style={styles.content}>
        {curriculumData.map(semester => (
          <SemesterSection key={semester.semester} semester={semester} />
        ))}
        <View style={styles.footerSpace} />
      </ScrollView>

      <View style={styles.controls}>
        <ControlButton
          title="Añadir Curso"
          onPress={() => setModalVisible(true)}
          icon={require('../assets/icons/add.png')}
          style={styles.controlButton}
        />
        <ControlButton
          title="Reiniciar"
          onPress={resetProgress}
          icon={require('../assets/icons/edit.png')}
          style={styles.controlButton}
        />
        <ControlButton
          title="Compartir"
          onPress={handleShare}
          icon={require('../assets/icons/share.png')}
          style={styles.controlButton}
        />
      </View>

      <AddCourseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#2c3e50',
    paddingTop: 40,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  editButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  footerSpace: {
    height: 30,
  },
});

export default HomeScreen;
