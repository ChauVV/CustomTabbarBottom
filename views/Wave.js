'use strict'

import React from 'react'
import {
  View,
  Animated,
  Easing
} from 'react-native'
import Svg, {
  Path
} from 'react-native-svg'

const AnimatedSvg = Animated.createAnimatedComponent(Svg)

/**
 * ---------+------------------------+
 * <-- P -->|<--    T    -->|        |______
 *          |   /\          |   /\   |  ^
 *          |  /  \         |  /  \  |  A
 *          | /    \        | /    \ |  |
 *          |/      \       |/      \|__V___
 *          |        \      /        |  ^
 *          |         \    /         |  |
 *          |          \  /          |  |
 *          |           \/           |  H
 *          |                        |  |
 *          |                        |  |
 * ---------+------------------------+__V___
 */

/**
 * @class Wave
 *
 * @prop {Number} H water level
 * @prop {Array} waveParams list of params: {A, T, fill}
 * @prop {bool} animated
 */
class Wave extends React.PureComponent {
  constructor (props) {
    super(props)

    const { H, waveParams } = this.props

    this.state = {
      H,
      waveParams
    }

    this._animated = new Animated.Value(0)
  }

  startAnim (index) {
    const {
      easing = 'linear'
    } = this.props

    const anim = Animated.spring(this._animated, {
      toValue: index,
      easing: Easing[easing],
      useNativeDriver: true
    })
    anim.start()
  }

  render () {
    const { style } = this.props
    const { H, waveParams } = this.state

    //
    const { T, fill } = waveParams[0]
    const translateX = this._animated.interpolate({
      inputRange: [0, 2],
      outputRange: [0, 2 * T / 3]
    })
    const wave = (
      <AnimatedSvg
        style={{
          width: 3 * T,
          height: 2 * H,
          position: 'absolute',
          left: -T,
          bottom: 0,
          transform: [{ translateX }]
        }}
        preserveAspectRatio="xMinYMin meet"
        viewBox={`0 0 ${3 * T} ${2 * H}`}
      >
        <Path
          d={`M ${T} 0 H ${97 * T / 96}  Q ${33 * T / 32} ${0} ${51 * T / 48} ${H / 2} Q ${7 * T / 6} ${8 * H / 5} ${61 * T / 48} ${H / 3} Q ${31 * T / 24} ${0} ${63 * T / 48} ${0} H ${3 * T} V ${2 * H} H 0 V 0 Z`}
          fill={fill}
        />

      </AnimatedSvg>
    )

    return (
      <View style={[style, { position: 'absolute', left: 0, bottom: 0 }]}
        pointerEvents="none">
        {wave}
      </View>
    )
  }
}

export default Wave
