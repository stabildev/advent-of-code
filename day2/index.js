const fs = require('fs')

const parseInput = (input, decoder) => {
  const lines = input
    .trim()
    .split('\n')
    .filter((x) => !!x) // keep only non-empty lines

  const rounds = lines.map((line) => line.split(' ').map(decoder))

  return rounds
}

// for part 1
const decode = (char) => {
  switch (char) {
    case 'A':
    case 'X':
      return 'rock'
    case 'B':
    case 'Y':
      return 'paper'
    case 'C':
    case 'Z':
      return 'scissors'
  }
}

// for part 2
const decode2 = (char) => {
  switch (char) {
    case 'A':
      return 'rock'
    case 'B':
      return 'paper'
    case 'C':
      return 'scissors'
    case 'X':
      return -1 // lose
    case 'Y':
      return 0 // draw
    case 'Z':
      return 1 // win
  }
}

// 1 = win, -1 = lose, 0 = draw
const calculateWin = (opponent, me) => {
  if (opponent === me) {
    return 0
  }
  if (me === 'rock') {
    return opponent === 'scissors' ? 1 : -1
  }
  if (me === 'paper') {
    return opponent === 'rock' ? 1 : -1
  }
  if (me === 'scissors') {
    return opponent === 'paper' ? 1 : -1
  }
}

const calculateRoundScore = (opponent, me) => {
  const shapeScore = me === 'rock' ? 1 : me === 'paper' ? 2 : 3
  const outcome = calculateWin(opponent, me)
  const outcomeScore = outcome === 1 ? 6 : outcome === 0 ? 3 : 0
  return shapeScore + outcomeScore
}

// utility function
const sum = (values) => {
  return values.reduce((sum, value) => sum + value, 0)
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day2/input.txt', 'utf8')

// Returns an array of e. g. [['rock', 'scissors'], ['paper', 'rock'], ...]
const rounds = parseInput(input, decode)
const roundScores = rounds.map((round) => calculateRoundScore(...round))
const totalScore = sum(roundScores)

console.log('Total score: ' + totalScore) // Output: Total score: 12794

// PART 2

// Use the new decoder
// Returns an array of e. g. [['rock', -1], ['paper', 0], ...]
const rounds2 = parseInput(input, decode2)

// Calculate score
let score = 0
for (const round of rounds2) {
  const [opponentChoice, requiredResult] = round

  // repeat until desired outcome
  let myChoice
  for (myChoice of ['rock', 'paper', 'scissors']) {
    if (calculateWin(opponentChoice, myChoice) === requiredResult) {
      break
    }
  }
  const roundScore = calculateRoundScore(opponentChoice, myChoice)
  score += roundScore
}

console.log('Total score: ' + score) // Output: Total score: 14979
