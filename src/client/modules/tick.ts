import * as alt from "alt-client"

class Tick {
    private handlers: Record<string, number> = {}

    register(id: string, handler: () => void, miliseconds: number, timeout = -1, timeoutHandler = () => { }) {
        let handle = alt.setInterval(handler, miliseconds)
        if (timeout != -1)
            alt.setTimeout(() => {
                if ((this.handlers[id])) {
                    this.clear(id)
                    timeoutHandler()
                    alt.logWarning(id + " timed out")
                }
            }, timeout)
        this.add(id, handle)
    }

    clear(id: string) {
        try {
            alt.clearInterval(this.handlers[id])
            delete this.handlers[id]
        } catch (error) { alt.logError(error, id) }
    }

    private add(id: string, handle: number) {
        if (this.handlers[id])
            throw new Error("id already exists")
        this.handlers[id] = handle
    }
}

const tick = new Tick()
export default tick
