import db from './db.js'
import { readFileSync } from 'node:fs'
import { parse } from 'csv-parse/sync'

const csvText = readFileSync('stats_2026.csv', 'utf-8')
const rows = parse(csvText, { columns: true, skip_empty_lines: true })

const insert = db.prepare(`
  INSERT INTO player_stats (
    player_id, player_name, team, position, season, week, receiving_yards, receptions, targets, receiving_tds)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`)

for (const row of rows) {
  insert.run(
    row.player_id,
    row.player_name,
    row.team,
    row.position,
    Number(row.season),
    Number(row.week),
    Number(row.receiving_yards),
    Number(row.receptions),
    Number(row.targets),
    Number(row.receiving_tds),
  )
}

console.log(`Import ${rows.length} rows`)
