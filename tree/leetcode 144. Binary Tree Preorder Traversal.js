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
    preorderTraversal = function(root) {
        const result = []; // 用於儲存前序遍歷結果的陣列
        const stack = [];  // 用於輔助遍歷的堆疊

        if (root) {
            stack.push(root); // 將根節點首先放入堆疊
        }

        while (stack.length > 0) {
            const node = stack.pop(); // 從堆疊頂部彈出一個節點

            result.push(node.val); // 訪問節點（前序：根 -> 左 -> 右）

            // 注意：先將右子節點壓入堆疊，再壓入左子節點
            // 因為堆疊是後進先出 (LIFO)，這樣可以保證左子節點在右子節點之前被處理
            if (node.right) {
                stack.push(node.right);
            }
            if (node.left) {
                stack.push(node.left);
            }
        }

        return result; // 返回前序遍歷的結果陣列
    }
}

// 測試範例
const root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9];
const tree_root = list_to_tree(root);
print_tree_as_structure(tree_root);
const solution = new Solution();
console.log(solution.preorderTraversal(tree_root));

/*
LeetCode 144: 二元樹的前序遍歷 (Binary Tree Preorder Traversal) (Node.js 實現 - 迭代解法)

題目翻譯：
給定一個二元樹的根節點 `root`，返回其節點值的**前序**遍歷。

題目需求：
1. 實現二元樹的前序遍歷。
2. 返回遍歷結果，通常以陣列的形式呈現。
3. 前序遍歷的順序是：先訪問根節點，然後遍歷左子樹，最後遍歷右子樹。

解題思路與拆解：
1. 問題分析：
   - 需要按照特定的順序（根、左、右）訪問二元樹的所有節點。
   - 可以使用遞迴或迭代的方式實現。迭代方法通常在空間效率上更優，尤其對於深度較大的樹。

2. 解題方法選擇：
   - 方法一：遞迴 (Recursive) - 時間 O(N)，空間 O(H) (H 是樹的高度，最壞情況下為 O(N))
   - 方法二：迭代 (Iterative) (本解法採用) - 時間 O(N)，空間 O(H) (H 是樹的高度，最壞情況下為 O(N))

3. 解題步驟 (迭代方法 - 使用堆疊)：
   - 初始化一個空陣列 `result`，用於儲存前序遍歷的結果。
   - 初始化一個空堆疊 `stack`，用於輔助遍歷。
   - 如果根節點 `root` 不為空，將其壓入堆疊 `stack`。
   - 使用 `while` 迴圈，條件是堆疊 `stack` 不為空。
   - 在迴圈中：
     - 從堆疊的頂部彈出一個節點 `node`。這個彈出的節點就是按照前序遍歷順序下一個應該訪問的節點（根節點）。
     - 將彈出節點的值 (`node.val`) 加入到 `result` 陣列中（訪問根節點）。
     - **關鍵步驟：** 由於堆疊是後進先出 (LIFO) 的，為了保證左子樹在右子樹之前被遍歷，我們需要先將右子節點壓入堆疊，然後再壓入左子節點。
       - 如果彈出節點 `node` 存在右子節點 (`node.right`)，則將右子節點壓入 `stack`。
       - 如果彈出節點 `node` 存在左子節點 (`node.left`)，則將左子節點壓入 `stack`。
   - 當 `while` 迴圈結束時，堆疊為空，所有節點都已經被訪問過，並且 `result` 陣列中包含了前序遍歷的結果。
   - 返回 `result` 陣列。

重點筆記：
1. **前序遍歷順序**: 根 -> 左 -> 右。
2. **迭代方法的核心思想**: 使用堆疊模擬遞迴的過程。
3. **堆疊的作用**: 堆疊用於保存待訪問的節點，確保按照前序遍歷的順序進行處理。
4. **壓入堆疊的順序**: 右子節點先於左子節點壓入堆疊，這是因為我們希望左子節點在下一次迭代中先被彈出並處理。
5. **時間複雜度**: O(N)，其中 N 是二元樹中節點的數量。每個節點都會被訪問一次。
6. **空間複雜度**: O(H)，其中 H 是二元樹的高度。在最壞情況下（例如，一個傾斜的樹），H 可能等於 N，因此空間複雜度可能達到 O(N)。在平衡樹的情況下，空間複雜度為 O(log N)。

範例解析 (root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]):
假設樹的結構大致如下（具體結構取決於 `list_to_tree` 的實現）：
  1
 / \
2   3
/ \   

4   5   8
/ \ /
6   7 9

- `result = []`, `stack = [1]`
- 彈出 1，`result = [1]`，壓入右子節點 3，壓入左子節點 2。`stack = [3, 2]`
- 彈出 2，`result = [1, 2]`，壓入右子節點 5，壓入左子節點 4。`stack = [3, 5, 4]`
- 彈出 4，`result = [1, 2, 4]`，沒有子節點。`stack = [3, 5]`
- 彈出 5，`result = [1, 2, 4, 5]`，壓入右子節點 7，壓入左子節點 6。`stack = [3, 7, 6]`
- 彈出 6，`result = [1, 2, 4, 5, 6]`，沒有子節點。`stack = [3, 7]`
- 彈出 7，`result = [1, 2, 4, 5, 6, 7]`，沒有子節點。`stack = [3]`
- 彈出 3，`result = [1, 2, 4, 5, 6, 7, 3]`，壓入右子節點 8。`stack = [8]`
- 彈出 8，`result = [1, 2, 4, 5, 6, 7, 3, 8]`，壓入右子節點 9，沒有左子節點。`stack = [9]`
- 彈出 9，`result = [1, 2, 4, 5, 6, 7, 3, 8, 9]`，沒有子節點。`stack = []`
- 堆疊為空，迴圈結束，返回 `result`。

函式功能說明 (已移動到程式碼的行內註解):
- `class TreeNode`: 定義二元樹節點類別。
- `constructor(val = 0, left = null, right = null)`: 二元樹節點的建構子。
- `class Solution`: 定義解決方案類別。
- `preorderTraversal(root)`: 實現二元樹前序遍歷的核心方法。
- `const result = [];`: 初始化用於儲存遍歷結果的陣列。
- `const stack = [];`: 初始化用於輔助迭代的堆疊。
- `if (root) { stack.push(root); }`: 將根節點放入堆疊（如果存在）。
- `while (stack.length > 0)`: 當堆疊不為空時繼續迴圈。
- `const node = stack.pop();`: 從堆疊中彈出一個節點。
- `result.push(node.val);`: 將彈出節點的值加入結果陣列（訪問根）。
- `if (node.right) { stack.push(node.right); }`: 將右子節點壓入堆疊（如果存在）。
- `if (node.left) { stack.push(node.left); }`: 將左子節點壓入堆疊（如果存在）。
- `return result;`: 返回前序遍歷的結果陣列。
- `const rootArray = [...]`: 定義測試用的二元樹陣列表示。
- `const tree_root = list_to_tree(rootArray);`: 使用輔助函數將陣列轉換為二元樹。
- `print_tree_as_structure(tree_root);`: 使用輔助函數打印樹的結構。
- `const solution = new Solution();`: 創建 Solution 實例。
- `console.log(solution.preorderTraversal(tree_root));`: 調用方法並打印結果。
*/