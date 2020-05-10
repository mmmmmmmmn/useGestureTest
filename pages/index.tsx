import React from 'react'
import { NextComponentType } from 'next'

import styled from 'styled-components'

import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

import { getAdjust, move as _move, clamp as _clamp } from '../config/func'

const data = ['red', 'blue', 'green', 'purple', 'yellow']
const height = 100
const between = 10

const Index: NextComponentType = () => {
    const { order, springs, setSprings, ...utils } = useOrder(data.length)

    const bind = useDrag(({ args: [rawStart], movement: [, my], down }) => {
        const apparentStart = utils.getApparentIndex(rawStart)
        const apparentGoal = utils.clamp(apparentStart + getApparentDistance(my))

        if (down) {
            setSprings(rawIndex => {
                const apparentIndex = utils.getApparentIndex(rawIndex)

                if (apparentIndex === apparentStart) {
                    return {
                        y: calcBaseY(utils.getDiff(rawStart)) + my,
                        z: 10,
                        scale: 1.5,
                        immediate: key => ['y', 'z'].includes(key),
                    }
                } else {
                    return {
                        y: calcBaseY(utils.getDiff(rawIndex) + getAdjust(apparentIndex, apparentStart, apparentGoal)),
                        z: 0,
                        immediate: key => ['z'].includes(key),
                    }
                }
            })
        } else {
            order.current = utils.move(apparentStart, apparentGoal)

            setSprings(rawIndex => ({
                ...initialSpringValues,
                y: calcBaseY(utils.getDiff(rawIndex)),
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

const useOrder = (length: number) => {
    const order = React.useRef<number[]>([...Array(length).keys()])
    const [springs, setSprings] = useSprings(length, () => initialSpringValues)

    return {
        order,
        springs,
        setSprings,
        ...useOrderUtils(order),
    }
}

const useOrderUtils = (order: React.MutableRefObject<number[]>) => {
    const { length } = order.current

    const move = (start: number, goal: number): number[] =>
        _move(start, goal, length).map(sortDestination => order.current[sortDestination])
    const clamp = (target: number): number => _clamp(target, 0, length - 1)

    const getApparentIndex = (rawIndex: number): number => order.current.indexOf(rawIndex)
    const getDiff = (rawIndex: number): number => getApparentIndex(rawIndex) - rawIndex

    return {
        move,
        clamp,
        getApparentIndex,
        getDiff,
    }
}

const initialSpringValues = {
    y: 0,
    z: 1,
    scale: 1,
    immediate: false,
}

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
