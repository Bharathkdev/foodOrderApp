import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RestaurantDetails from '../screens/RestaurantDetails';
import ViewCart from '../screens/ViewCartScreen';
import colors from '../common/Colors';
import {moderateScale} from 'react-native-size-matters';

const Stack = createStackNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RestaurantDetails">
        <Stack.Screen
          name="RestaurantDetails"
          component={RestaurantDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewCart"
          component={ViewCart}
          options={{
            title: 'My Cart',
            headerStyle: {
              backgroundColor: colors.primary,
              shadowColor: 'transparent',
            },
            headerTintColor: colors.defaultLight,
            headerTitleStyle: {
              fontFamily: 'Poppins-Medium',
              paddingTop: moderateScale(4),
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
