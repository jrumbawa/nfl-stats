import { DatabaseSync } from 'node:sqlite'

const db = new DatabaseSync('nfl.db')

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
