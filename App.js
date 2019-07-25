
import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import BottomTabBar from './views/BottomTabBar'

import Win1 from './win1'
import Win2 from './win2'
import Win3 from './win3'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
console.disableYellowBox = true

const App = createBottomTabNavigator (
  {
    Win1: { screen: Win1 },
    Win2: { screen: Win2 },
    Win3: { screen: Win3 }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName = ''
        if (routeName === `Win1`) {
          iconName = `home`
        } else if (routeName === `Win2`) {
          iconName = `info-circle`
        } else if (routeName === `Win3`) {
          iconName = `users`
        }
        return <View style={{width: 50, height: 50, backgroundColor: 'rgba(1,1,1,0.5)', justifyContent: 'center', alignItems: 'center', borderRadius: 25}}>
          <IconFontAwesome
          name={iconName}
          style={{ color: focused ? 'white' : '#d8d8d8', fontSize: 30 }}
        />
        </View>
      }
    }),
    tabBarComponent: (props) => {
      return (
          <View style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent'
          }}>
               <BottomTabBar tabStyle={{backgroundColor: 'transparent'}} {...props}/>
          </View>
      )
    },
    tabBarOptions: {
      showLabel: false,
        style: {
          backgroundColor: 'transparent',
            height: 55,
            marginBottom: 25
        }
    },
  }
)

export default App;