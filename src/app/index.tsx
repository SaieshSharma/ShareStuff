import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-100 p-4">
      <View className="bg-white rounded-lg p-6 shadow-lg">
        <Text className="text-2xl text-center font-bold text-red-600 mb-4">
          Welcome to NativeWind!
        </Text>
        <Text className="text-base text-gray-700 text-center">
          If you can see colors and styling, NativeWind is working!
        </Text>
      </View>
    </View>
  );
}