import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Chat from './src/screens/Chat';
import ReqScreen from './src/screens/Req';
import TaskDetails from './src/screens/TaskDetails';
import Review from './src/screens/Review';
import InvoiceScreen from './src/screens/Invoice';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Chat" component={Chat} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="Req" component={ReqScreen} />
          <Stack.Screen name="Invoice" component={InvoiceScreen} />
          <Stack.Screen name="TaskDetails" component={TaskDetails} />
          <Stack.Screen name="Review" component={Review} />

        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
