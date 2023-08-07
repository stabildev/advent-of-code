const fs = require('fs')

// returns an array of pairs of pairs
// e. g. [ [[2,4], [6,8]], ... ]

const parseInput = (input) => {
  const lines = input.trim().split('\n')
  const pairs = lines.map((line) =>
    line.split(',').map((range) => {
      const splits = range.split('-').map((x) => parseInt(x))
      return splits
    })
  )
  return pairs
}

const fullyContains = (a, b) => {
  return (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1])
}

const overlaps = (a, b) => {
  return (a[1] >= b[0] && a[0] <= b[0]) || (b[1] >= a[0] && b[0] <= a[0])
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day4/input.txt', 'utf8')
const pairs = parseInput(input)

const fullyContainsCount = pairs.filter((pair) => fullyContains(...pair)).length

console.log('Fully contains count: ' + fullyContainsCount) // Output: Fully contains count: 515

// Part 2

const overlapsCount = pairs.filter((pair) => overlaps(...pair)).length

console.log('Overlaps count: ' + overlapsCount) // Output: Overlaps count: 883
