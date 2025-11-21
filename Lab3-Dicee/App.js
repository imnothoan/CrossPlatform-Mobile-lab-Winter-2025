import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const diceImages = {
  1: require('./assets/dice/dice1.png'),
  2: require('./assets/dice/dice2.png'),
  3: require('./assets/dice/dice3.png'),
  4: require('./assets/dice/dice4.png'),
  5: require('./assets/dice/dice5.png'),
  6: require('./assets/dice/dice6.png'),
};

export default function App() {
  const [leftDice, setLeftDice] = useState(1);
  const [rightDice, setRightDice] = useState(6);

  const roll = () => {
    setLeftDice(Math.floor(Math.random() * 6) + 1);
    setRightDice(Math.floor(Math.random() * 6) + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dicee</Text>

      <View style={styles.diceRow}>
        <Image source={diceImages[leftDice]} style={styles.dice} />
        <Image source={diceImages[rightDice]} style={styles.dice} />
      </View>

      <TouchableOpacity style={styles.button} onPress={roll}>
        <Text style={styles.buttonText}>Roll</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#221133',
    alignItems: 'center',
  },
  title: {
    marginTop: 70,
    fontSize: 58,
    color: '#ff3366',
    fontWeight: '900',
  },
  diceRow: {
    flexDirection: 'row',
    marginTop: 80,
  },
  dice: {
    width: 140,
    height: 140,
    marginHorizontal: 25,
  },
  button: {
    marginTop: 120,
    backgroundColor: '#ff3366',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
});