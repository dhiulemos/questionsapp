import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';

const ButtonAction = ({ text, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableHighlight underlayColor="#7c3cff" onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    backgroundColor: 'black',
    height: 60,
    padding: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ButtonAction;
