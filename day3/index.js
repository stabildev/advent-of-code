const fs = require('fs')

const parseInput = (input) => {
  const lines = input.trim().split('\n')
  const items = lines.map((line) => line.split(''))
  return items
}

const splitInHalves = (items) => {
  const compartments = [
    items.slice(0, items.length / 2),
    items.slice(items.length / 2, items.length),
  ]
  return compartments
}

const findCommonElement = (arrays) => {
  return arrays[0].find((i) =>
    arrays.reduce((acc, a) => acc && a.includes(i), true)
  )
}

// use character codes to get priority
const getPriority = (char) => {
  if (char === char.toLowerCase()) {
    return char.charCodeAt() - 96
  } else {
    return char.charCodeAt() - 64 + 26
  }
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day3/input.txt', 'utf8')
const rucksacks = parseInput(input)

let prioritySum = 0
for (const rucksack of rucksacks) {
  const compartments = splitInHalves(rucksack)
  const commonItem = findCommonElement(compartments)
  const priority = getPriority(commonItem)
  prioritySum += priority
}
console.log('Priority sum: ' + prioritySum) // Output: Priority sum: 7716

// Part 2
prioritySum = 0
for (let i = 0; i < rucksacks.length / 3; i++) {
  const groupRucksacks = rucksacks.slice(i * 3, i * 3 + 3)
  const commonElement = findCommonElement(groupRucksacks)
  prioritySum += getPriority(commonElement)
}
console.log('Priority sum: ' + prioritySum) // Output: Priority sum: 2973
