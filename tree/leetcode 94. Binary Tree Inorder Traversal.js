class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function list_to_tree(values) {
    if (!values || values.length === 0) { // 如果列表為空，返回 null
        return null;
    }

    // 創建根節點
    const root = new TreeNode(values[0]);
    const queue = [root]; // 使用佇列追蹤父節點
    let i = 1; // 從第二個元素開始

    while (i < values.length) {
        const current = queue.shift(); // 取出父節點

        // 建立左子節點
        if (i < values.length && values[i] !== null) {
            current.left = new TreeNode(values[i]);
            queue.push(current.left);
        }
        i++;

        // 建立右子節點
        if (i < values.length && values[i] !== null) {
            current.right = new TreeNode(values[i]);
            queue.push(current.right);
        }
        i++;
    }

    return root;
}

function print_tree_as_structure(node, level = 0, prefix = "Root: ") {
    /**
     * 以樹的形式打印二叉樹。
     */
    if (!node) {
        return;
    }
    console.log(" ".repeat(level * 4) + prefix + String(node.val));
    if (node.left || node.right) { // 如果有子節點，繼續打印
        print_tree_as_structure(node.left, level + 1, "L--- ");
        print_tree_as_structure(node.right, level + 1, "R--- ");
    }
}

class Solution {
    inorderTraversal = function(root) {
        return;
    }
}

// 測試範例
const root = [1,2,3,4,5,null,8,null,null,6,7,9];
const tree_root = list_to_tree(root);
print_tree_as_structure(tree_root);
const solution = new Solution();
console.log(solution.inorderTraversal(tree_root));