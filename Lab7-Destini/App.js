import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import storyData from './story';

export default function App() {
  const [storyIndex, setStoryIndex] = useState(0);

  const currentStory = storyData[storyIndex];

  const handleChoice = (destination) => {
    if (destination !== null) {
      setStoryIndex(destination);
    }
  };

  const restart = () => setStoryIndex(0);

  // Ẩn nút nếu không có lựa chọn
  const showButton2 = currentStory.choice2 && currentStory.choice2Dest !== null;

  return (
    <LinearGradient colors={['#000428', '#004e92']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.storyContainer}>
          <Text style={styles.storyText}>{currentStory.text}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.button1]}
            onPress={() => handleChoice(currentStory.choice1Dest)}
          >
            <Text style={styles.buttonText}>{currentStory.choice1}</Text>
          </TouchableOpacity>

          {showButton2 && (
            <TouchableOpacity
              style={[styles.button, styles.button2]}
              onPress={() => handleChoice(currentStory.choice2Dest)}
            >
              <Text style={styles.buttonText}>{currentStory.choice2}</Text>
            </TouchableOpacity>
          )}

          {/* Nút chơi lại khi chết hoặc thắng */}
          {(storyIndex === 2 || storyIndex === 3 || storyIndex === 4) && (
            <TouchableOpacity style={[styles.button, styles.restartButton]} onPress={restart}>
              <Text style={styles.buttonText}>Chơi Lại Từ Đầu</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: 20 },
  storyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  storyText: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 38,
    fontWeight: '600',
  },
  buttonsContainer: {
    marginBottom: 40,
    gap: 15,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginHorizontal: 20,
  },
  button1: {
    backgroundColor: '#e74c3c',
  },
  button2: {
    backgroundColor: '#3498db',
  },
  restartButton: {
    backgroundColor: '#2ecc71',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});