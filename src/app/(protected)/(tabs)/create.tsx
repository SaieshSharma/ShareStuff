import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { selectedgroupAtom } from "@/src/atoms";


const CreateScreen = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [group, setGroup] = useAtom(selectedgroupAtom)

  const goBack = () => {
    setTitle("")
    setBody("")
    setGroup(null)
    router.back()
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <AntDesign
          name="close"
          size={30}
          color="black"
          onPress={() => router.back()}
        />

        <Pressable
          style={{ marginLeft: "auto", paddingHorizontal: 10 }}
          onPress={() => console.error("Pressed")}
        >
          <Text style={styles.postButton}>Post</Text>
        </Pressable>
      </View>


      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{flex: 1}}
      >
        <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 14}}>
        {/* Community Selector */}
        <Link href={"/groupSelector"} asChild>
        <Pressable style={styles.communityContainer}>
          {group ? (
            <>
            <Image source={{uri : group.image}} style={{width: 20, height: 20, borderRadius: 10}} />
            <Text style={{fontWeight: 'bold'}}>{group.name}</Text>
            </>
          ) : (
            <>
          <Text style={styles.rStyle}>r/</Text>
          <Text style={{ fontWeight: "700" }}>Select a Community</Text>
            </>
          )}
        </Pressable>
        </Link>

        {/* Inputs */}
        <TextInput
          placeholder="Title"
          style={{ fontSize: 20, fontWeight: "bold", paddingVertical: 20 }}
          value={title}
          onChangeText={setTitle}
          multiline
          scrollEnabled={false}
        />

        <TextInput
          placeholder="Body"
          value={body}
          onChangeText={setBody}
          multiline
          scrollEnabled={false}
        />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  postButton: {
    color: "white",
    textShadowColor: "black",
    backgroundColor: "#00008b",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontWeight: "bold",
  },
  rStyle: {
    backgroundColor: "black",
    color: "white",
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 10,
    fontWeight: "bold",
  },
  communityContainer: {
    backgroundColor: "#EDEDED",
    flexDirection: "row",
    padding: 10,
    borderRadius: 20,
    gap: 5,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
});
