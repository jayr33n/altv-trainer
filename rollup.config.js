import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import { terser } from "rollup-plugin-terser"

export default [{
    input: 'src/client/client.ts',
    output: {
        dir: 'out',
        format: 'es',
        sourcemap: 'true'
    },
    external: ["alt-client", "natives"],
    plugins: [
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
        sourcemap: 'true'
    },
    external: ["alt-server"],
    plugins: [
        typescript(),
        terser()
    ],
}];
