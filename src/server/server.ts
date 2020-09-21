import * as alt from "alt-server"
import * as json from "../../package.json"
import { callbacks } from "./modules/callbacks"

callbacks.init()

alt.log(`~lb~${json.name} ~y~v${json.version}~lb~ loaded`)
