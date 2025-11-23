import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  // Hàm gọi API thời tiết từ Open-Meteo (dữ liệu thật, không key)
  const getWeather = async (lat = null, lon = null, cityName = null) => {
    setLoading(true);
    try {
      let url;
      if (cityName) {
        // Bước 1: Geocode tên thành phố để lấy lat/lon (API miễn phí của Open-Meteo)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=vi&format=json`
        );
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
          Alert.alert('Không tìm thấy', `Không tìm thấy thành phố "${cityName}"!`);
          setLoading(false);
          return;
        }
        const { latitude, longitude } = geoData.results[0];
        lat = latitude;
        lon = longitude;
      } else if (!lat || !lon) {
        // Lấy vị trí hiện tại
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Cần quyền vị trí', 'Vui lòng cấp quyền để lấy thời tiết tự động!');
          setLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        lat = location.coords.latitude;
        lon = location.coords.longitude;
      }

      // Bước 2: Gọi API thời tiết thật từ Open-Meteo
      url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation&timezone=Asia%2FBangkok&forecast_days=1&language=vi`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.current_weather) {
        setWeather({
          temp: Math.round(data.current_weather.temperature),
          feelsLike: Math.round(data.hourly.temperature_2m[0]), // Giả lập feels_like
          humidity: data.hourly.relative_humidity_2m[0],
          description: getWeatherDescription(data.current_weather.weathercode), // Mô tả từ code
          cityName: cityName || 'Vị trí hiện tại',
          icon: getWeatherIcon(data.current_weather.weathercode),
          lat,
          lon,
        });
        if (cityName) setCity(cityName);
      } else {
        Alert.alert('Lỗi dữ liệu', 'Không lấy được dữ liệu thời tiết!');
      }
    } catch (error) {
      Alert.alert('Lỗi mạng', 'Kiểm tra kết nối internet và thử lại!');
      console.log(error);
    }
    setLoading(false);
  };

  // Mô tả thời tiết từ weather code (dữ liệu thật từ Open-Meteo docs)
  const getWeatherDescription = (code) => {
    const descriptions = {
      0: 'Trời quang',
      1: 'Ít mây',
      2: 'Mây rải rác',
      3: 'Nhiều mây',
      45: 'Sương mù',
      48: 'Sương mù dày',
      51: 'Mưa phùn nhẹ',
      53: 'Mưa phùn',
      55: 'Mưa phùn nặng',
      61: 'Mưa nhẹ',
      63: 'Mưa vừa',
      65: 'Mưa lớn',
      71: 'Tuyết nhẹ',
      73: 'Tuyết vừa',
      75: 'Tuyết lớn',
      80: 'Mưa rào nhẹ',
      81: 'Mưa rào',
      82: 'Mưa rào nặng',
      95: 'Bão nhẹ',
      96: 'Bão kèm mưa đá nhẹ',
      99: 'Bão kèm mưa đá nặng',
    };
    return descriptions[code] || 'Thời tiết không xác định';
  };

  // Icon emoji từ weather code
  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️';
    if (code <= 3) return '🌤️';
    if (code <= 50) return '🌫️';
    if (code <= 70) return '☁️';
    if (code <= 80) return '🌧️';
    if (code <= 99) return '⛈️';
    return '🌤️';
  };

  useEffect(() => {
    getWeather(); // Lấy thời tiết vị trí hiện tại khi mở app
  }, []);

  const getBackground = () => {
    if (!weather) return ['#74b9ff', '#0984e3'];
    const temp = weather.temp;
    if (temp > 30) return ['#ff6b6b', '#ee5a52']; // Nóng
    if (temp < 15) return ['#74b9ff', '#0984e3']; // Lạnh
    if (weather.description.includes('mưa') || weather.description.includes('Mưa')) return ['#636e72', '#2d3436']; // Mưa
    return ['#00b894', '#00cec9']; // Bình thường
  };

  if (loading) {
    return (
      <LinearGradient colors={['#74b9ff', '#0984e3']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Đang lấy dữ liệu thời tiết thật...</Text>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={getBackground()} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Clima</Text>

        {/* Ô tìm kiếm thành phố */}
        <View style={styles.searchBox}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên thành phố (VD: Hanoi, Tokyo...)"
            placeholderTextColor="#ccc"
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => getWeather(null, null, city)}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={() => getWeather(null, null, city)}>
            <Text style={styles.searchText}>Tìm</Text>
          </TouchableOpacity>
        </View>

        {/* Hiển thị thời tiết */}
        {weather && (
          <View style={styles.weatherBox}>
            <Text style={styles.icon}>{weather.icon}</Text>
            <Text style={styles.temp}>{weather.temp}°C</Text>
            <Text style={styles.cityName}>{weather.cityName}</Text>
            <Text style={styles.description}>{weather.description}</Text>
            <Text style={styles.details}>
              Cảm giác như {weather.feelsLike}°C • Độ ẩm {weather.humidity}%
            </Text>
          </View>
        )}

        {/* Nút lấy vị trí hiện tại */}
        <TouchableOpacity style={styles.locationBtn} onPress={() => getWeather()}>
          <Text style={styles.locationText}>Cập nhật vị trí hiện tại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 50, fontWeight: '900', color: '#fff', textAlign: 'center', marginTop: 50 },
  searchBox: { flexDirection: 'row', marginTop: 20, width: '100%' },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    marginRight: 10,
  },
  searchBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'center',
    borderRadius: 30,
  },
  searchText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  weatherBox: { alignItems: 'center', marginTop: 40 },
  icon: { fontSize: 120 },
  temp: { fontSize: 90, color: '#fff', fontWeight: '300' },
  cityName: { fontSize: 36, color: '#fff', fontWeight: 'bold', marginTop: 10 },
  description: { fontSize: 24, color: '#fff', marginTop: 10 },
  details: { fontSize: 18, color: '#fff', marginTop: 20, opacity: 0.9, textAlign: 'center' },
  loadingText: { color: '#fff', marginTop: 20, fontSize: 18, textAlign: 'center' },
  locationBtn: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 15,
    borderRadius: 30,
    marginTop: 30,
  },
  locationText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});