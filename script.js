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
        this.values = [];
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
    let mid = Math.floor((start + end) / 2);
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
let tree = new Tree(a);
prettyPrint(tree.root);
tree.postorder(node => console.log(node.data));