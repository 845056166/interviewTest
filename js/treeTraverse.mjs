// function inOrderTraverse(root) {
//   if (!root) return
//   inOrderTraverse(root.left)
//   console.log(root.val)
//   inOrderTraverse(root.right)
// }

/**
 * 中序遍历用栈
 * @param {*} root 
 * @returns 
 */
function inOrderTraverse(root) {
  const res = []
  const stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
}

/**
 * 层级遍历用队列
 * @param {*} root 
 * @returns 
 */
function levelTraverse(root) {
  const queue = [root]
  let levelSize = 1
  let height = 0
  while (queue.length) {
    const item = queue.shift()
    console.log(item.val);
    if (queue.length === 0) levelSize--
    item.left && queue.push(item.left)
    item.right && queue.push(item.right)
    if (levelSize === 0) { // levelSize === 0 代表有一层遍历完了
      height++
      levelSize = queue.length
    }
  }

  return height
}

/**
 * 后序遍历
 * @param {*} tree 
 * @returns 
 */
function postOrderTraverse(tree) {
  const res = []
  function traverseInline(root) {
    if (!root) return
    traverseInline(root.left)
    traverseInline(root.right)
    res.push(root.val)
  }
  traverseInline(tree)
  return res
}

function postOrderTraverseItera(root) {
  let res = []
  let stack = [root]
  while (stack.length) {
    const item = stack.pop()
    res.push(item.val)
    if (item.left) stack.push(item.left)
    if (item.right) stack.push(item.right)
  }
  return res.reverse()
}


function preOrderTraverse(root) {
  const res = []
  function preoderInline(tree) {
    if (!tree) return
    res.push(tree.val)
    preoderInline(tree.left)
    preoderInline(tree.right)
  }
  preoderInline(root)
  return res
}

// console.log('后序遍历');
// const res = inOrderTraverse({
//   val: 1,
//   left: {
//     val: 4,
//     left: {
//       val: 5,
//       left: null,
//       right: null
//     },
//     right: {
//       val: 6,
//       left: null,
//       right: null
//     }
//   },
//   right: {
//     val: 2,
//     right: null,
//     left: {
//       val: 3,
//       left: null,
//       right: null
//     },
//     right: {
//       val: 7,
//       left: {
//         val: 8,
//         left: null,
//         right: null
//       },
//       right: {
//         val: 9,
//         left: null,
//         right: null
//       }
//     }
//   }
// })

// console.log(res);

const when = (condition, fullcall, failcall) => {
  if (condition) {
    fullcall()
  } else {
    failcall && failcall()
  }
}
when(false, function () {
  console.log('1232');
})


// console.log(res);