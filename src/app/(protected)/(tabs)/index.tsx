import { formatDistanceToNowStrict } from "date-fns";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import posts from "../../../../assets/data/posts.json";
import { StyleSheet } from "react-native";
import PostListItem from "@/src/components/PostListItem";

export default function HomeScreen() {
 return (
<FlatList 
data = {posts}
renderItem = {({item}) => <PostListItem post = {item} />}
/>

 );

}

const styles = StyleSheet.create({
  joinButtonText: {
    backgroundColor: "#0d469b",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
    fontWeight: "bold",
  },
  groupImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  postImage: { width: "100%", aspectRatio: 4 / 3, borderRadius: 15 },
  title: { fontWeight: "bold", fontSize: 17, letterSpacing: 0.5 },
  iconBox: {
    borderWidth: 0.5,
    borderColor: "#D4D4D4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});
