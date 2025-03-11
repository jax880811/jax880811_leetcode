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
    
    maxDepth = function(root) {
        if (!root){
            return 0;
        }
        let left_depth = this.maxDepth(root.left);
        let right_depth = this.maxDepth(root.right);
        return 1 + Math.max(left_depth,right_depth);
    }
}

// 測試範例
const root = [3,9,20,null,null,15,7]
const tree_root = list_to_tree(root);
print_tree_as_structure(tree_root);
const solution = new Solution();
console.log(solution.maxDepth(tree_root));

/*
LeetCode 104: 二叉樹的最大深度 (Maximum Depth of Binary Tree) (Node.js 實現)

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
   - 核心問題是計算二叉樹的深度。
   - 可以使用深度優先搜索 (DFS) 策略，遞迴地探索樹的深度。
   - 二叉樹的最大深度等於其左右子樹中深度較大者再加一。
   - 遞迴的終止條件是當節點為空時，深度為 0。

2. 解題方法選擇：
   - 方法一：遞迴 DFS (Depth First Search) (本解法採用) - 時間複雜度 O(N)，空間複雜度 O(H)，其中 N 為節點數，H 為樹的高度。
   - 方法二：迭代 BFS (Breadth First Search) - 時間複雜度 O(N)，空間複雜度 O(W)，其中 W 為樹的最大寬度。
   - 方法三：迭代 DFS 使用堆疊 - 時間複雜度 O(N)，空間複雜度 O(H)。

3. 解題步驟 (遞迴 DFS 方法)：
   - 基礎情況 (Base Case)：
     - 如果當前節點 `root` 為 `null`，表示到達樹的底部或空樹，此時深度為 0，直接返回 0。
   - 遞迴步驟 (Recursive Step)：
     - 遞迴調用 `maxDepth` 函數，計算左子樹的最大深度 `left_depth = this.maxDepth(root.left)`。
     - 遞迴調用 `maxDepth` 函數，計算右子樹的最大深度 `right_depth = this.maxDepth(root.right)`。
     - 當前節點的深度為其左右子樹深度的最大值加 1，即 `1 + Math.max(left_depth, right_depth)`。
     - 返回計算得到的深度值。

重點筆記：
1. **遞迴 (Recursion) 的應用**:
   - 遞迴是解決樹形結構問題的有效方法。
   - 函數 `maxDepth(root)` 通過遞迴調用自身來處理子樹，將問題分解為更小的子問題。
   - 每次遞迴調用都處理當前節點的左子樹或右子樹，逐步深入到樹的底層。

2. **基礎情況 (Base Case) 的重要性**:
   - 基礎情況 `if (!root) { return 0; }` 是遞迴結束的條件，防止無限遞迴。
   - 當節點為 `null` 時，遞迴停止，並開始逐層返回深度值。

3. **遞迴關係 (Recursive Relation)**:
   - `return 1 + Math.max(left_depth, right_depth);` 定義了遞迴的核心邏輯。
   - 每個節點的深度都是基於其子節點的深度計算得出的，體現了從底向上計算深度的過程。

4. **時間複雜度分析**:
   - 遞迴過程中，每個節點都會被訪問一次。
   - 因此，時間複雜度與節點數量成線性關係，為 O(N)，其中 N 是樹的節點總數。

5. **空間複雜度分析**:
   - 空間複雜度主要由遞迴調用堆疊的深度決定。
   - 堆疊深度在最壞情況下（例如，傾斜樹）會達到樹的高度 H，即 O(H)。
   - 對於平衡二叉樹，高度 H 近似於 logN，空間複雜度趨近於 O(log N)。
   - 最壞情況下，空間複雜度為 O(N)。

6. **適用場景**:
   - 適用於需要計算樹的深度、高度等樹形結構特性的問題。
   - 遞迴 DFS 方法簡潔直觀，易於理解和實現。

範例解析：
- 輸入：`root = [3, 9, 20, null, null, 15, 7]`
- 二叉樹結構:
  3
 / \
9  20
  /  \
 15   7
- 過程 (簡化遞迴過程):
- `maxDepth(node=3)`:
  - `left_depth = maxDepth(node=9) = 1`
  - `right_depth = maxDepth(node=20)`:
    - `left_depth = maxDepth(node=15) = 1`
    - `right_depth = maxDepth(node=7) = 1`
    - 返回 `1 + max(1, 1) = 2`
  - 返回 `1 + max(1, 2) = 3`
- 輸出：`3`

函式功能說明 (已移動到程式碼的行內註解):
- `class TreeNode { ... }`: 定義二叉樹節點類別。
- `function list_to_tree(values)`: 將列表轉換為二叉樹結構。
- `function print_tree_as_structure(node, level, prefix)`: 以結構化形式打印二叉樹，用於可視化。
- `class Solution { ... }`: 定義解決方案類別。
- `maxDepth(root)`: 計算二叉樹最大深度的核心方法，使用遞迴實現。
- `if (!root) { return 0; }`: 遞迴基礎情況，處理空節點。
- `const left_depth = this.maxDepth(root.left);`: 遞迴計算左子樹深度。
- `const right_depth = this.maxDepth(root.right);`: 遞迴計算右子樹深度。
- `return 1 + Math.max(left_depth, right_depth);`: 返回當前節點的深度，為子樹最大深度加一。
- `const root = [...]`: 定義測試用例的列表形式二叉樹。
- `const tree_root = list_to_tree(root);`: 將列表轉換為樹結構。
- `print_tree_as_structure(tree_root);`: 打印樹結構。
- `const solution = new Solution();`: 創建 `Solution` 實例。
- `console.log(...)`: 調用 `maxDepth` 並打印結果。
*/