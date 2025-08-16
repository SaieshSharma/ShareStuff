import { View, Text, TextInput, FlatList, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import groups from "../../../assets/data/groups.json"
import { useSetAtom } from "jotai";
import { selectedgroupAtom } from "@/src/atoms";
import { Group } from "@/src/types";
import { setDate } from "date-fns";

export default function GroupSelector() {

    const [searchValue , setSearchValue] = useState<string>("");
    const setGroup = useSetAtom(selectedgroupAtom);

    const onGroupSelected = (group : Group) => {
        setGroup(group)
        router.back()
    }

    const filteredGroups = groups.filter((group) => group.name.toLowerCase().includes(searchValue.toLowerCase()))

  return (
    <SafeAreaView style={{marginHorizontal: 10}}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20}}>
        <AntDesign
          name="close"
          size={30}
          color="black"
          onPress={() => router.back()}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            flex: 1,
            paddingRight: 30,
          }}
        >
          Post To
        </Text>
      </View>

      {/* Search Bar */}
      <View style={{flexDirection: 'row', alignContent:'flex-start' , alignItems: 'center', backgroundColor: "lightgrey", borderRadius: 5, gap: 5, marginTop: 10, }}>
        <AntDesign name="search1" size={16} color="gray"  style={{paddingLeft: 5}}/>
        <TextInput 
         placeholder="Search For a Community"
         placeholderTextColor={"grey"}
         value={searchValue}
         style={{flex: 1, }}
        onChangeText={setSearchValue}
        />
        {searchValue && (
            <AntDesign name="closecircle" size={15} color="#E4E4E4" onPress={() => setSearchValue("")} style={{padding: 2}}/>
        )}
      </View>

      <FlatList 
      data={filteredGroups}
      renderItem={({item}) => (
        <Pressable style={{flexDirection: 'row' , gap: 5, padding: 10, alignItems: 'center'}} onPress={() => onGroupSelected(item)}>
            <Image source ={{uri: item.image}} style={{width: 40, aspectRatio: 1, borderRadius: 20}}/>
            <Text style={{fontWeight: 700, }}>{item.name}</Text>
        </Pressable>
      )}
      
      />
    </SafeAreaView>
  );
}
