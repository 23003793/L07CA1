import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const Edit = ({ route }) => {
  const { task, editTask, deleteTask } = route.params;

  const [subject, setSubject] = useState(task.subject);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const navigation = useNavigation();

  const handleEditTask = () => {
    const updatedTask = { ...task, subject, description, priority, dueDate };
    editTask(updatedTask);
    navigation.goBack();
  };

  const handleDeleteTask = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete Cancelled'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Priority Picker */}
      <Text style={styles.label}>Priority</Text>
      <Picker
        selectedValue={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.button} onPress={handleEditTask}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteTask}>
        <Text style={styles.buttonText}>Delete Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
      backgroundColor: '#F3F7FA', // Softer light blue for a modern and fresh look
    },
    header: {
      fontSize: 28, // Slightly larger for emphasis
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: '#005B4F', // Darker teal for better contrast
    },
    input: {
      height: 50, // Increased height for better usability
      borderColor: '#999', // Medium gray for contrast
      borderWidth: 1.5,
      borderRadius: 10, // Softer edges
      marginBottom: 12,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: '#FFFFFF', // Bright white for clarity
      color: '#333', // Darker text for better readability
    },
    label: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      color: '#444', // Neutral gray for labels
    },
    picker: {
      height: 50, // Matching input height
      borderColor: '#999', 
      borderWidth: 1.5,
      borderRadius: 10,
      marginBottom: 20,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
    },
    button: {
      backgroundColor: '#00796b', // Retained teal for primary action
      paddingVertical: 14, // Slightly increased padding for a more prominent button
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      shadowColor: '#000', // Added shadow for depth
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    buttonText: {
      color: '#FFFFFF', 
      fontSize: 16,
      fontWeight: 'bold',
    },
    deleteButton: {
      backgroundColor: '#D32F2F', // Vibrant red for delete action to grab attention
      paddingVertical: 14,
      borderRadius: 10,
      marginTop: 10,
      alignItems: 'center',
    },
  });
  
export default Edit;
