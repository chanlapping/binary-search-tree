class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = buildTree(arr);
    }
}

function buildTree(arr) {
    let set = new Set(arr);
    let newArr = Array.from(set);
    newArr.sort((a, b) => a - b);
    
    const root = buildBST(newArr, 0, newArr.length - 1);
    return root;
}




function buildBST(arr, start, end) {
    if (start > end) {
        return null;
    }
    let mid = Math.floor((start + end)/2);
    let node = new Node(arr[mid]);
    node.left = buildBST(arr, start, mid - 1);
    node.right = buildBST(arr, mid + 1, end);
    return node;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  let a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  let n = buildTree(a);
  prettyPrint(n);