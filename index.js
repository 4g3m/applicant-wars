// ["Name","Health","Damage"]

const candidates = [
  ["Tom Cruise", 136, 6],
  ["Sponge Bob", 110, 4],
  ["James Earl Jones", 175, 8],
  ["Bob Barker", 112, 2],
  ["Tonya Harding", 108, 7],
  ["Charles Barkley", 220, 12],
  ["Peter Piper", 116, 4],
  ["Harry Potter", 96, 16],
  ["Shamu", 280, 24],
  ["Bill Gates", 124, 6],
];

class Player {
  constructor(name, health, damage) {
    this.name = name
    this.health = health
    this.currentHP = health
    this.damage = damage
    this.wins = 0
    this.losses = 0
  }

  _randomNum = (max, min = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  slap = () => this._randomNum(this.damage ** 2)

  reset = () => this.currentHP = this.health
}

class Match {
  constructor(player1, player2) {
    this.players = [...arguments]
  }

  simulate = () => {
    let hitter = this._getFirstPlayer()
    let receiver = this._getNextPlayer(hitter)

    this._displayIntroMsg()

    while (this._isMatchOver() == false) {
      let players = [hitter, receiver]
      let damage = +hitter.slap()

      // this._displayRoundResult(hitter, receiver, damage)
      receiver.currentHP -= damage
      hitter = players[1]
      receiver = players[0]
    }

    this._displayMatchResults()
  }

  _displayIntroMsg = () => console.log(`${this.players[0].name} and ${this.players[1].name} are starting a match`)

  _displayRoundResult(hitter, receiver, damage) {
    console.log(`${hitter.name}, HP of ${hitter.currentHP}, slaps ${receiver.name}, HP of ${receiver.currentHP}, for a damage of ${damage}`)
  }

  _displayMatchResults = () => {
    const winner = this._getWinner()
    const loser = this._getNextPlayer(winner)
    this._calculateResults(winner, loser)
    console.log(`The winner is ${winner.name}. The loser is ${loser.name}.\n`)
  }

  _calculateResults = (winner, loser) => {
    winner.wins += 1
    loser.losses += 1
    winner.reset()
    loser.reset()
  }

  _getWinner = () => {
    if (this.players[0].currentHP <= 0) {
      return this.players[1]
    } else if (this.players[1].currentHP <= 0) {
      return this.players[0]
    }
  }

  _isMatchOver = () => this.players.some(p => p.currentHP <= 0)

  _getFirstPlayer = () => {
    return this.players[Math.floor(Math.random() * 2)]
  }

  _getNextPlayer = (firstPlayer) => {
    return this.players.filter(p => p !== firstPlayer)[0]
  }
}

class Game {
  constructor(playersArr) {
    this.playersArr = this._generatePlayers(playersArr)
    this.matches = this._generateMatches(this.playersArr)
  }

  play = () => {
    const matches = this.matches
    for (let i = 0; i < matches.length; i++) {
      let match = matches[i]
      match.simulate()
    }

    this._displayWinners()
  }

  _displayWinners = () => {
    let i = 1
    const sortedWinnersList = this.playersArr.sort((a, b) => {
      return a.wins - b.wins;
    });

    console.log('\nThe final results are in...')
    sortedWinnersList.reverse().forEach(p => console.log(`${i++}. ${p.name} has ${p.wins} wins && ${p.losses} losses.`))
  }

  _generateMatches = (arr) => {
    const matches = []

    for (let i = 0; i < arr.length; i++) {
      let combos = arr.slice(i+1, arr.length)
      let newMatches = this._getMatchesList(combos, arr[i])
      matches.push(...newMatches)
    }

    return matches;
  }

  _getMatchesList = (arr, player) => {
    const matches = [];

    arr.forEach((opponent) => {
      let m = new Match(player, opponent)
      matches.push(m)
    });

    return matches;
  }

  _generatePlayers = (arr) => {
    const players = [];

    arr.forEach(candidate => {
      let p = new Player(...candidate);
      players.push(p);
    });

    return players
  }

}

const game = new Game(candidates)
game.play()
