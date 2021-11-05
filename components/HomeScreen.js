import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';



function HomeScreen(props) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <Text style={{ fontSize: 30}}> Welcome Back, Dane! </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    padding: 50,
    alignContent: 'center',
  },
  title: {
    alignItems: 'center',
    padding: 30,
  },
});

export default HomeScreen;