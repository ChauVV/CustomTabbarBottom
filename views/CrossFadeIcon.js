import React from 'react'
import { Animated, View, StyleSheet } from 'react-native'

export default class TabBarIcon extends React.Component {
  render () {
    const {
      route,
      activeOpacity,
      inactiveOpacity,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      style
    } = this.props

    return <View style={[styles.iconView, style]}>
      <Animated.View style={[styles.icon, { opacity: activeOpacity, bottom: 10 }]}>
        {renderIcon({
          route,
          focused: true,
          tintColor: activeTintColor
        })}
      </Animated.View>
      <Animated.View style={[styles.icon, { opacity: inactiveOpacity }]}>
        {renderIcon({
          route,
          focused: false,
          tintColor: inactiveTintColor
        })}
      </Animated.View>
    </View>
  }
}

const styles = StyleSheet.create({
  iconView: {
    position: 'absolute',
    height: 40
  },
  icon: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
