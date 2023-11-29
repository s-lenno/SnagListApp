// DashboardScreen.js
import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { List } from 'react-native-paper';
import { deleteSnagItem } from '../firebase'; // Update the path accordingly

const DashboardScreen = ({ navigation }) => {
  // ... (rest of the code remains the same)

  const handleDelete = async (id) => {
    try {
      await deleteSnagItem(id);
      // Refresh the snag list after deletion
      // For simplicity, you can reload the screen, or you can implement a more sophisticated refresh mechanism
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting snag item:', error);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.description}
      description={item.location}
      onPress={() => navigation.navigate('SnagForm', { item })}
      left={(props) => <List.Icon {...props} icon={item.completed ? 'check' : 'alert'} />}
      right={(props) => <List.Icon {...props} icon="delete" onPress={() => handleDelete(item.id)} />}
    />
  );

  // ... (rest of the code remains the same)
};
