import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default [{
    input: 'src/client/client.ts',
    output: {
        dir: 'out',
        format: 'es'
    },
    external: ["alt-client", "natives"],
    plugins: [
        json(),
        resolve(),
        typescript(),
        terser()
    ],
},
{
    input: 'src/server/server.ts',
    output: {
        dir: 'out',
        format: 'es',
        entryFileNames: '[name].mjs'
    },
    external: ["alt-server"],
    plugins: [
        json(),
        typescript(),
        terser()
    ],
}];
