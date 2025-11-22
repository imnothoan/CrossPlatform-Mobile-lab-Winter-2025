import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { quizData } from './questions';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      Alert.alert(
        'Quiz Hoàn Thành!',
        `Điểm của bạn: ${score + (isCorrect ? 1 : 0)} / ${quizData.length}`,
        [
          {
            text: 'Chơi Lại',
            onPress: () => {
              setCurrentQuestionIndex(0);
              setScore(0);
            },
          },
        ]
      );
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.questionNumber}>
          Câu {currentQuestionIndex + 1} / {quizData.length}
        </Text>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.trueButton]}
            onPress={() => handleAnswer(true)}
          >
            <Text style={styles.buttonText}>ĐÚNG</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.falseButton]}
            onPress={() => handleAnswer(false)}
          >
            <Text style={styles.buttonText}>SAI</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.score}>Điểm: {score}</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  questionNumber: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  question: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 35,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 50,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 5,
  },
  trueButton: {
    backgroundColor: '#2ecc71',
  },
  falseButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  score: {
    fontSize: 24,
    color: '#f1c40f',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});