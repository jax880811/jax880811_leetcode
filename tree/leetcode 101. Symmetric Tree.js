class TreeNode {
    /**
     * Definition for a binary tree node.
     * function TreeNode(val, left, right) {
     *     this.val = (val===undefined ? 0 : val)
     *     this.left = (left===undefined ? null : left)
     *     this.right = (right===undefined ? null : right)
     * }
     * @param {number} val - 節點的值
     * @param {TreeNode} left - 左子節點
     * @param {TreeNode} right - 右子節點
     */
    constructor(val = 0, left = null, right = null) {
        /**
         * @property {number} val - 節點的值
         */
        this.val = val;
        /**
         * @property {TreeNode} left - 左子節點
         */
        this.left = left;
        /**
         * @property {TreeNode} right - 右子節點
         */
        this.right = right;
    }
}

/**
 * 將列表轉換為二叉樹
 * @param {Array<number|null>} values - 以層序遍歷表示的二叉樹列表，null 代表空節點
 * @returns {TreeNode|null} - 樹的根節點
 */
function list_to_tree(values) {
    // 如果列表為空或 null，返回 null
    if (!values || values.length === 0) {
        return null;
    }

    // 創建根節點，使用列表的第一個元素
    const root = new TreeNode(values[0]);
    const queue = [root]; // 使用佇列追蹤父節點
    let i = 1; // 從第二個元素開始

    // 遍歷列表，建立二叉樹
    while (i < values.length) {
        const current = queue.shift(); // 取出佇列頭部的父節點

        // 建立左子節點
        if (i < values.length && values[i] !== null) {
            current.left = new TreeNode(values[i]); // 創建左子節點
            queue.push(current.left); // 將左子節點加入佇列，以便後續處理其子節點
        }
        i++; // 移動到列表的下一個元素

        // 建立右子節點
        if (i < values.length && values[i] !== null) {
            current.right = new TreeNode(values[i]); // 創建右子節點
            queue.push(current.right); // 將右子節點加入佇列
        }
        i++; // 移動到列表的下一個元素
    }
    return root; // 返回樹的根節點
}

/**
 * 以樹的結構形式打印二叉樹
 * @param {TreeNode|null} node - 當前節點
 * @param {number} level - 當前節點的層級，用於控制縮排
 * @param {string} prefix - 節點類型的前綴，例如 "Root: ", "L--- ", "R--- "
 */
function print_tree_as_structure(node, level = 0, prefix = "Root: ") {
    // 基礎情況：如果節點為空，則直接返回，不打印任何內容
    if (!node) {
        return;
    }
    // 打印當前節點的值，並根據層級進行縮排，加上前綴
    console.log(" ".repeat(level * 4) + prefix + String(node.val));
    // 如果當前節點有左子節點或右子節點，則遞迴打印它們
    if (node.left || node.right) {
        // 遞迴打印左子節點，層級加一，前綴 "L--- " 表示左子樹
        print_tree_as_structure(node.left, level + 1, "L--- ");
        // 遞迴打印右子節點，層級加一，前綴 "R--- " 表示右子樹
        print_tree_as_structure(node.right, level + 1, "R--- ");
    }
}

class Solution {
    /**
     * 計算二叉樹的最大深度 (使用 BFS 迭代方法)
     * @param {TreeNode|null} root - 二叉樹的根節點
     * @returns {number} - 二叉樹的最大深度
     */
    isSymmetric = function(root) {
        /**
         * 遞迴檢查兩個節點是否對稱
         * @param {TreeNode|null} p - 第一個節點
         * @param {TreeNode|null} q - 第二個節點
         * @returns {boolean} - 如果兩個節點及其子樹對稱則返回 true，否則返回 false
         */
        const symmetric = (p, q) => {
            // 如果兩個節點都為空，則它們是對稱的
            if (!p && !q) {
                return true;
            }
            // 如果只有一個節點為空，則它們不對稱
            if (!p || !q) {
                return false;
            }
            // 如果兩個節點的值不相等，則它們不對稱
            if (p.val !== q.val) {
                return false;
            }
            // 遞迴檢查第一個節點的左子樹是否與第二個節點的右子樹對稱，
            // 並且第一個節點的右子樹是否與第二個節點的左子樹對稱
            return symmetric(p.left, q.right) && symmetric(p.right, q.left);
        };
        // 從根節點開始，將根節點視為兩個需要對稱的子樹的根
        return symmetric(root, root);
    }
}

//  有自己做出來

// 測試範例
const root = [1,2,2,3,4,4,3]; // 以層序遍歷表示的二叉樹列表
const tree_root = list_to_tree(root); // 將列表轉換為 TreeNode 結構的二叉樹
print_tree_as_structure(tree_root); // 打印二叉樹的結構，方便可視化

const solution = new Solution(); // 創建 Solution 類的實例
console.log(solution.isSymmetric(tree_root));
/*
LeetCode 101: 對稱二叉樹 (Symmetric Tree) (Node.js 實現 - 遞迴解法)

題目翻譯：
給定一個二叉樹的根節點 `root`，檢查它是否是對稱的。

題目需求：
1. 判斷給定的二叉樹是否是對稱的。
2. 對稱二叉樹的定義是：它的左子樹和右子樹在鏡像上相等。

解題思路與拆解：
1. 問題分析：
   - 要判斷一棵二叉樹是否對稱，需要比較其左子樹和右子樹的結構和節點值。
   - 一種有效的方法是遞迴地檢查左子樹的左孩子是否與右子樹的右孩子相等，以及左子樹的右孩子是否與右子樹的左孩子相等。

2. 解題方法選擇：
   - 方法一：遞迴 (Recursive) (本解法採用) - 時間複雜度 O(N)，空間複雜度 O(H) (H 是樹的高度，最壞情況下為 O(N))
   - 方法二：迭代 (Iterative) - 使用佇列或堆疊進行層序或深度優先的比較

3. 解題步驟 (遞迴方法)：
   - 在 `Solution` 類別中定義一個名為 `isSymmetric` 的方法，它接收二叉樹的根節點 `root` 作為輸入，並返回一個布爾值。
   - 在 `isSymmetric` 方法中，定義一個內部遞迴函數 `symmetric`，該函數接收兩個節點 `p` 和 `q` 作為輸入，用於比較這兩個節點及其子樹是否對稱。
   - 在 `symmetric` 函數中：
     - **基本情況 1：** 如果 `p` 和 `q` 都為 `null`，表示兩個對應位置都為空，視為對稱，返回 `true`。
     - **基本情況 2：** 如果 `p` 或 `q` 中只有一個為 `null`，表示兩個對應位置只有一個為空，視為不對稱，返回 `false`。
     - **檢查節點值：** 如果 `p` 和 `q` 的值不相等 (`p.val !== q.val`)，則這兩個節點不對稱，返回 `false`。
     - **遞迴比較子樹：** 遞迴調用 `symmetric` 函數，比較 `p` 的左子節點 (`p.left`) 是否與 `q` 的右子節點 (`q.right`) 對稱，並且比較 `p` 的右子節點 (`p.right`) 是否與 `q` 的左子節點 (`q.left`) 對稱。只有當這兩個條件都成立時，才返回 `true`。
   - 在 `isSymmetric` 方法中，最初調用 `symmetric(root, root)`，將根節點自身與自身進行比較，以啟動對稱性的檢查。

重點筆記：
1. **對稱性的定義：** 左子樹的結構和節點值必須與右子樹的結構和節點值在鏡像上相等。
2. **遞迴比較：** 遞迴地比較左子樹的左子樹和右子樹的右子樹，以及左子樹的右子樹和右子樹的左子樹。
3. **基本情況：** 遞迴的終止條件是當比較的兩個節點都為空，或者只有一個為空，或者它們的值不相等。
4. **時間複雜度：** O(N)，其中 N 是二叉樹中節點的數量。我們需要訪問每個節點一次。
5. **空間複雜度：** O(H)，其中 H 是二叉樹的高度。遞迴調用會使用系統的呼叫堆疊，堆疊的最大深度等於樹的高度。在最壞情況下（例如，一個傾斜的樹），H 可能等於 N。

範例解析 (root = [1, 2, 2, 3, 4, 4, 3]):
  1
 / \
2   2
/ \ / 

3   4 4   3

- `isSymmetric(1)` 調用 `symmetric(1, 1)`。
- `symmetric(1, 1)` 返回 `symmetric(2, 2) && symmetric(2, 2)`。
- `symmetric(2, 2)` 返回 `symmetric(3, 3) && symmetric(4, 4)`。
- `symmetric(3, 3)` 返回 `symmetric(None, None) && symmetric(None, None)`，即 `true && true`，所以是 `true`。
- `symmetric(4, 4)` 返回 `symmetric(None, None) && symmetric(None, None)`，即 `true && true`，所以是 `true`。
- 另一個 `symmetric(2, 2)` 返回 `symmetric(4, 4) && symmetric(3, 3)`，結果也是 `true`。
- 因此，最終結果為 `true`。

函式功能說明:
- `class TreeNode`: 定義二元樹節點類別。
- `constructor(val = 0, left = null, right = null)`: 二元樹節點的建構子。
- `function list_to_tree(values)`: 將列表轉換為二元樹的輔助函數（層序建立）。
- `function print_tree_as_structure(node, level = 0, prefix = "Root: ")`: 以樹狀結構打印二元樹的輔助函數。
- `class Solution`: 定義解決方案類別。
- `isSymmetric(root)`: 判斷二叉樹是否對稱的核心方法。
- `symmetric(p, q)`: 遞迴檢查兩個節點及其子樹是否對稱的輔助函數。

*/