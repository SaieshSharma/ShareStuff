//use expo-vector icons - website


import { Tabs } from "expo-router";
import { View, Image, Text } from "react-native";
import cn from "clsx";
import { TabBarIconProps } from "@/type";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const TabBarIcon = ({focused, icon, title}: TabBarIconProps) => (
    <View className='tab-icon'>
        <Image source={icon} className="size-7" resizeMode="contain" tintColor={focused ? '#FE8C00' : '#5D5F6D'}/>
        <Text className={cn("text-sm font-bold", focused ? "text-primary" : "text-gray-300")} >
            {title}
        </Text>
    </View>
)


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
 
        marginHorizontal: 20,
        height: 80,
        position: 'absolute',
        bottom: 40,
        backgroundColor: 'white',
        shadowColor: '#1a1a1a',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius : 4,
        elevation: 5
    }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'Reddit',
          title: 'Home',
          tabBarActiveTintColor: "blue",
          headerTintColor: "#FF5700",
          tabBarIcon: ({ focused }) =>  <TabBarIcon focused={focused} title="Home" icon={<AntDesign/>}/>
        //   <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <AntDesign name="plus" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color }) => <Feather name="bell" size={24} color={color} />
        }}
      />
    </Tabs>
  )
}