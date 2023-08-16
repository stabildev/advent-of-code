const fs = require('fs')

class Knot {
  constructor(x, y, symbol) {
    this.x = x
    this.y = y
    this.symbol = symbol
  }
}

const knotCount = 10
const knots = Array.from(
  { length: knotCount },
  (_, i) => new Knot(0, 0, i === 0 ? 'H' : i)
)
const head = knots[0]
const tail = knots[knots.length - 1]
const tailPath = [[tail.x, tail.y]]

const executeInstruction = (instruction) => {
  const [direction, distance] = instruction.split(' ')

  // Move head
  for (let i = 0; i < parseInt(distance); i++) {
    switch (direction) {
      case 'U':
        head.y--
        break
      case 'D':
        head.y++
        break
      case 'L':
        head.x--
        break
      case 'R':
        head.x++
        break
    }

    // output += renderState() + '\n'

    // Move tails
    for (let i = 1; i < knots.length; i++) {
      const lead = knots[i - 1]
      const lag = knots[i]

      if (Math.abs(lead.x - lag.x) > 1) {
        lag.x += Math.sign(lead.x - lag.x)
        if (lag.y !== lead.y) {
          lag.y += Math.sign(lead.y - lag.y)
        }
      } else if (Math.abs(lead.y - lag.y) > 1) {
        lag.y += Math.sign(lead.y - lag.y)
        if (lag.x !== lead.x) {
          lag.x += Math.sign(lead.x - lag.x)
        }
      }
      // output += renderState() + '\n'
    }
    if (!tailPath.some((e) => e[0] === tail.x && e[1] === tail.y)) {
      tailPath.push([tail.x, tail.y])
    }
  }
}

const renderState = () => {
  const xAxis = [-11, 14]
  const yAxis = [-15, 5]
  const s = [0, 0]

  let output = ''
  for (let y = yAxis[0]; y <= yAxis[1]; y++) {
    for (let x = xAxis[0]; x <= xAxis[1]; x++) {
      let char = x === s[0] && y === s[1] ? 's' : '.'
      for (const knot of knots) {
        if (x === knot.x && y === knot.y) {
          char = knot.symbol
          break
        }
      }
      output += char
    }
    output += '\n'
  }
  return output
}

const instructions = fs.readFileSync('input.txt', 'utf-8').trim().split('\n')

// let output = renderState() + '\n'

for (const instruction of instructions) {
  executeInstruction(instruction)
  // output += renderState() + '\n'
}

// fs.writeFileSync('./output.txt', output)

// render tail path (reuse knots array)
// knots.length = 0
// for (const [i, [x, y]] of tailPath.entries()) {
//   knots.push(new Knot(x, y, i === 0 ? 's' : '#'))
// }
// console.log(renderState())

console.log('Number of positions visited by tail: ', tailPath.length)
