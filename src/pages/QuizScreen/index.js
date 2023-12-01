import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
} from 'react-native';

const QuizScreen = ({ route, navigation }) => {
  const { quiz } = route.params;
  const { title, questions } = quiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectOption, setShowCorrectOption] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({});

  const question = questions[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowCorrectOption(false);
    setQuestionAnswered(false);
    setCorrectAnswers({});
  }, [route]);

  useEffect(() => {
    setSelectedOption(null);
    setShowCorrectOption(false);
    setQuestionAnswered(false);
  }, [currentIndex]);

  const handleAnswerSelection = option => {
    if (!questionAnswered) {
      setSelectedOption(option);
      setShowCorrectOption(true);
      setQuestionAnswered(true);

      const isCorrect = option === question.correctOption;
      setCorrectAnswers({
        ...correctAnswers,
        [question.id]: isCorrect,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowCorrectOption(false);
      setQuestionAnswered(false);
    }
  };

  const handleFinishQuiz = () => {
    navigation.navigate('ResultScreen', {
      quiz,
      correctAnswers,
    });
  };

  const renderQuestion = () => {
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
      <>
        <View style={styles.headerQuiz}>
          <View>
            <Text style={styles.headerText}>{title}</Text>
            <Text style={styles.headerTextGray}>
              Questão {currentIndex + 1} de {questions.length}!
            </Text>
          </View>

          <View>
            <Image
              style={styles.logoImage}
              source={require('../../../assets/images/logo.png')}
            />
          </View>
        </View>

        <View style={styles.containerPink}>
          <Text style={styles.questionText}>{question.question}</Text>

          {question.options.map(option => (
            <TouchableWithoutFeedback
              key={option}
              onPress={() => handleAnswerSelection(option)}>
              <View
                style={[
                  styles.optionButton,
                  showCorrectOption &&
                    option === question.correctOption &&
                    styles.correctOption,
                  showCorrectOption &&
                    option === selectedOption &&
                    option !== question.correctOption &&
                    styles.wrongOption,
                ]}>
                <Text
                  style={[
                    styles.optionText,
                    showCorrectOption &&
                      (option === selectedOption ||
                        option === question.correctOption) &&
                      styles.textWhite,
                  ]}>
                  {option}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}

          <View style={styles.buttonsWrapper}>
            {questionAnswered && !isLastQuestion && (
              <TouchableOpacity
                style={styles.nextQuestion}
                title="Próxima"
                onPress={handleNextQuestion}>
                <Text style={styles.nextQuestionText}>Próxima</Text>
              </TouchableOpacity>
            )}

            {questionAnswered && isLastQuestion && (
              <TouchableOpacity
                style={styles.finishQuiz}
                title="Finalizar"
                onPress={handleFinishQuiz}>
                <Text style={styles.finishQuizText}>Finalizar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </>
    );
  };

  return <View style={styles.container}>{renderQuestion()}</View>;
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
  },
  headerText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerTextGray: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'normal',
  },
  containerPink: {
    flexDirection: 'column',
    gap: 15,
    backgroundColor: '#DA0C72',
    borderWidth: 2,
    borderColor: 'black',
    margin: 0,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 20,
    position: 'relative',
  },
  logoImage: {
    width: 90,
    height: 30,
  },
  questionText: {
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
    position: 'absolute',
    bottom: '115%',
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  optionButton: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    padding: 12,
    borderRadius: 22,
    minHeight: 65,
  },
  optionText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  correctOption: {
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: '#00B855',
  },
  wrongOption: {
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: '#e33537',
  },
  nextQuestion: {
    backgroundColor: '#ffc10f',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    padding: 10,
    height: 52,
    marginLeft: 'auto',
    width: 120,
  },
  nextQuestionText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  finishQuiz: {
    backgroundColor: '#7C3CFF',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 22,
    padding: 10,
    height: 52,
    marginLeft: 'auto',
    width: 120,
  },
  finishQuizText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textWhite: {
    color: '#fff',
  },
  buttonsWrapper: {
    height: 52,
  },
});

export default QuizScreen;
