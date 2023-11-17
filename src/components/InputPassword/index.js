import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const InputPassword = ({ password, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        style={styles.input}
        value={password}
        onChangeText={onChangeText}
        secureTextEntry={true}
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

export default InputPassword;
