import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';

const Add = ({ route }) => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();
  const { addTask } = route.params;

  const handleAddTask = () => {
    if (!subject || !description || !dueDate) {
      Alert.alert('Please fill in all fields');
      return;
    }

    const newTask = {
      id: Math.random().toString(),
      subject,
      description,
      priority,
      dueDate: dueDate.toISOString().split('T')[0],
    };

    addTask(newTask);
    navigation.goBack();
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>

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
      
      <Text style={styles.label}>Priority</Text>
      <RNPickerSelect
        value={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
        items={[
          { label: 'Low', value: 'Low' },
          { label: 'Medium', value: 'Medium' },
          { label: 'High', value: 'High' },
        ]}
        style={pickerSelectStyles}
      />

      <TextInput
        style={styles.input}
        placeholder="Due Date (DD/MM/YYYY)"
        value={dueDate.toLocaleDateString()}
        onFocus={() => setShowDatePicker(true)}
        editable={false}
      />

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      height: 40,
      borderColor: '#555', // Darker border for better visibility
      borderWidth: 1.5,
      borderRadius: 5,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#F0F4F8', // Slightly tinted background
      color: '#333', // Dark text for contrast
    },
    inputIOS: {
      height: 40,
      borderColor: '#555', // Darker border
      borderWidth: 1.5,
      borderRadius: 5,
      marginBottom: 20,
      paddingHorizontal: 10,
      backgroundColor: '#F0F4F8', // Matching Android style
      color: '#333',
    },
  });
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#F7FBFC', // Soft light blue for freshness
    },
    header: {
      fontSize: 26, // Slightly larger for better emphasis
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#00695C', // Rich teal for a calming tone
    },
    input: {
      height: 45,
      borderColor: '#666', // Medium contrast border
      borderWidth: 1.5,
      borderRadius: 10, // Softer edges
      marginBottom: 15,
      paddingHorizontal: 12,
      backgroundColor: '#FFFFFF', // Pure white for input clarity
      color: '#444', // Darker text for readability
      fontSize: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      color: '#555', // Softer black for labels
    },
    button: {
      backgroundColor: '#00897B', // Brighter teal for better contrast
      paddingVertical: 14,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
      shadowColor: '#000', // Shadow for depth
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    buttonText: {
      color: '#FFFFFF', // White text for clear contrast
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default Add;
