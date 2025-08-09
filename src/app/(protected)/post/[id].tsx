import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "@/src/components/PostListItem";

export default function DetailedPost() {
  const { id } = useLocalSearchParams();

  const detailedPost = posts.find((post) => post.id === id);

  if (!detailedPost) {
    return <Text>404 Page Not Found</Text>;
  }

  return (
    <View>
      <PostListItem post={detailedPost} isDetailedPost/>
    </View>
  );
}
