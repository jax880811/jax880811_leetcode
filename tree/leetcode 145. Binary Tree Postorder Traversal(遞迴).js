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
    postorderTraversal = function(root) {
        // 初始化結果陣列和堆疊結構
        const result = []; // 用於儲存後序遍歷結果的陣列

        // 定義遞迴的輔助函數
        const traverse = (node) => {
            if (!node) {
                return; // 遞迴的終止條件：當節點為空時返回
            }

            // 1. 遞迴遍歷左子樹
            traverse(node.left);

            // 2. 遞迴遍歷右子樹
            traverse(node.right);

            // 3. 訪問根節點（將節點值加入結果陣列）
            result.push(node.val);
        };

        // 從根節點開始進行遞迴遍歷
        traverse(root);

        return result; // 返回後序遍歷的結果陣列
    }
}

// 測試範例
const root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9];
const tree_root = list_to_tree(root);
print_tree_as_structure(tree_root);
const solution = new Solution();
console.log(solution.postorderTraversal(tree_root));

/*
LeetCode 145: 二元樹的後序遍歷 (Binary Tree Postorder Traversal) (Node.js 實現 - 遞迴解法)

題目翻譯：
給定一個二元樹的根節點 `root`，返回其節點值的**後序**遍歷。

題目需求：
1. 實現二元樹的後序遍歷。
2. 返回遍歷結果，通常以陣列的形式呈現。
3. 後序遍歷的順序是：先遍歷左子樹，然後遍歷右子樹，最後訪問根節點。

解題思路與拆解：
1. 問題分析：
   - 需要按照特定的順序（左、右、根）訪問二元樹的所有節點。
   - 遞迴方法能夠很自然地符合後序遍歷的定義。

2. 解題方法選擇：
   - 方法一：遞迴 (Recursive) (本解法採用) - 時間 O(N)，空間 O(H) (H 是樹的高度，最壞情況下為 O(N))

3. 解題步驟 (遞迴方法)：
   - 在 `Solution` 類別中定義一個名為 `postorderTraversal` 的方法，它接收二元樹的根節點 `root` 作為輸入。
   - 在 `postorderTraversal` 方法中，初始化一個空陣列 `result`，用於儲存後序遍歷的結果。
   - 定義一個內部遞迴函數 `traverse`，該函數接收一個節點 `node` 作為輸入。
   - 在 `traverse` 函數中：
     - **遞迴終止條件：** 如果當前節點 `node` 為 `null`，則直接返回，停止遞迴。
     - **步驟 1：遞迴遍歷左子樹。** 調用 `traverse(node.left)` 來遍歷當前節點的左子樹。
     - **步驟 2：遞迴遍歷右子樹。** 調用 `traverse(node.right)` 來遍歷當前節點的右子樹。
     - **步驟 3：訪問根節點。** 在遍歷完左右子樹後，將當前節點的值 (`node.val`) 加入到 `result` 陣列中。
   - 在 `postorderTraversal` 方法中，調用 `traverse(root)` 開始從根節點進行遞迴遍歷。
   - 最後，返回儲存了後序遍歷結果的 `result` 陣列。

重點筆記：
1. **後序遍歷順序**: 左 -> 右 -> 根。
2. **遞迴的核心思想**: 將問題分解為更小的子問題，直到達到基本情況（節點為空）。
3. **遞迴調用的順序**: 先遞迴處理左子樹，再處理右子樹，最後處理當前節點。
4. **時間複雜度**: O(N)，其中 N 是二元樹中節點的數量。每個節點都會被訪問一次。
5. **空間複雜度**: O(H)，其中 H 是二元樹的高度。遞迴調用會使用系統的呼叫堆疊，堆疊的最大深度等於樹的高度。在最壞情況下（例如，一個傾斜的樹），H 可能等於 N，因此空間複雜度可能達到 O(N)。在平衡樹的情況下，空間複雜度為 O(log N)。

範例解析 (root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]):
假設樹的結構大致如下：
  1
 / \
2   3
/ \   

4   5   8
/ \ /
6   7 9

遞迴調用的順序大致如下：
- `traverse(1)`
  - `traverse(2)`
    - `traverse(4)` -> `result.push(4)`
    - `traverse(5)`
      - `traverse(6)` -> `result.push(6)`
      - `traverse(7)` -> `result.push(7)`
      - `result.push(5)`
    - `result.push(2)`
  - `traverse(3)`
    - `traverse(null)`
    - `traverse(8)`
      - `traverse(9)` -> `result.push(9)`
      - `traverse(null)`
      - `result.push(8)`
    - `result.push(3)`
  - `result.push(1)`
最終 `result` 為 `[4, 6, 7, 5, 2, 9, 8, 3, 1]`。

函式功能說明 (已移動到程式碼的行內註解):
- `class TreeNode`: 定義二元樹節點類別。
- `constructor(val = 0, left = null, right = null)`: 二元樹節點的建構子。
- `class Solution`: 定義解決方案類別。
- `postorderTraversal(root)`: 實現二元樹後序遍歷的核心方法。
- `const result = [];`: 初始化用於儲存遍歷結果的陣列。
- `traverse(node)`: 遞迴遍歷的輔助函數。
- `if (!node) { return; }`: 遞迴的終止條件。
- `traverse(node.left);`: 遞迴遍歷左子樹。
- `traverse(node.right);`: 遞迴遍歷右子樹。
- `result.push(node.val);`: 訪問根節點，將值加入結果陣列。
- `traverse(root);`: 從根節點開始遞迴。
- `return result;`: 返回後序遍歷的結果陣列。
- `const rootArray = [...]`: 定義測試用的二元樹陣列表示。
- `const tree_root = list_to_tree(rootArray);`: 使用輔助函數將陣列轉換為二元樹。
- `print_tree_as_structure(tree_root);`: 使用輔助函數打印樹的結構。
- `const solution = new Solution();`: 創建 Solution 實例。
- `console.log(solution.postorderTraversal(tree_root));`: 調用方法並打印結果。
*/