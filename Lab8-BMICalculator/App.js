import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState('25');

  const calculate = () => {
    const w = parseFloat(weight);
    const h = height / 100;

    if (!w || w <= 0 || height <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập cân nặng hợp lệ');
      return;
    }

    const bmi = (w / (h * h)).toFixed(1);
    let result = '';
    if (bmi < 18.5) result = 'Gầy';
    else if (bmi < 25) result = 'Bình thường';
    else if (bmi < 30) result = 'Thừa cân';
    else result = 'Béo phì';

    Alert.alert(
      'Kết quả BMI',
      `Chỉ số BMI: ${bmi}\nTình trạng: ${result}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      {/* Cân nặng */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cân nặng (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholder="70"
          placeholderTextColor="#999"
        />
      </View>

      {/* Chiều cao */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Chiều cao: {height} cm</Text>
        <Slider
          style={{ width: '100%', height: 50 }}
          minimumValue={100}
          maximumValue={220}
          step={1}
          value={height}
          onValueChange={setHeight}
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#000"
        />
      </View>



      {/* Nút tính */}
      <TouchableOpacity style={styles.calculateButton} onPress={calculate}>
        <Text style={styles.calculateText}>TÍNH BMI</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    padding: 15,
    fontSize: 20,
    backgroundColor: '#f9f9f9',
  },
  calculateButton: {
    backgroundColor: '#000',
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 40,
  },
  calculateText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});