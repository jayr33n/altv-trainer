import events from "./modules/Events"

events.init()

// TODO: Remove
import * as alt from "alt-server"

alt.on("playerConnect", (player: alt.Player) => {
    player.model = "mp_m_freemode_01"
    player.spawn(0, 0, 70, 0)
})
