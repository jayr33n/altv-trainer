export default class GameMath {
    static clamp(value: number, min: number, max: number) {
        return Math.min(Math.max(value, min), max)
    }
}
