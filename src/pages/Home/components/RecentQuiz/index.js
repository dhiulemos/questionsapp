import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RecentQuiz = ({ user }) => {
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    const fetchRecentUserQuizzes = async () => {
      try {
        if (user) {
          const quizzesRef = firestore()
            .collection('users')
            .doc(user.uid)
            .collection('recentQuizzes');

          const querySnapshot = await quizzesRef.get();

          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setRecentQuizzes(data);
        }
      } catch (error) {
        console.error(
          'Erro ao buscar quizzes recentes do usuário:',
          error.message,
        );
      }
    };

    fetchRecentUserQuizzes();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Mais Recentes</Text>

      {!!recentQuizzes?.length ? (
        recentQuizzes.map((recentQuiz, index) => (
          <View key={index} style={styles.recentItem}>
            <Text style={styles.text}>{recentQuiz.title}</Text>
            <Text style={styles.textSmall}>
              {recentQuiz.accuracy}% de acertos
            </Text>
          </View>
        ))
      ) : (
        <>
          <Text style={styles.textWhite}>
            Você não jogou nenhum quiz recentemente.
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 15,
    backgroundColor: '#ffc10f',
    borderWidth: 2,
    borderColor: 'black',
    margin: 0,
    borderTopRightRadius: 40,
    padding: 20,
  },
  recentItem: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    padding: 15,
    width: '100%',
  },
  textTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 0,
    paddingBottom: 10,
  },
  textSmall: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'normal',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textWhite: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RecentQuiz;
