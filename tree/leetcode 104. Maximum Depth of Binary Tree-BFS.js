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
    maxDepth = function(root) {
        // 基礎情況：如果根節點為空，則深度為 0
        if (!root) {
            return 0;
        }

        const queue = [root]; // 初始化佇列，將根節點放入佇列
        let depth = 0; // 初始化深度計數器

        // BFS 迭代
        while (queue.length > 0) { // 當佇列不為空時，繼續迭代
            depth++; // 每當開始處理新一層的節點時，深度加 1
            const levelSize = queue.length; // 記錄當前層級的節點數量

            // 遍歷當前層級的所有節點
            for (let i = 0; i < levelSize; i++) {
                const currentNode = queue.shift(); // 取出佇列頭部的節點 (當前層級的節點)

                // 將非空的左子節點加入佇列，準備下一層級的遍歷
                if (currentNode.left) {
                    queue.push(currentNode.left);
                }
                // 將非空的右子節點加入佇列，準備下一層級的遍歷
                if (currentNode.right) {
                    queue.push(currentNode.right);
                }
            }
        }
        return depth; // 返回最終計算得到的樹的深度
    }
}

// 測試範例
const root = [3, 9, 20, null, null, 15, 7]; // 以層序遍歷表示的二叉樹列表
const tree_root = list_to_tree(root); // 將列表轉換為 TreeNode 結構的二叉樹
print_tree_as_structure(tree_root); // 打印二叉樹的結構，方便可視化

const solution = new Solution(); // 創建 Solution 類的實例
console.log(`樹的最大深度: ${solution.maxDepth(tree_root)}`); // 調用 maxDepth 方法計算樹的最大深度並打印

/*
LeetCode 104: 二叉樹的最大深度 (Maximum Depth of Binary Tree) (Node.js 實現 - BFS 解法)

題目翻譯：
給定一個二叉樹的根節點 root，返回其最大深度。
二叉樹的最大深度是指從根節點到最遠葉子節點的最長路徑上的節點數。

題目需求：
1. 計算給定二叉樹的最大深度。
2. 最大深度定義為從根節點到最遠葉子節點的最長路徑上的節點數。
3. 空樹的深度為 0。
4. 返回深度值為整數。

解題思路與拆解：
1. 問題分析：
   - 核心問題仍然是計算二叉樹的深度。
   - 這次使用廣度優先搜索 (BFS) 策略，逐層遍歷樹，計算層數。
   - BFS 適合按層次處理節點，每遍歷完一層，深度加一。

2. 解題方法選擇：
   - 方法一：迭代 BFS (Breadth First Search) (本解法採用) - 時間複雜度 O(N)，空間複雜度 O(W)，其中 N 為節點數，W 為樹的最大寬度。
   - 方法二：遞迴 DFS (Depth First Search) - 時間複雜度 O(N)，空間複雜度 O(H)，其中 H 為樹的高度。
   - 方法三：迭代 DFS 使用堆疊 - 時間複雜度 O(N)，空間複雜度 O(H)。

3. 解題步驟 (迭代 BFS 方法)：
   - 基礎情況 (Base Case)：
     - 如果根節點 `root` 為 `null`，表示空樹，直接返回深度 0。
   - 初始化 (Initialization)：
     - 創建一個佇列 `queue`，用於存放待遍歷的節點，初始時將根節點 `root` 加入佇列。
     - 初始化深度計數器 `depth = 0`。
   - 迭代 (Iteration)：
     - 當佇列 `queue` 不為空時，執行循環：
       - 每開始新一層的遍歷，深度 `depth` 加 1，因為 BFS 每次循環處理一層節點。
       - 獲取當前層級的節點數量 `levelSize = queue.length`，這是在進入當前層級遍歷前，佇列中的節點數。
       - 使用 `for` 循環遍歷當前層級的所有節點 (`i` 從 0 到 `levelSize - 1`)：
         - 從佇列頭部取出一個節點 `currentNode = queue.shift()` (出隊)。
         - 檢查取出的節點 `currentNode` 是否有左子節點 `currentNode.left`，若有，則將左子節點加入佇列 `queue.push(currentNode.left)`，準備下一層級的遍歷。
         - 檢查 `currentNode` 是否有右子節點 `currentNode.right`，若有，則將右子節點加入佇列 `queue.push(currentNode.right)`。
   - 返回 (Return)：
     - 循環結束後，`depth` 變數即為樹的最大深度，返回 `depth`。

重點筆記：
1. **廣度優先搜索 (BFS) 的應用**:
   - BFS 是一種按層次遍歷樹的演算法，非常適合計算樹的層數或深度。
   - 通過佇列 `queue` 實現層次遍歷，保證先訪問完同一層的所有節點，再進入下一層。

2. **佇列 (Queue) 的使用**:
   - 佇列 `queue` 在 BFS 中扮演關鍵角色，用於存儲待訪問的節點。
   - 節點按照層次順序入隊和出隊，保證了遍歷的廣度優先特性。

3. **層次計數**:
   - 變數 `depth` 記錄了當前遍歷的層數，每次外層 `while` 循環開始時，`depth++`，表示進入下一層。
   - 內層 `for` 循環遍歷的是同一層的所有節點。

4. **時間複雜度分析**:
   - BFS 需要訪問二叉樹的所有節點一次。
   - 因此，時間複雜度為 O(N)，其中 N 是樹的節點總數。

5. **空間複雜度分析**:
   - 空間複雜度主要取決於佇列 `queue` 的大小。
   - 在最壞情況下，如果樹是完全二叉樹或滿二叉樹，且最後一層節點最多，佇列可能需要存儲接近一半的節點 (寬度 W)。
   - 因此，空間複雜度為 O(W)，W 是樹的最大寬度。在平衡樹中，W 近似於 N/2，最壞情況下 W 可能接近 N。

6. **適用場景**:
   - 適用於需要按層次遍歷樹結構的場景，例如：計算樹的層數、廣度優先遍歷、尋找最短路徑（在無權重圖中）等。
   - BFS 相較於 DFS，在某些場景下（如尋找最短路徑）更為適合。

範例解析：
- 輸入：`root = [3, 9, 20, null, null, 15, 7]`
- 二叉樹結構:
  3 (Level 1)
 / \
9  20 (Level 2)
  /  \
 15   7 (Level 3)
- 過程 (簡化 BFS 流程):
- 初始化: `queue = [3]`, `depth = 0`
- 循環 1: `depth = 1`, `levelSize = 1`, 取出 `3`, 加入子節點 `9`, `20`, `queue = [9, 20]`
- 循環 2: `depth = 2`, `levelSize = 2`, 取出 `9`, `20`, `9` 無子節點, 取出 `20`, 加入子節點 `15`, `7`, `queue = [15, 7]`
- 循環 3: `depth = 3`, `levelSize = 2`, 取出 `15`, `7`, `15`, `7` 無子節點, `queue = []`
- 循環結束 (queue 為空), 返回 `depth = 3`
- 輸出：`3`

函式功能說明 (已移動到程式碼的行內註解):
- `class TreeNode { ... }`: 定義二叉樹節點類別。
- `function list_to_tree(values)`: 將列表轉換為二叉樹結構。
- `function print_tree_as_structure(node, level, prefix)`: 以結構化形式打印二叉樹，用於可視化。
- `class Solution { ... }`: 定義解決方案類別。
- `maxDepth(root)`: 計算二叉樹最大深度的核心方法，使用 BFS 迭代實現。
- `if (!root) { return 0; }`: BFS 基礎情況，處理空樹。
- `const queue = [root];`: 初始化 BFS 佇列，放入根節點。
- `let depth = 0;`: 初始化深度計數器。
- `while (queue.length > 0)`: BFS 迭代主循環，直到佇列為空。
- `depth++;`: 每層開始時增加深度。
- `const levelSize = queue.length;`: 獲取當前層節點數。
- `for (let i = 0; i < levelSize; i++)`: 遍歷當前層節點。
- `const currentNode = queue.shift();`: 取出當前節點。
- `if (currentNode.left) { queue.push(currentNode.left); }`: 左子節點入隊。
- `if (currentNode.right) { queue.push(currentNode.right); }`: 右子節點入隊。
- `return depth;`: 返回計算得到的最大深度。
- `const root = [...]`: 定義測試用例的列表形式二叉樹。
- `const tree_root = list_to_tree(root);`: 將列表轉換為樹結構。
- `print_tree_as_structure(tree_root);`: 打印樹結構。
- `const solution = new Solution();`: 創建 `Solution` 實例。
- `console.log(...)`: 調用 `maxDepth` 並打印結果。
*/