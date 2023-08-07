const fs = require('fs')

const parseInput = (input) => {
  const stackCount = 9
  const firstCrateLine = 0
  const lastCrateLine = 7
  const firstInstructionLine = 10
  const firstCrateChar = 1
  const crateCharDistance = 4

  const lines = input.split('\n')

  const stacks = Array.from({ length: stackCount }, () => [])

  for (let i = lastCrateLine; i >= firstCrateLine; i--) {
    const line = lines[i]
    for (let j = 0; j < stackCount; j++) {
      const crate = line.split('')[firstCrateChar + j * crateCharDistance]
      if (crate !== ' ') {
        stacks[j].push(crate)
      }
    }
  }

  const instructions = lines
    .slice(firstInstructionLine, lines.length)
    .filter((x) => !!x)
    .map((instruction) => {
      // parse instruction
      const splits = instruction.split(' ')
      return {
        qty: parseInt(splits[1]),
        from: parseInt(splits[3]),
        to: parseInt(splits[5]),
      }
    })

  return {
    stacks,
    instructions,
  }
}

const executeInstruction = (instruction, stacks) => {
  const { qty, from, to } = instruction
  // execute instruction crate by crate
  for (let i = 0; i < qty; i++) {
    stacks[to - 1].push(stacks[from - 1].pop())
  }
}

const executeInstructionBatched = (instruction, stacks) => {
  const { qty, from, to } = instruction
  const fromStack = stacks[from - 1]
  const toStack = stacks[to - 1]

  // execute instruction batched
  toStack.push(...fromStack.splice(fromStack.length - qty, fromStack.length))
}

const concatResult = (stacks) => {
  let result = ''
  for (let i = 0; i < stacks.length; i++) {
    result += stacks[i][stacks[i].length - 1]
  }
  return result
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day5/input.txt', 'utf8')
const { stacks, instructions } = parseInput(input)

for (const instruction of instructions) {
  executeInstruction(instruction, stacks)
}

const result = concatResult(stacks)

console.log('Result: ' + result) // Output: Result: FCVRLMVQP

// reset stacks
const { stacks: stacks2 } = parseInput(input)

for (const instruction of instructions) {
  executeInstructionBatched(instruction, stacks2)
}

const result2 = concatResult(stacks2)

console.log('Result batched: ' + result2) // Output: Result batched: RWLWGJGFD
