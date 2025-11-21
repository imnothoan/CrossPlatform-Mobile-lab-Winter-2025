import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';

const sounds = {
  1: require('./assets/sounds/note1.wav'),
  2: require('./assets/sounds/note2.wav'),
  3: require('./assets/sounds/note3.wav'),
  4: require('./assets/sounds/note4.wav'),
  5: require('./assets/sounds/note5.wav'),
  6: require('./assets/sounds/note6.wav'),
  7: require('./assets/sounds/note7.wav'),
};

export default function App() {
  const playSound = async (noteNumber) => {
    try {
      const { sound } = await Audio.Sound.createAsync(sounds[noteNumber]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const Key = ({ color, note }) => (
    <TouchableOpacity
      style={[styles.key, { backgroundColor: color }]}
      onPress={() => playSound(note)}
      activeOpacity={0.7}
    >
   
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      

      <View style={styles.keysContainer}>
        <Key color="#e63946" note={1} />
        <Key color="#f77f00" note={2} />
        <Key color="#fcbf49" note={3} />
        <Key color="#83c5be" note={4} />
        <Key color="#457b9d" note={5} />
        <Key color="#7209b7" note={6} />
        <Key color="#9d4edd" note={7} />
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: '#ff006e',
    textAlign: 'center',
    marginTop: 60,
    letterSpacing: 8,
    textShadowColor: '#ff006e',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  keysContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  key: {
    height: 80,
    marginBottom: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  keyText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
});