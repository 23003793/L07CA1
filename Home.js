import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DATA } from './Data';
import { MaterialIcons } from '@expo/vector-icons'; // For icons

const Item = ({ item, onEdit, onToggleComplete }) => (
  <View style={[styles.item, item.isCompleted && styles.completedItem]}>
    <Text style={styles.subject}>{item.subject}</Text>
    <Text style={styles.description}>{item.description}</Text>

    <View style={styles.priorityContainer}>
      <Text style={[styles.priority, item.priority === 'High' ? styles.highPriority : styles.lowPriority]}>
        {item.priority}
      </Text>
      <MaterialIcons
        name={item.isCompleted ? 'check-circle' : 'radio-button-unchecked'}
        size={24}
        color={item.isCompleted ? '#28a745' : '#ff6347'}
        onPress={() => onToggleComplete(item.id)}
        style={styles.checkIcon}
      />
    </View>

    <Text style={styles.dueDate}>Due: {item.dueDate}</Text>

    {/* Edit Button */}
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => onEdit(item)}
    >
      <Text style={styles.editButtonText}>Edit</Text>
    </TouchableOpacity>
  </View>
);

const Home = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState(DATA); // Initialize tasks with the provided data

  // Sort tasks by priority: High priority first, Low priority last
  const sortedTasks = tasks.sort((a, b) => {
    const priorityOrder = { High: 3, Medium: 2, Low: 1 }; // Assign numeric values for priorities
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
  
  
  // Calculate the number of completed and unfinished tasks
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const unfinishedTasks = tasks.length - completedTasks;

  // Calculate the percentage of completed tasks
  const completionPercentage = tasks.length === 0 ? 0 : (completedTasks / tasks.length) * 100;

  // Toggle task completion
  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      {/* Task Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Assigned Tasks: {unfinishedTasks}</Text>
        <Text style={styles.summaryText}>Completed (%): {completionPercentage.toFixed(2)}%</Text>
      </View>

      {/* Task List */}
      <FlatList
        data={sortedTasks} // Use the sorted task array here
        renderItem={({ item }) => (
          <Item
            item={item}
            onEdit={(task) => navigation.navigate('Edit', { task, editTask, deleteTask })} // Pass deleteTask and editTask to Edit screen
            onToggleComplete={toggleComplete} // Pass toggleComplete function to each task
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Add Task Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('Add', { addTask })}
        >
          <Text style={styles.addButtonText}>Add Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#f4f9fc', // Retained calm light blue tone
    paddingBottom: 20,
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: '#84BCDA', // Retained lighter blue for a cohesive summary section
    marginBottom: 15,
    borderRadius: 12, // Slightly increased radius for a smoother look
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#463730', // Deep green for better readability
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#E8AEB7', // Retained soft pink for task cards
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 5, // Added depth for better focus
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    borderLeftWidth: 8,
    borderLeftColor: '#FF6347', // Red accent for default priority
  },
  completedItem: {
    backgroundColor: '#94FBAB', // Retained light green for completed tasks
    borderLeftColor: '#28a745', // Green bar for completed tasks
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#463730',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#00796b', // Teal for description text
    marginBottom: 8,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priority: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00796b',
  },
  highPriority: {
    color: '#773344', // Vibrant red for high-priority tasks
  },

  lowPriority: {
    color: '#5D675B', // Bright green for low-priority tasks
  },
  checkIcon: {
    marginLeft: 10,
  },
  dueDate: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#004D40',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#00796b',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
