import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'

const create = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 120 }}>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>Create</Text>
      </View>
    </SafeAreaView>
  )
}

export default create