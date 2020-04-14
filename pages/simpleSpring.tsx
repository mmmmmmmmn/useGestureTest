import React from 'react'
import { NextComponentType } from 'next'

import styled from 'styled-components'

import { useSpring, animated, config } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const size = 100
const [min, max] = [0, size * 2]

const SimpleSpring: NextComponentType = () => {
    const [isTop, setIsTop] = React.useState(true)
    const clamped = isTop ? min : max
    const base = { y: clamped }
    const [props, set] = useSpring(() => ({ ...base, config: config.wobbly }))

    const bind = useDrag(({ movement: [, my], down }) => {
        if (down) {
            if (Math.abs(my) < 150) {
                set({ y: clamped + my * 0.1 })
                return
            }

            setIsTop(my < 0)
        }
        set(base)
    })

    return <Target {...bind()} style={props} />
}

export default SimpleSpring

const Target = styled(animated.div)`
    border: 1px solid;
    cursor: pointer;
    box-sizing: border-box;
    width: ${size}px;
    height: ${size}px;
    user-select: none;
    background: red;
`
