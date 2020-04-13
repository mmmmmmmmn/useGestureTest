import React from 'react'
import { NextComponentType } from 'next'

import styled from 'styled-components'

import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { getAdjust, move, clamp } from '../config/func'

const data = ['red', 'blue', 'green', 'purple', 'yellow']
const height = 100
const between = 10

const Index: NextComponentType = () => {
    const order = React.useRef<number[]>(data.map((_, index) => index))
    const [springs, setSprings] = useSprings(data.length, () => initialSpringValues)

    const getApparentIndex = getGetApparentIndex(order)
    const getDiff = (rawIndex: number): number => getApparentIndex(rawIndex) - rawIndex

    const bind = useDrag(({ args: [rawStart], movement: [, my], down }) => {
        const apparentStart = getApparentIndex(rawStart)
        const apparentGoal = clamp(apparentStart + getApparentDistance(my), 0, data.length - 1)

        if (down) {
            setSprings(rawIndex => {
                const apparentIndex = getApparentIndex(rawIndex)

                if (apparentIndex === apparentStart) {
                    return {
                        y: calcBaseY(getDiff(rawStart)) + my,
                        z: 10,
                        scale: 1.5,
                        immediate: key => ['y', 'z'].includes(key),
                    }
                } else {
                    return {
                        y: calcBaseY(getDiff(rawIndex) + getAdjust(apparentIndex, apparentStart, apparentGoal)),
                        z: 0,
                        immediate: key => ['z'].includes(key),
                    }
                }
            })
        } else {
            order.current = move(order.current.length, apparentStart, apparentGoal).map(
                sortDestination => order.current[sortDestination],
            )

            setSprings(rawIndex => ({
                ...initialSpringValues,
                y: calcBaseY(getDiff(rawIndex)),
            }))
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

const getGetApparentIndex = (order: React.MutableRefObject<number[]>) => (rawIndex: number): number =>
    order.current.indexOf(rawIndex)

const getApparentDistance = (y: number): number =>
    Math.sign(y) * Math.floor((Math.abs(y) + height * 0.5) / (height + between))

const calcBaseY = (n: number): number => (height + between) * n

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
