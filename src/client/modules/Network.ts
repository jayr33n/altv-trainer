import * as alt from "alt-client"
import * as game from "natives"
import Weather from "../enums/Weather"

class Network {
    private callbacks: { [id: string]: (result: [object]) => void } = {}

    init() {
        alt.onServer("network:sendCallback", (key: string, value: any) => this.callbacks[key](value))
        alt.onServer("world:setTime", (hours: number, minutes: number, seconds: number) => game.networkOverrideClockTime(hours, minutes, seconds))
        alt.onServer("world:setWeather", (weather: Weather) => {
            game.setWeatherTypeNow(Weather[weather])
            if (weather == Weather.Xmas) {
                game.setForceVehicleTrails(true)
                game.setForcePedFootstepsTracks(true)
            }
            else {
                game.setForceVehicleTrails(false)
                game.setForcePedFootstepsTracks(false)
            }
        })
        alt.onServer("world:setCloudHat", (cloudHat: string) => game.loadCloudHat(cloudHat, 0))
        alt.onServer("world:setCloudHatOpacity", (opacity: number) => game.setCloudHatOpacity(opacity))
    }

    async callback(key: string, args: any[] = []) {
        return await new Promise((resolve) => {
            alt.emitServer("network:requestCallback", key, args)
            this.callbacks[key] = resolve
        })
    }
}

const network = new Network()
export default network
