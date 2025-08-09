//use expo-vector icons - website


import { AntDesign, Feather, Ionicons} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";


export default function TabLayout() {

  const {signOut} = useAuth();
  return (
    <Tabs
      screenOptions={{
        // headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#FE8C00',
        tabBarInactiveTintColor: '#5D5F6D',
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginHorizontal: 10,
          height: 85,
          position: 'absolute',
          bottom: 25,
          backgroundColor: 'white',
          shadowColor: '#1a1a1a',
          shadowOffset: {
            width: 0, height: 2
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          paddingTop: 10,
          paddingBottom: 10,
        },
        headerRight: () =>
          <Feather
            name="log-out"
            size={22}
            color="black"
            style={{ paddingRight: 10 }} onPress={() => signOut()}
          />
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'ShareStuff',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#00bfff'},
          headerTitleStyle: {color: "white", fontWeight: 'bold', },
          title: 'Home',
          tabBarIcon: ({ focused, color }) => <AntDesign name="home" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ focused, color }) => <Feather name="users" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ focused, color }) => <AntDesign name="plus" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused, color }) => <Ionicons name="chatbubble-ellipses-outline" size={20} color={color} />
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ focused, color }) => <Feather name="bell" size={20} color={color} />
        }}
      />
    </Tabs>
  )
}