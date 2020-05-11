import test from 'ava'
import { getAdjust, move, clamp } from './func'

test('getAdjust: min excludeBorder case', t => {
    t.is(getAdjust(2, 3, 5), 0)
    t.is(getAdjust(3, 3, 5), 0)
    t.is(getAdjust(4, 3, 5), -1)
    t.is(getAdjust(5, 3, 5), -1)
    t.is(getAdjust(6, 3, 5), 0)
})

test('getAdjust: max excludeBorder case', t => {
    t.is(getAdjust(2, 5, 3), 0)
    t.is(getAdjust(3, 5, 3), 1)
    t.is(getAdjust(4, 5, 3), 1)
    t.is(getAdjust(5, 5, 3), 0)
    t.is(getAdjust(6, 5, 3), 0)
})

test('getAdjust: same border case', t => {
    t.is(getAdjust(2, 3, 3), 0)
    t.is(getAdjust(3, 3, 3), 0)
    t.is(getAdjust(4, 3, 3), 0)
})

test('clamp: left out case', t => {
    t.is(clamp(1, 3, 5), 3)
})

test('clamp: left edge case', t => {
    t.is(clamp(3, 3, 5), 3)
})

test('clamp: center case', t => {
    t.is(clamp(4, 3, 5), 4)
})

test('clamp: right edge case', t => {
    t.is(clamp(5, 3, 5), 5)
})

test('clamp: right out case', t => {
    t.is(clamp(7, 3, 5), 5)
})

test('move: normal case from top', t => {
    t.deepEqual(move(0, 0, 5), [0, 1, 2, 3, 4])
    t.deepEqual(move(0, 1, 5), [1, 0, 2, 3, 4])
    t.deepEqual(move(0, 2, 5), [1, 2, 0, 3, 4])
    t.deepEqual(move(0, 3, 5), [1, 2, 3, 0, 4])
    t.deepEqual(move(0, 4, 5), [1, 2, 3, 4, 0])
})

test('move: normal case from no top', t => {
    t.deepEqual(move(1, 1, 5), [0, 1, 2, 3, 4])
    t.deepEqual(move(1, 2, 5), [0, 2, 1, 3, 4])
    t.deepEqual(move(1, 3, 5), [0, 2, 3, 1, 4])
    t.deepEqual(move(1, 4, 5), [0, 2, 3, 4, 1])
})

test('move: reverse case from bottom', t => {
    t.deepEqual(move(4, 0, 5), [4, 0, 1, 2, 3])
    t.deepEqual(move(4, 1, 5), [0, 4, 1, 2, 3])
    t.deepEqual(move(4, 2, 5), [0, 1, 4, 2, 3])
    t.deepEqual(move(4, 3, 5), [0, 1, 2, 4, 3])
    t.deepEqual(move(4, 4, 5), [0, 1, 2, 3, 4])
})

test('move: reverse case from no bottom', t => {
    t.deepEqual(move(3, 0, 5), [3, 0, 1, 2, 4])
    t.deepEqual(move(3, 1, 5), [0, 3, 1, 2, 4])
    t.deepEqual(move(3, 2, 5), [0, 1, 3, 2, 4])
    t.deepEqual(move(3, 3, 5), [0, 1, 2, 3, 4])
})
