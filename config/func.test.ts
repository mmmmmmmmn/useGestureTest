import test from 'tape'
import { getAdjust, move, clamp } from './func'

test('getAdjust', t => {
    t.test('min excludeBorder case', st => {
        st.equal(getAdjust(2, 3, 5), 0)
        st.equal(getAdjust(3, 3, 5), 0)
        st.equal(getAdjust(4, 3, 5), -1)
        st.equal(getAdjust(5, 3, 5), -1)
        st.equal(getAdjust(6, 3, 5), 0)

        st.end()
    })

    t.test('max excludeBorder case', st => {
        st.equal(getAdjust(2, 5, 3), 0)
        st.equal(getAdjust(3, 5, 3), 1)
        st.equal(getAdjust(4, 5, 3), 1)
        st.equal(getAdjust(5, 5, 3), 0)
        st.equal(getAdjust(6, 5, 3), 0)

        st.end()
    })

    t.test('equal border case', st => {
        st.equal(getAdjust(2, 3, 3), 0)
        st.equal(getAdjust(3, 3, 3), 0)
        st.equal(getAdjust(4, 3, 3), 0)

        st.end()
    })
})

test('clamp', t => {
    t.test('left out case', st => {
        st.equal(clamp(1, 3, 5), 3)

        st.end()
    })

    t.test('left edge case', st => {
        st.equal(clamp(3, 3, 5), 3)

        st.end()
    })

    t.test('center case', st => {
        st.equal(clamp(4, 3, 5), 4)

        st.end()
    })

    t.test('right edge case', st => {
        st.equal(clamp(5, 3, 5), 5)

        st.end()
    })

    t.test('right out case', st => {
        st.equal(clamp(7, 3, 5), 5)

        st.end()
    })
})

test('move', t => {
    t.test('normal case from top', st => {
        st.deepEqual(move(0, 0, 5), [0, 1, 2, 3, 4])
        st.deepEqual(move(0, 1, 5), [1, 0, 2, 3, 4])
        st.deepEqual(move(0, 2, 5), [1, 2, 0, 3, 4])
        st.deepEqual(move(0, 3, 5), [1, 2, 3, 0, 4])
        st.deepEqual(move(0, 4, 5), [1, 2, 3, 4, 0])

        st.end()
    })

    t.test('normal case from no top', st => {
        st.deepEqual(move(1, 1, 5), [0, 1, 2, 3, 4])
        st.deepEqual(move(1, 2, 5), [0, 2, 1, 3, 4])
        st.deepEqual(move(1, 3, 5), [0, 2, 3, 1, 4])
        st.deepEqual(move(1, 4, 5), [0, 2, 3, 4, 1])

        st.end()
    })

    t.test('reverse case from bottom', st => {
        st.deepEqual(move(4, 0, 5), [4, 0, 1, 2, 3])
        st.deepEqual(move(4, 1, 5), [0, 4, 1, 2, 3])
        st.deepEqual(move(4, 2, 5), [0, 1, 4, 2, 3])
        st.deepEqual(move(4, 3, 5), [0, 1, 2, 4, 3])
        st.deepEqual(move(4, 4, 5), [0, 1, 2, 3, 4])

        st.end()
    })

    t.test('reverse case from no bottom', st => {
        st.deepEqual(move(3, 0, 5), [3, 0, 1, 2, 4])
        st.deepEqual(move(3, 1, 5), [0, 3, 1, 2, 4])
        st.deepEqual(move(3, 2, 5), [0, 1, 3, 2, 4])
        st.deepEqual(move(3, 3, 5), [0, 1, 2, 3, 4])

        st.end()
    })
})
