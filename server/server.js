import express from 'express'
import cors from 'cors'
import db from './db.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(cors())

app.use(express.static(path.join(__dirname, '../client/dist')))
const db = new DatabaseSync(path.join(__dirname, 'nfl.db'))

app.get('/api/leaders/wr', (req, res) => {
  const rows = db
    .prepare(
      `
    SELECT player_id, player_name, (SELECT team FROM player_stats AS latest
     WHERE latest.player_id = player_stats.player_id
     ORDER BY latest.week DESC
     LIMIT 1) AS team, SUM(receiving_yards) AS total_yards, SUM(receptions) AS total_receptions, SUM(targets) AS total_targets, SUM(receiving_tds) AS total_tds FROM player_stats WHERE position = 'WR' GROUP BY player_id, player_name ORDER BY total_yards DESC
  `,
    )
    .all()
  res.json(rows)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on http://localhost:3000')
})
