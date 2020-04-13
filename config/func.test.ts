import { getAdjust, move, clamp } from './func'

describe('getAdjust', () => {
    test('min excludeBorder case', () => {
        expect(getAdjust(2, 3, 5)).toBe(0)
        expect(getAdjust(3, 3, 5)).toBe(0)
        expect(getAdjust(4, 3, 5)).toBe(-1)
        expect(getAdjust(5, 3, 5)).toBe(-1)
        expect(getAdjust(6, 3, 5)).toBe(0)
    })

    test('max excludeBorder case', () => {
        expect(getAdjust(2, 5, 3)).toBe(0)
        expect(getAdjust(3, 5, 3)).toBe(1)
        expect(getAdjust(4, 5, 3)).toBe(1)
        expect(getAdjust(5, 5, 3)).toBe(0)
        expect(getAdjust(6, 5, 3)).toBe(0)
    })

    test('equal border case', () => {
        expect(getAdjust(2, 3, 3)).toBe(0)
        expect(getAdjust(3, 3, 3)).toBe(0)
        expect(getAdjust(4, 3, 3)).toBe(0)
    })
})

describe('clamp', () => {
    test('left out case', () => {
        expect(clamp(1, 3, 5)).toBe(3)
    })

    test('left edge case', () => {
        expect(clamp(3, 3, 5)).toBe(3)
    })

    test('center case', () => {
        expect(clamp(4, 3, 5)).toBe(4)
    })

    test('right edge case', () => {
        expect(clamp(5, 3, 5)).toBe(5)
    })

    test('right out case', () => {
        expect(clamp(7, 3, 5)).toBe(5)
    })
})

describe('move', () => {
    test('normal case from top', () => {
        expect(move(5, 0, 0)).toEqual([0, 1, 2, 3, 4])
        expect(move(5, 0, 1)).toEqual([1, 0, 2, 3, 4])
        expect(move(5, 0, 2)).toEqual([1, 2, 0, 3, 4])
        expect(move(5, 0, 3)).toEqual([1, 2, 3, 0, 4])
        expect(move(5, 0, 4)).toEqual([1, 2, 3, 4, 0])
    })

    test('normal case from no top', () => {
        expect(move(5, 1, 1)).toEqual([0, 1, 2, 3, 4])
        expect(move(5, 1, 2)).toEqual([0, 2, 1, 3, 4])
        expect(move(5, 1, 3)).toEqual([0, 2, 3, 1, 4])
        expect(move(5, 1, 4)).toEqual([0, 2, 3, 4, 1])
    })

    test('reverse case from bottom', () => {
        expect(move(5, 4, 0)).toEqual([4, 0, 1, 2, 3])
        expect(move(5, 4, 1)).toEqual([0, 4, 1, 2, 3])
        expect(move(5, 4, 2)).toEqual([0, 1, 4, 2, 3])
        expect(move(5, 4, 3)).toEqual([0, 1, 2, 4, 3])
        expect(move(5, 4, 4)).toEqual([0, 1, 2, 3, 4])
    })

    test('reverse case from no bottom', () => {
        expect(move(5, 3, 0)).toEqual([3, 0, 1, 2, 4])
        expect(move(5, 3, 1)).toEqual([0, 3, 1, 2, 4])
        expect(move(5, 3, 2)).toEqual([0, 1, 3, 2, 4])
        expect(move(5, 3, 3)).toEqual([0, 1, 2, 3, 4])
    })
})
