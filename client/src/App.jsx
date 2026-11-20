import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [leaders, setLeaders] = useState([])
  const [sortKey, setSortKey] = useState('total_yards')
  const [sortDirection, setSortDirection] = useState('desc')

  function handleSort(col) {
    if (col === sortKey) {
      sortDirection === 'desc'
        ? setSortDirection('asc')
        : setSortDirection('desc')
    } else {
      setSortKey(col)
      if (col === 'player_name') {
        setSortDirection('asc')
      } else {
        setSortDirection('desc')
      }
    }
  }

  const sortedLeaders = [...leaders].sort((a, b) => {
    let result

    if (sortKey === 'player_name') {
      result = a.player_name.localeCompare(b.player_name)
    } else {
      result = a[sortKey] - b[sortKey]
    }

    return sortDirection === 'desc' ? -result : result
  })

  useEffect(() => {
    fetch('http://localhost:3000/api/leaders/wr')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLeaders(data)
      })
  }, [])

  return (
    <div className="page">
      <div className="cards">
        {leaders.slice(0, 3).map((leader, index) => {
          return (
            <div
              className={`card ${index === 0 && 'gold'}`}
              key={leader.player_id}
            >
              <p className="card-rank">#{index + 1} Receiver</p>
              <p>
                <span className="player">{leader.player_name}</span> ·{' '}
                <span className="team">{leader.team}</span>
              </p>
              <p className="yards">{leader.total_yards} yds</p>
              <p className="stats">
                {leader.total_receptions} rec · {leader.total_tds} tds
              </p>
            </div>
          )
        })}
      </div>
      <div className="table-wrap">
        <div className="table-head">
          <h3>2026 WR Leaders</h3>
          <p>Tap a column header to sort</p>
        </div>
        <table>
          <thead>
            <tr>
              <th className="head">#</th>
              <th className="head" onClick={() => handleSort('player_name')}>
                Player{' '}
                {sortKey === 'player_name'
                  ? sortDirection === 'desc'
                    ? ' ▼'
                    : ' ▲'
                  : ''}
              </th>
              <th
                className={`head num ${sortKey === 'total_yards' ? 'sorted' : ''}`}
                onClick={() => handleSort('total_yards')}
              >
                Yards{' '}
                {sortKey === 'total_yards'
                  ? sortDirection === 'desc'
                    ? ' ▼'
                    : ' ▲'
                  : ''}
              </th>
              <th
                className={`head num ${sortKey === 'total_receptions' ? 'sorted' : ''}`}
                onClick={() => handleSort('total_receptions')}
              >
                Rec{' '}
                {sortKey === 'total_receptions'
                  ? sortDirection === 'desc'
                    ? ' ▼'
                    : ' ▲'
                  : ''}
              </th>
              <th
                className={`head num ${sortKey === 'total_targets' ? 'sorted' : ''}`}
                onClick={() => handleSort('total_targets')}
              >
                Targets{' '}
                {sortKey === 'total_targets'
                  ? sortDirection === 'desc'
                    ? ' ▼'
                    : ' ▲'
                  : ''}
              </th>
              <th
                className={`head num ${sortKey === 'total_tds' ? 'sorted' : ''}`}
                onClick={() => handleSort('total_tds')}
              >
                TDs{' '}
                {sortKey === 'total_tds'
                  ? sortDirection === 'desc'
                    ? ' ▼'
                    : ' ▲'
                  : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaders.map((leader, index) => {
              return (
                <tr key={leader.player_id} className={index < 3 ? 'top' : ''}>
                  <td>{index + 1}</td>
                  <td>
                    <span className="top-name">{leader.player_name}</span>{' '}
                    <span className="top-team">{leader.team}</span>
                    {index === 0 &&
                      sortDirection === 'desc' &&
                      sortKey !== 'player_name' && (
                        <span className="pill">#1</span>
                      )}
                  </td>
                  <td className="num">
                    {index < 3 && sortKey === 'total_yards' ? (
                      <strong>{leader.total_yards}</strong>
                    ) : (
                      leader.total_yards
                    )}
                  </td>
                  <td className="num">
                    {index < 3 && sortKey === 'total_receptions' ? (
                      <strong>{leader.total_receptions}</strong>
                    ) : (
                      leader.total_receptions
                    )}
                  </td>
                  <td className="num">
                    {index < 3 && sortKey === 'total_targets' ? (
                      <strong>{leader.total_targets}</strong>
                    ) : (
                      leader.total_targets
                    )}
                  </td>
                  <td className="num">
                    {index < 3 && sortKey === 'total_tds' ? (
                      <strong>{leader.total_tds}</strong>
                    ) : (
                      leader.total_tds
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
