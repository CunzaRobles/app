// src/components/ProgressStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressStats = ({ stats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{stats.totalCourses}</Text>
        <Text style={styles.statLabel}>Cursos Totales</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{stats.completed}</Text>
        <Text style={styles.statLabel}>Completados</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statNumber}>{stats.progress}%</Text>
        <Text style={styles.statLabel}>Progreso</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default ProgressStats;
