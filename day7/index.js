const fs = require('fs')

class Directory {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.children = []
    this.size = 0
  }
}

const parseInput = (input) => {
  const lines = input.trim().split('\n')

  const root = new Directory('/')
  let cwd = root
  for (const line of lines) {
    if (line === '$ cd /') {
      // root directory already created
      continue
    }
    if (line === '$ cd ..') {
      // move up to parent
      cwd = cwd.parent
      continue
    }
    if (line.substring(0, 5) === '$ cd ') {
      // create new directory
      const dirName = line.substring(5, line.length)
      const newDir = new Directory(dirName, cwd)
      // add new directory to cwd subfolders
      cwd.children.push(newDir)
      cwd = newDir
      continue
    }
    if (line.substring(0, 2) !== '$ ') {
      // is either dir (irrelevant) or fileSize
      const size = parseInt(line.split(' ')[0])

      if (!!size) {
        cwd.size += size
      }
    }
  }
  return root
}

//////////////////////
//////// MAIN ////////
//////////////////////

const input = fs.readFileSync('day7/input.txt', 'utf8')

const fileSystem = parseInput(input)

// recursively calculate directory sizes
let allDirectories = []
const getDirSize = (dir) => {
  let totalSize = dir.size
  for (const child of dir.children) {
    totalSize += getDirSize(child)
  }
  allDirectories.push({
    name: dir.name,
    totalSize,
  })
  return totalSize
}

const usedSpace = getDirSize(fileSystem)

// exclude root '/'
const directoriesUpTo100k = allDirectories.filter(
  (dir) => dir.name !== '/' && dir.totalSize <= 100000
)
const directoriesUpTo100kSize = directoriesUpTo100k.reduce(
  (sum, dir) => sum + dir.totalSize,
  0
)

// Output: Size of directories up to 100k size: 1642503
console.log('Size of directories up to 100k size: ' + directoriesUpTo100kSize)

// Part 2

const totalSpace = 70000000
const neededSpace = 30000000
const availableSpace = totalSpace - usedSpace
const spaceToFree = neededSpace - availableSpace

// sort directories from smallest to largest
allDirectories.sort((a, b) => a.totalSize - b.totalSize)

// find smallest directory that is large enough
const dirToDelete = allDirectories.find((x) => x.totalSize >= spaceToFree)

// Output: Size of directory that is to be deleted: 6999588
console.log('Size of directory that is to be deleted: ' + dirToDelete.totalSize)
