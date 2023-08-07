const fs = require('fs')

const parseInput = (input) => {
  const lines = input.trim().split('\n')

  // group items by elf
  let elves = [[]]

  for (const line of lines) {
    // if line is empty add new elf to list
    if (!line) {
      elves.push([])
    }
    // if line is not empty
    else {
      itemCalories = parseInt(line)
      // add calories to current elf
      elves[elves.length - 1].push(itemCalories)
    }
  }

  return elves
}

const sum = (values) => {
  return values.reduce((sum, value) => sum + value, 0)
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day1/input.txt', 'utf8')

const elves = parseInput(input)

// calculate total calories per elf
let calorieSums = elves.map(sum)

// calculate max
const maxCals = Math.max(...calorieSums)

console.log('Max calories: ' + maxCals) // Output: Max calories: 68442

// sort calorieSums from highest to lowest
calorieSums.sort((a, b) => b - a)

// get first thre elements
const firstThree = calorieSums.slice(0, 3)

// calculate sum
const sumFirstThree = sum(firstThree)

console.log('Sum calories of first three: ' + sumFirstThree) // Output: Sum calories of first three: 204837
