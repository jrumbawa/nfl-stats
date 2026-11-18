import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [leaders, setLeaders] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/leaders/wr')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLeaders(data)
      })
  }, [])

  return (
    <div>
      <h1>2026 WR Leaders</h1>
      <div>
        {leaders.slice(0, 3).map((leader, index) => {
          return (
            <div key={leader.player_id}>
              <p>#{index + 1} Receiver</p>
              <h3>
                {leader.player_name} · {leader.team}
              </h3>
              <h2>{leader.total_yards} yds</h2>
              <p>
                {leader.total_receptions} rec · {leader.total_tds} tds
              </p>
            </div>
          )
        })}
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Yards</th>
            <th>Rec</th>
            <th>Targets</th>
            <th>TDs</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => {
            return (
              <tr key={leader.player_id}>
                <td>{index + 1}</td>
                <td>
                  {leader.player_name} {leader.team}
                </td>
                <td>{leader.total_yards}</td>
                <td>{leader.total_receptions}</td>
                <td>{leader.total_targets}</td>
                <td>{leader.total_tds}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default App
