class TreeNode {
    constructor(val = 0, left = null, right = null) {
        // 初始化樹節點，設置值和左右子節點
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function listToTree(values) {
    /**
     * 將列表轉換為二叉樹
     * @param {Array} values - 以層序遍歷表示的二叉樹列表
     * @return {TreeNode} - 樹的根節點
     */
    if (!values || values.length === 0) {
        // 如果列表為空，返回 null
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

function printTreeAsStructure(node, level = 0, prefix = "Root: ") {
    /**
     * 以樹的形式打印二叉樹
     * @param {TreeNode} node - 當前節點
     * @param {number} level - 當前層級
     * @param {string} prefix - 節點前綴標記
     */
    if (!node) {
        return;
    }

    console.log(" ".repeat(level * 4) + prefix + node.val);
    if (node.left || node.right) {
        // 如果有子節點，繼續打印
        printTreeAsStructure(node.left, level + 1, "L--- ");
        printTreeAsStructure(node.right, level + 1, "R--- ");
    }
}

class Solution {
    constructor() {
        // 用於記錄最大直徑的變量
        this.maxDiameter = 0;
    }

    diameterOfBinaryTree(root) {
        /**
         * 計算二叉樹的直徑
         * @param {TreeNode} root - 二叉樹的根節點
         * @return {number} - 直徑（最長路徑的邊數）
         */
        const depth = (node) => {
            if (!node) {
                return 0;
            }

            // 遞歸計算左右子樹深度
            const leftDepth = depth(node.left);
            const rightDepth = depth(node.right);

            // 更新最大直徑（左子樹深度 + 右子樹深度）
            this.maxDiameter = Math.max(this.maxDiameter, leftDepth + rightDepth);

            // 返回當前節點的深度
            return 1 + Math.max(leftDepth, rightDepth);
        };

        // 調用深度函數，但我們只關心它對 maxDiameter 的更新
        depth(root);

        return this.maxDiameter;
    }
}

// 測試範例
const root = [3, 1, null, null, 2];
const treeRoot = listToTree(root);
printTreeAsStructure(treeRoot);
const solution = new Solution();
console.log(`樹的直徑: ${solution.diameterOfBinaryTree(treeRoot)}`);

/*
## LeetCode 543: 二叉樹的直徑

### 題目翻譯：
給定一棵二叉樹，你需要計算它的直徑長度。一棵二叉樹的直徑是任意兩個節點路徑長度中的最大值。這條路徑可能穿過也可能不穿過根節點。
注意：兩節點之間的路徑長度是以它們之間邊的數目表示。

### 題目需求：
1. 計算二叉樹中任意兩個節點間的最長路徑（邊的數量）
2. 路徑不一定經過根節點
3. 返回類型為整數

### 原始代碼的問題：
1. 最關鍵的錯誤：dfs函數只計算了從根節點到最遠葉子節點的深度，但直徑是樹中任意兩節點間的最長路徑
2. diameterOfBinaryTree函數只考慮了通過根節點的路徑(左子樹高度+右子樹高度)，沒有考慮可能在子樹中存在的更長路徑
3. 沒有記錄和更新過程中的最大直徑值
4. 對於像[1,2]這樣的樹會返回錯誤結果，因為直徑是1，但原代碼會返回0+1=1

### 解題思路與拆解：
1. 問題分析：
   - 二叉樹的直徑是任意兩個節點之間的最長路徑長度
   - 對於任何一個節點，經過它的最長路徑是其左子樹深度加右子樹深度
   - 需要遍歷每個節點，計算經過該節點的最長路徑，並跟踪全局最大值

2. 解題方法選擇：
   - 後序遍歷DFS（本解法採用）- 時間 O(n)，空間 O(h)，h為樹的高度
   - 計算每個節點的左右子樹深度之和，並記錄最大值

3. 解題步驟：
   - 定義一個變量跟踪全局最大直徑
   - 對每個節點，計算其左右子樹的深度
   - 將左右子樹深度之和與當前最大直徑比較並更新
   - 對每個節點，返回其最大深度（用於父節點計算）

### 重點筆記：
1. **後序遍歷的使用**:
   - 需要先獲取左右子樹信息，然後再處理當前節點
   - 對於每個節點，我們計算其左右子樹的深度

2. **全局變量的使用**:
   - 使用成員變量 `this.maxDiameter` 跟踪最大直徑
   - 在遍歷過程中持續更新這個變量

3. **時間複雜度**:
   - O(n)，其中 n 是樹中的節點數量
   - 每個節點只被訪問一次

4. **空間複雜度**:
   - O(h)，h 是樹的高度，最壞情況下為 O(n)（單鏈樹）
   - 最好情況下為 O(log n)（平衡二叉樹）
   - 空間主要用於遞歸調用棧

5. **適用場景**:
   - 計算樹中的最長路徑
   - 分析樹的結構特性

### 範例解析：
- 輸入：`root = [3, 1, null, null, 2]`
- 樹的結構：
Root: 3
L--- 1
R--- 2

复制
- 過程：
- 對於節點2：左右子樹深度均為0，直徑為0
- 對於節點1：左子樹深度為0，右子樹深度為1，直徑為1
- 對於節點3：左子樹深度為2，右子樹深度為0，直徑為2
- 最大直徑為2
- 輸出：2

### 函式功能說明：
- `class TreeNode`：定義樹節點的結構，包含值和左右子節點引用。
- `listToTree(values)`：將列表轉換為二叉樹，處理 `null` 值作為空節點。
- `printTreeAsStructure(node, level, prefix)`：以可視化方式打印樹結構。
- `class Solution`：封裝解決方案的類。
- `diameterOfBinaryTree(root)`：計算二叉樹的直徑。
- `depth(node)`：輔助函數，計算節點的深度並更新最大直徑。
- `Math.max()`：返回兩個值中的較大值。
*/