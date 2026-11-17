# nfl-stats

A table of 2026 WR leaders with yards, receptions, targets and TDs, sortable, plus Next Gen receiving stats once the basic slice works.

## MVP

2026 WR leaders, sortable, from real nflverse data.

## Not in v1

- No login
- No fantasy points
- No live updates
- No QB / RB / TE tables yet — WR only

## Stack

Express + SQLite + React / Vite

## Data

nflverse stats_player_week_2026.csv
Join key: player_id (GSIS)

## API contract

GET /api/leaders/wr returns:

[
  {
    "player_name": "Puka Nacua",
    "team": "LAR",
    "total_yards": 1200,
    "total_receptions": 90,
    "total_targets": 120,
    "total_tds": 8
  }
]

## How to run

Coming soon — backend first, then frontend.

## Credit

Data: nflverse / NFL Next Gen Stats (CC BY 4.0)
