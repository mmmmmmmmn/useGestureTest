import React from 'react'
import { NextComponentType } from 'next'

import styled from 'styled-components'

import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const data = ['red', 'blue', 'green', 'purple', 'yellow']
const height = 100
const between = 10

const Index: NextComponentType = () => {
    const order = React.useRef<number[]>(data.map((_, index) => index))
    const [springs, set] = useSprings(data.length, () => initialSpringValues)

    const calcBaseY = (rawIndex: number, adjust = 0): number => {
        const diff = order.current.indexOf(rawIndex) - rawIndex
        return (height + between) * (diff + adjust)
    }

    const bind = useDrag(({ args: [originalIndex], movement: [, my], down }) => {
        const apparentIndex = order.current.indexOf(originalIndex)
        const apparentGoal = clamp(apparentIndex + getDistance(my), 0, data.length - 1)

        const minIndex = Math.min(apparentIndex, apparentGoal)
        const maxIndex = Math.max(apparentIndex, apparentGoal)
        const dir = Math.sign(my)

        if (!down) {
            order.current = order.current
                .map((_, rawIndex) => {
                    if (rawIndex === apparentGoal) return apparentIndex
                    if (minIndex <= rawIndex && rawIndex <= maxIndex) return rawIndex + dir

                    return rawIndex
                })
                .map(sortedIndex => order.current[sortedIndex])

            set(rawIndex => ({
                ...initialSpringValues,
                y: calcBaseY(rawIndex),
            }))
        } else {
            set(rawIndex => {
                if (originalIndex === rawIndex)
                    return {
                        y: calcBaseY(originalIndex) + my,
                        z: 10,
                        scale: 1.5,
                        immediate: key => ['y', 'z'].includes(key),
                    }

                return {
                    y: calcBaseY(
                        rawIndex,
                        minIndex <= order.current.indexOf(rawIndex) && order.current.indexOf(rawIndex) <= maxIndex
                            ? -1 * dir
                            : 0,
                    ),
                    z: 0,
                    immediate: key => ['z'].includes(key),
                }
            })
        }
    })

    return (
        <>
            {springs.map(({ y, z, scale }, i) => (
                <Target
                    key={data[i]}
                    {...bind(i)}
                    style={{
                        y,
                        zIndex: z,
                        scale,
                    }}
                    bg={data[i]}
                >
                    {`${i}: ${data[i]}`}
                </Target>
            ))}
        </>
    )
}

export default Index

const initialSpringValues = {
    y: 0,
    z: 1,
    scale: 1,
    immediate: false,
}

const getDistance = (y: number) => Math.sign(y) * Math.floor((Math.abs(y) + height * 0.5) / (height + between))

const clamp = (target: number, min: number, max: number) => Math.min(Math.max(target, min), max)

const Target = styled(animated.div)<{ bg: string }>`
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid;
    cursor: pointer;
    box-sizing: border-box;

    height: ${height}px;
    user-select: none;
    position: relative;
    background: ${p => p.bg};

    & + & {
        margin-top: ${between}px;
    }
`
