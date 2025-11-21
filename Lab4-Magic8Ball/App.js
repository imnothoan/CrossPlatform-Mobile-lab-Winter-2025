import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Map tất cả 5 hình vào object
const ballImages = {
  1: require('./assets/ball/ball1.png'),
  2: require('./assets/ball/ball2.png'),
  3: require('./assets/ball/ball3.png'),
  4: require('./assets/ball/ball4.png'),
  5: require('./assets/ball/ball5.png'),
};

export default function App() {
  const [ballNumber, setBallNumber] = useState(1);

  const ask = () => {
    const random = Math.floor(Math.random() * 5) + 1;
    setBallNumber(random);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Magic 8 Ball</Text>

      <TouchableOpacity onPress={ask} activeOpacity={0.7}>
        <Image source={ballImages[ballNumber]} style={styles.ball} />
      </TouchableOpacity>

      <Text style={styles.instruction}>Tap the ball</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#e94560',
    marginTop: 80,
  },
  ball: {
    width: 320,
    height: 320,
    marginTop: 60,
  },
  instruction: {
    marginTop: 60,
    fontSize: 22,
    color: '#aaa',
    fontStyle: 'italic',
  },
});