const fs = require('fs')

class Tree {
  constructor(height = -1) {
    this.height = height
    this.scenicScore = 1
    this.visible = false
  }
}

// extract tree information into an i x j matrix of Tree objects
const parseInput = (input) => {
  const lines = input.trim().split('\n')
  let treeRows = []

  for (const line of lines) {
    let treeRow = []
    for (const char of line.split('')) {
      const height = parseInt(char)
      const tree = new Tree(height)
      treeRow.push(tree)
    }
    treeRows.push(treeRow)
  }
  return treeRows
}

// utility function to render the tree matrix back to text
const renderMatrix = (matrix, fn, delim) => {
  fn = fn || ((x) => x)
  return matrix.map((row) => row.map(fn).join(delim || '')).join('\n')
}

const calculateProperties = (treeRows) => {
  for (let i = 0; i < treeRows.length; i++) {
    const curRow = treeRows[i] // current row of trees
    for (let j = 0; j < curRow.length; j++) {
      const curCol = treeRows.map((row) => row[j]) // current column of trees
      const curTree = curRow[j] // current tree

      const treesToLeft = curRow.slice(0, j).reverse() // reverse to get viewing direction
      const treesToRight = curRow.slice(j + 1, curRow.length)
      const treesAbove = curCol.slice(0, i).reverse()
      const treesBelow = curCol.slice(i + 1, curCol.length)

      for (const treesInDirection of [
        treesToLeft,
        treesToRight,
        treesAbove,
        treesBelow,
      ]) {
        let viewingDistance

        // find index of next tree of same height or higher in viewing direction
        const nextBlockingTreeIndex = treesInDirection.findIndex(
          (tree) => tree.height >= curTree.height
        )

        // if there is no tree blocking the view, the viewing distance is up to the end of the trees
        // in this case the tree is visible from the outside
        if (nextBlockingTreeIndex === -1) {
          viewingDistance = treesInDirection.length
          curTree.visible = true
        } else {
          viewingDistance = nextBlockingTreeIndex + 1
        }

        curTree.scenicScore *= viewingDistance // scenic score is product of all four viewing distances
      }
    }
  }
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day8/input.txt', 'utf8')
const treeRows = parseInput(input)
calculateProperties(treeRows) // adds properties to treeRows matrix

const visibleCount = treeRows
  .flat()
  .reduce((acc, tree) => acc + (tree.visible ? 1 : 0), 0)

const allScores = treeRows.flat().map((tree) => tree.scenicScore)
const minScore = Math.min(...allScores)
const maxScore = Math.max(...allScores)

console.log('Visible trees: ' + visibleCount) // Output: Visible trees: 1859
console.log('Max. scenic score: ' + maxScore) // Output: Max. scenic score: 332640

///////////////////////
//////// BONUS ////////
///////////////////////

// Optional. Output: Max. hidden scenic score: 5940
console.log(
  'Max. hidden scenic score: ' +
    Math.max(
      ...treeRows
        .flat()
        .filter((tree) => !tree.visible)
        .map((tree) => tree.scenicScore)
    )
)

// Optional: Render visibility and scenic scores

// Normalize values betwen 0 and 1
const normalize = (value, min, max) => {
  return (value - min) / (max - min)
}

// Cnvert normalized values to symbol for rendering as text
const toSymbol = (value) => {
  const temp = Math.round(value * 5)
  return temp === 0
    ? ' '
    : temp === 1
    ? '·'
    : temp === 2
    ? '•'
    : temp === 3
    ? 'o'
    : temp === 4
    ? 'O'
    : 'X'
}

fs.writeFileSync(
  'day8/visibleTrees.txt',
  renderMatrix(treeRows, (tree) => (tree.visible ? 1 : 0))
)

// fs.writeFileSync(
//   'day8/scenicScore.txt',
//   renderMatrix(treeRows, (tree) => tree.scenicScore, ', ')
// )

fs.writeFileSync(
  'day8/scenicScore.txt',
  renderMatrix(treeRows, (tree) =>
    toSymbol(normalize(tree.scenicScore, minScore, maxScore))
  )
)
