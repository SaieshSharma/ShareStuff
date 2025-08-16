import { View, Text, FlatList, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useRef , useCallback} from "react";
import posts from "../../../../assets/data/posts.json";
import PostListItem from "@/src/components/PostListItem";
import comments from "@/assets/data/comments.json";
import { Comment } from "@/src/types";
import CommentListItem from "@/src/components/CommentListItem";
//safeareaview but if you need more control this hook
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailedPost() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState<string>("")
  const [isFocused, setIsFocused] = useState<boolean>(false);

  //reference variable
  const inputRef = useRef<TextInput | null>(null)


  const insets = useSafeAreaInsets()

  const handleReplyButtonPressed = useCallback((commentId: string) => {
    console.log(commentId);
    inputRef.current?.focus();
  }, [])

  const detailedPost = posts.find((post) => post.id === id);
  const postComments = comments.filter(
    (comment) => comment.post_id === detailedPost?.id
  );

  if (!detailedPost) {
    return <Text>404 Page Not Found</Text>;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : undefined} style={{flex: 1}}
    //imp
    keyboardVerticalOffset={insets.top + 10}
    >
      <FlatList
        data={postComments}
        renderItem={({ item }) => <CommentListItem comment={item}  depth={0}  handleReplyButtonPressed={handleReplyButtonPressed}/>}
        //This helps the top part of etailed post to also be scrollable.
        ListHeaderComponent={
          <PostListItem post={detailedPost} isDetailedPost />
        }
      />

      {/* Input will be fixed to the bottom */}
      <View
        style={{
          //imp
          paddingBottom: insets.bottom,
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.5,
          shadowRadius: 12.35,

          elevation: 19,
        }}
      >
        <TextInput
          ref={inputRef}
          placeholder="Join The Conversation"
          style={{ backgroundColor: "#E4E4E4", padding: 5, borderRadius: 5 }}
          value={comment}
          onChangeText={setComment}
          multiline
          //logic on when to show reply button
          onFocus={() => setIsFocused(true)}
          onBlur={() =>setIsFocused(false)}
        />
      </View>

      {/* Reply Button */}
       {isFocused && (      <Pressable style={{backgroundColor: "blue", padding: 5, marginLeft: "auto", borderRadius: 12,margin: 5}}>
        <Text style={{color: "white", paddingVertical: 5, paddingHorizontal: 10, fontWeight: 'bold', fontSize: 14 }}>Reply</Text>
      </Pressable>)}

    </KeyboardAvoidingView>
  );
}