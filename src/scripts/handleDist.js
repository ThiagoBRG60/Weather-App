import { existsSync } from "node:fs"
import { mkdir, rm } from "node:fs/promises"
import { join } from "node:path"

const distFolder = join(import.meta.dirname, "../../dist")
const arg = process.argv[2]

try {
   if (arg === "--delete") {
      if (existsSync(distFolder)) await rm(distFolder, {recursive: true})
   } else {
      await mkdir(distFolder)
   }
} catch (error) {
   console.error(`An error ocurred while trying to create or delete "dist": ${error.message}`)
   process.exit(1)
}