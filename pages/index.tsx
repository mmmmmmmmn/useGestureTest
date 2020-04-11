import React from 'react'
import { NextComponentType } from 'next'

import styled from 'styled-components'

import { useSprings, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const Index: NextComponentType = () => {
    const [data, setData] = React.useState(['red', 'blue', 'green', 'purple', 'yellow'])

    const [springs, set] = useSprings(data.length, () => initialSpringValues)

    const bind = useDrag(({ args: [originalIndex], movement: [, my], down }) => {
        const goal = clamp(originalIndex + getDistance(my), 0, data.length - 1)

        const min = Math.min(originalIndex, goal)
        const max = Math.max(originalIndex, goal)
        const dir = Math.sign(my)

        if (!down) {
            if (originalIndex !== goal) {
                // 並べ替え
                setData(data =>
                    [...Array(data.length).keys()]
                        .map(rawIndex => {
                            if (rawIndex === goal) return originalIndex
                            if (min <= rawIndex && rawIndex <= max) return rawIndex + dir

                            return rawIndex
                        })
                        .map(sortedIndex => data[sortedIndex]),
                )
                set(rawIndex => {
                    if (goal === rawIndex)
                        return {
                            y: my - (height + between) * (goal - originalIndex),
                            z: 5,
                            scale: 1.5,
                            immediate: true,
                        }

                    return { ...initialSpringValues, immediate: true }
                })
            }

            set(initialSpringValues)
            return
        }

        set(rawIndex => {
            if (originalIndex === rawIndex)
                return {
                    y: my,
                    z: 10,
                    scale: 1.5,
                    immediate: key => ['y', 'z'].includes(key),
                }

            return {
                y: min <= rawIndex && rawIndex <= max ? -1 * dir * (height + between) : 0,
                z: 0,
                immediate: key => ['z'].includes(key),
            }
        })
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
                    {data[i]}
                </Target>
            ))}
        </>
    )
}

export default Index

const height = 100
const between = 10

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
