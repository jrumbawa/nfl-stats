import express from 'express'
import cors from 'cors'
import db from './db.js'

const app = express()
app.use(cors())

app.get('/api/leaders/wr', (req, res) => {
  const rows = db
    .prepare(
      `
    SELECT player_name, team, SUM(receiving_yards) AS total_yards, SUM(receptions) AS total_receptions, SUM(targets) AS total_targets, SUM(receiving_tds) AS total_tds FROM player_stats WHERE position = 'WR' GROUP BY player_id, player_name, team ORDER BY total_yards DESC
  `,
    )
    .all()
  res.json(rows)
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
