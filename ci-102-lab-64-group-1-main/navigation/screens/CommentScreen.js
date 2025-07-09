import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CommentScreen = () => {
  const [comments, setComments] = useState([
    { id: 1, text: 'First comment', replies: [] },
    { id: 2, text: 'Second comment', replies: [
      { id: 3, text: 'Reply to second comment' },
      { id: 4, text: 'Another reply to second comment' }
    ] }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [parentCommentId, setParentCommentId] = useState(null);

  const addComment = () => {
    if (replyTo) {
      const newReply = { id: comments.length + 1, text: newComment };
      const updatedComments = comments.map(comment => {
        if (comment.id === replyTo) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyTo(null);
      setParentCommentId(null);
    } else {
      const newCommentObj = { id: comments.length + 1, text: newComment, replies: [] };
      setComments([...comments, newCommentObj]);
    }
    setNewComment('');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.commentContainer}>
        <Text style={styles.commentText}>{item.text}</Text>
        <Button
          title="Reply"
          color = '#90d7f8'
          onPress={() => {
            setReplyTo(item.id);
            setParentCommentId(item.id);
          }}
        />
        {item.replies.length > 0 && (
          <FlatList
            data={item.replies}
            renderItem={({ item }) => (
              <View style={styles.replyContainer}>
                <Text style={styles.replyText}>{item.text}</Text>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
        {parentCommentId === item.id && (
          <TextInput
            placeholder="Add a reply"
            value={newComment}
            onChangeText={text => setNewComment(text)}
            onSubmitEditing={addComment}
            style={styles.input}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TextInput
        placeholder="Add a comment"
        value={newComment}
        onChangeText={text => setNewComment(text)}
        onSubmitEditing={addComment}
        style={styles.input}
      />
      <Button title="Add Comment" onPress={addComment} color = '#90d7f8' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#010001',
  
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#a7699e',
    padding: 10,
    marginBottom: 10,
    backgroundColor:'#010001',
    borderRadius:10,
  },
  commentText: {
    fontSize: 16,
    color: '#fdfdfc',
  },
  replyContainer: {
    marginLeft: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#a7699e',
    padding: 10,
    backgroundColor: '#010001',
    borderRadius:10,
  },
  replyText: {
    fontSize: 14,
    color: '#fdfdfc',
  },
  input: {
    borderWidth: 1,
    borderColor:'#a7699e',
    padding: 10,
    marginTop: 10,
    color: '#fdfdfc',
    borderRadius:10,
  },
});

export default CommentScreen;