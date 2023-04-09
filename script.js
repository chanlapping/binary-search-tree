class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        this.root = Tree.#buildTree(arr);
        this.values = [];
    }

    static #buildTree(arr) {
        let set = new Set(arr);
        let newArr = Array.from(set);
        newArr.sort((a, b) => a - b);

        const root = this.#buildBST(newArr, 0, newArr.length - 1);
        return root;
    }

    static #buildBST(arr, start, end) {
        if (start > end) {
            return null;
        }
        let mid = Math.floor((start + end) / 2);
        let node = new Node(arr[mid]);
        node.left = this.#buildBST(arr, start, mid - 1);
        node.right = this.#buildBST(arr, mid + 1, end);
        return node;
    }

    insert(value) {
        this.#insertValue(this.root, value);
    }

    #insertValue(node, value) {
        if (node === null) {
            const newNode = new Node(value);
            return newNode;
        }
        if (value < node.data) {
            node.left = this.#insertValue(node.left, value);
        } else if (value > node.data) {
            node.right = this.#insertValue(node.right, value);
        }
        return node;
    }

    delete(value) {
        this.#deleteNode(this.root, value);
    }

    #deleteNode(node, value) {
        if (node == null) {
            return node;
        }
        if (value < node.data) {
            node.left = this.#deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this.#deleteNode(node.right, value);
        } else {
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
    
            let succ = node.right;
            while (succ.left) {
                succ = succ.left;
            }
            node.data = succ.data;
            node.right = this.#deleteNode(node.right, node.data);
        }
        return node;
    }

    find(value) {
        let node = this.root;
        while (node && node.data != value) {
            if (value < node.data) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }

    levelOrder(func) {
        let queue = [];
        this.values = [];
        queue.push(this.root);
        while(queue.length > 0) {
            let node = queue.shift();
            if (func) {
                func(node);
            } else {
                this.values.push(node.data);
            }
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        if (!func) {
            return this.values;
        }
    }

    inorder(func) {
        this.values = [];
        this.#inorderRec(this.root, func);
        if (this.values.length > 0) {
            return this.values;
        }
    }

    #inorderRec(node, func) {
        if (!node) {
            return;
        }
        this.#inorderRec(node.left, func);
        if (func) {
            func(node);
        } else {
            this.values.push(node.data);
        }
        this.#inorderRec(node.right, func);
    }

    preorder(func) {
        this.values = [];
        this.#preorderRec(this.root, func);
        if (this.values.length > 0) {
            return this.values;
        }
    }

    #preorderRec(node, func) {
        if (!node) {
            return;
        }
        if (func) {
            func(node);
        } else {
            this.values.push(node.data);
        }
        this.#preorderRec(node.left, func);
        this.#preorderRec(node.right, func);
    }

    postorder(func) {
        this.values = [];
        this.#postorderRec(this.root, func);
        if (this.values.length > 0) {
            return this.values;
        }
    }

    #postorderRec(node, func) {
        if (!node) {
            return;
        }
        this.#postorderRec(node.left, func);
        this.#postorderRec(node.right, func);
        if (func) {
            func(node);
        } else {
            this.values.push(node.data);
        }
    }

    height(node) {
        if (!node) {
            return -1;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth(node) {
        if (!node) {
            return -1;
        }
        return this.#depthRec(this.root, node);
    }

    #depthRec(root, node) {
        if (!root) {
            return -1;
        }
        if (node.data < root.data) {
            return 1 + this.#depthRec(root.left, node);
        } else if (node.data > root.data) {
            return 1 + this.#depthRec(root.right, node);
        } else {
            return 0;
        }
    }

    isBalanced() {
        return this.#isBalancedRec(this.root);
    }

    #isBalancedRec(node) {
        if (!node) {
            return true;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        const diff = Math.abs(leftHeight - rightHeight);
        if (diff > 1) {
            return false;
        }
        return this.#isBalancedRec(node.left) && this.#isBalancedRec(node.right);
    }

    rebalance() {
        const values = this.levelOrder();
        this.root = Tree.#buildTree(values);
    }
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

let treeString = '';

function prettyString(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyString(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    treeString += `${prefix}${isLeft ? '└── ' : '┌── '}${node.data}\n\n`;
    if (node.left !== null) {
        prettyString(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function getRandomValues(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const value = Math.floor(Math.random() * 1000);
        result.push(value);
    }
    return result;
}

// let a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const a = getRandomValues(14);
let tree = new Tree(a);
const original = document.querySelector('#original');
const unbalanced = document.querySelector('#unbalanced');
const rebalanced = document.querySelector('#rebalanced');
displayTree(original);

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);

displayTree(unbalanced);

tree.rebalance();
displayTree(rebalanced);

function displayTree(ele) {
    treeString = '';
    ele.value = '';
    prettyString(tree.root);
    ele.value = treeString;
    ele.value += `balanced: ${tree.isBalanced()}\n\n`;
    ele.value += `level: ${tree.levelOrder()}\n\n`;
    ele.value += `pre: ${tree.preorder()}\n\n`;
    ele.value += `post: ${tree.postorder()}\n\n`;
    ele.value += `in: ${tree.inorder()}`;
}
