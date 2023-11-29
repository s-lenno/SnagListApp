// SnagForm.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addSnagItem, updateSnagItem } from '../firebase'; // Update the path accordingly

const SnagForm = ({ route, navigation }) => {
  const { item } = route.params || { item: null };
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      description: item ? item.description : '',
      location: item ? item.location : '',
    },
  });

  const onSubmit = async (data) => {
    try {
      if (item) {
        await updateSnagItem(item.id, data);
      } else {
        await addSnagItem(data);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item ? 'Edit Snag Item' : 'Add Snag Item'}</Text>
      <View style={styles.form}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Description"
              onChangeText={(text) => setValue('description', text)}
              value={field.value}
            />
          )}
          name="description"
          rules={{ required: 'Description is required' }}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={(text) => setValue('location', text)}
              value={field.value}
            />
          )}
          name="location"
          rules={{ required: 'Location is required' }}
        />
        <Button title={item ? 'Update' : 'Add'} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

// ... (styles remain the same)

export default SnagForm;
