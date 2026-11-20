import { DatabaseSync } from 'node:sqlite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const db = new DatabaseSync(path.join(__dirname, 'nfl.db'))

db.exec(`
  CREATE TABLE IF NOT EXISTS player_stats (
    player_id TEXT,
    player_name TEXT,
    team TEXT,
    position TEXT,
    season INTEGER,
    week INTEGER,
    receiving_yards INTEGER,
    receptions INTEGER,
    targets INTEGER,
    receiving_tds INTEGER,
    PRIMARY KEY (player_id, season, week)
  )
`)

export default db
