import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { correctAnswers, quiz } = route.params;

  const totalQuestions = Object.keys(correctAnswers).length;
  const correctCount = Object.values(correctAnswers).filter(Boolean).length;
  const accuracy = (correctCount / totalQuestions) * 100;

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handlePlayAgain = () => {
    navigation.navigate('QuizScreen', { quiz });
  };

  return (
    <View>
      <View style={styles.headerQuiz}>
        <View>
          <Text style={styles.headerText}>Resumo!</Text>
        </View>

        <View>
          <Image
            style={styles.logoImage}
            source={require('../../../assets/images/logo.png')}
          />
        </View>
      </View>

      <View style={styles.results}>
        <Text style={styles.resultsText}>
          Você acertou {correctCount} de {totalQuestions}.
        </Text>
        <Text style={styles.resultsText}>
          Taxa de acertos: {accuracy.toFixed(2)}%
        </Text>
        <Text style={styles.resultsText}>
          {accuracy < 50
            ? 'Tente novamente para melhorar seu resultado.'
            : 'Você é demais, continue assim!'}
        </Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.button}
          title="Próxima"
          onPress={handleGoHome}>
          <Text style={styles.buttonText}>Voltar para a tela inicial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          title="Jogar Novamente"
          onPress={handlePlayAgain}>
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerQuiz: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 61,
  },
  headerText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  logoImage: {
    width: 90,
    height: 30,
  },
  results: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 40,
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  resultsText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#7C3CFF',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    padding: 10,
    height: 82,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsWrapper: {
    marginTop: 40,
    marginHorizontal: 20,
  },
});

export default ResultScreen;
