const fs = require('fs')

const parseInput = (input) => {
  return input.trim()
}

const containsDuplicates = (str) => {
  let temp = []
  for (const char of str.split('')) {
    if (temp.includes(char)) {
      return true
    }
    temp.push(char)
  }
  return false
}

const findSignalStart = (buffer, length) => {
  for (i = 0; i < buffer.length - length + 1; i++) {
    const substr = buffer.substring(i, i + length)
    if (!containsDuplicates(substr)) {
      return i + length
    }
  }
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day6/input.txt', 'utf8')
const buffer = parseInput(input)

const result1 = findSignalStart(buffer, 4)
console.log('Result: ' + result1) // Output: Result: 1275

// Part 2
const result2 = findSignalStart(buffer, 14)
console.log('Result: ' + result2) // Output: Result: 3605
