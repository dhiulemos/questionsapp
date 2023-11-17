import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputText = ({ text, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="gray"
        placeholder={placeholder}
        style={styles.input}
        value={text}
        onChangeText={onChangeText}
        autoCompleteType="off"
        importantForAutofill="no"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    height: 60,
    padding: 20,
    color: 'black',
  },
});

export default InputText;
