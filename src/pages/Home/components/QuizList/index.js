import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const QuizList = ({ navigation }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const querySnapshot = await firestore().collection('quizzes').get();
        const data = querySnapshot.docs.map(doc => doc.data());

        setQuizzes(data);
      } catch (error) {
        console.error('Erro ao buscar quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <View style={styles.container}>
      {quizzes.map((quiz, index) => (
        <TouchableOpacity
          key={index}
          style={styles.quizItem}
          onPress={() => navigation.navigate('QuizScreen', { quiz: quiz })}>
          <Text style={styles.text}>{quiz.title}</Text>
          <Text style={styles.playText}>Jogar!</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 20,
  },
  quizItem: {
    backgroundColor: '#7c3cff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    padding: 20,
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  playText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuizList;
