export const getAdjust = (target: number, excludeBorder: number, containBorder: number): number => {
    const isBetween: boolean = ((target, excludeBorder, containBorder) => {
        if (excludeBorder < containBorder) return excludeBorder < target && target <= containBorder
        if (containBorder < excludeBorder) return containBorder <= target && target < excludeBorder

        return false
    })(target, excludeBorder, containBorder)

    return isBetween ? Math.sign(excludeBorder - containBorder) : 0
}

export const move = (start: number, goal: number, length: number): number[] =>
    [...Array(length).keys()].map((_, apparentIndex) => {
        if (apparentIndex === goal) return start
        else return apparentIndex + getAdjust(apparentIndex, goal, start)
    })

export const clamp = (target: number, min: number, max: number): number => Math.min(Math.max(target, min), max)
