import React from 'react'
import { NextComponentType } from 'next'

import styled from 'styled-components'

import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const Index: NextComponentType = () => {
    const data = [1, 2]

    const [springs, set] = useSprings(data.length, () => ({
        y: 0,
        scale: 1,
        zIndex: 0,
        immediate: true,
    }))

    const bind = useDrag(
        state => {
            const {
                args: [originalIndex],
                movement: [, my],
                down,
            } = state

            set(index =>
                down && originalIndex === index
                    ? {
                          y: my,
                          scale: 1.5,
                          zIndex: 1000,
                          immediate: true,
                      }
                    : {
                          y: 0,
                          scale: 1,
                          zIndex: 0,
                          immediate: true,
                      },
            )
        },
        {
            axis: 'y',
        },
    )

    return (
        <>
            {springs.map(({ y, scale, zIndex }, i) => (
                <Target
                    key={i}
                    {...bind(i)}
                    style={{
                        zIndex,
                        top: y,
                        transform: scale.to(s => `scale(${s})`),
                    }}
                />
            ))}
        </>
    )
}

export default Index

const Target = styled(animated.div)`
    height: 100px;
    width: 100px;
    position: relative;
    background: red;
    border: 1px solid;
    cursor: pointer;
    user-select: none;

    & + & {
        margin-top: 10px;
        background: blue;
    }
`
