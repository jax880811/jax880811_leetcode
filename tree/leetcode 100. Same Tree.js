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
    isSameTree(p, q) {
        if (!p && !q) {
            return true;
        }
        if (!p || !q) {
            return false;
        }
        if (p.val !== q.val) {
            return false;
        }
        return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);
    }
}

// 測試範例
const p = [1, 2, 3];
const q = [1, 2, 3];
const tree_p = list_to_tree(p);
const tree_q = list_to_tree(q);
print_tree_as_structure(tree_p);
print_tree_as_structure(tree_q);
const solution = new Solution();
console.log(solution.isSameTree(tree_p, tree_q));

/*
LeetCode 100: 相同的樹 (Same Tree) (Node.js 實現)

題目翻譯：
給定兩個二叉樹的根節點 `p` 和 `q`，編寫一個函數來檢測這兩棵樹是否相同。
如果兩個二叉樹在結構上相同，並且節點具有相同的值，則認為它們是相同的。

題目需求：
1. 檢查兩棵二叉樹是否結構相同。
2. 檢查兩棵二叉樹對應節點的值是否相同。
3. 若結構和節點值均相同，返回 true。
4. 否則，返回 false。
5. 需要考慮時間和空間複雜度。

解題思路與拆解：
1. 問題分析：
    - 核心問題是判斷兩棵二叉樹是否完全一致，包括結構和節點值。
    - 需要同時遍歷兩棵樹，比較對應位置的節點。
    - 遞迴是處理樹結構的有效方法。

2. 解題方法選擇：
    - 方法一：遞迴 (本解法採用) - 時間 O(n)，空間 O(H)，H 為樹的高度
    - 方法二：迭代 (Iterative) 使用佇列或堆疊 - 時間 O(n)，空間 O(n)

3. 解題步驟：
    - 基礎情況 (Base Cases)：
        - 若 `p` 和 `q` 皆為空 (null)，表示子樹相同，返回 `true`。
        - 若 `p` 或 `q` 其中之一為空 (null)，表示結構不同，返回 `false`。
        - 若 `p` 和 `q` 的節點值 `p.val` 不等於 `q.val`，表示節點值不同，返回 `false`。
    - 遞迴步驟 (Recursive Step)：
        - 若以上基礎情況皆未觸發，則遞迴檢查：
            - `p` 的左子樹是否與 `q` 的左子樹相同 (`this.isSameTree(p.left, q.left)`)
            - **且** `p` 的右子樹是否與 `q` 的右子樹相同 (`this.isSameTree(p.right, q.right)`)
        - 只有當左右子樹都相同時，才返回 `true`。

重點筆記：
1. **遞迴 (Recursion) 的應用**:
    - `this.isSameTree(p, q)` 函數透過遞迴調用自身來比較子樹。
    - 每次遞迴都處理規模更小的子問題 (左右子樹的比較)。
    - 遞迴的結束條件由基礎情況 (Base Cases) 定義。

2. **基礎情況 (Base Cases) 的重要性**:
    - 基礎情況是遞迴函數正確運作的關鍵。
    - 確保涵蓋所有終止遞迴的條件，避免無限循環。
    - 本題的基礎情況精確地描述了樹相同的最基本條件和不同條件。

3. **邏輯運算符 `&&` (AND)**:
    - `return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);`
    - `&&` 運算符確保只有當 **左右子樹都同時相同** 時，才判定整棵樹相同。
    - 任何一邊子樹不同，整棵樹即為不同。

4. **時間複雜度**:
    - 演算法需要遍歷兩棵樹的所有節點進行比較。
    - 時間複雜度為 O(N)，其中 N 是樹的節點總數 (假定兩棵樹節點數相近)。

5. **空間複雜度**:
    - 遞迴調用會產生函數調用堆疊。
    - 堆疊深度與樹的高度有關，最壞情況 (傾斜樹) 為 O(N)，平均情況 (平衡樹) 為 O(log H)，H 為樹的高度。
    - 因此，空間複雜度為 O(H)。

6. **適用場景**:
    - 適用於需要嚴格比對樹結構和節點值的場景。
    - 例如：測試二叉樹演算法的正確性、資料結構的驗證、物件深層複製的比較等。

範例解析：
- 輸入：
    - 樹 p 由列表 `[1, 2, 3]` 轉換而來。
    - 樹 q 由列表 `[1, 2, 3]` 轉換而來。
- 過程 (簡化遞迴流程)：
    - `isSameTree(tree_p, tree_q)` 開始比較根節點。
        - 根節點值相同 (1 === 1)。
        - 遞迴比較左子樹：`isSameTree(tree_p.left, tree_q.left)`
            - 左子節點值相同 (2 === 2)。
            - 遞迴比較左子樹的左子樹：`isSameTree(tree_p.left.left, tree_q.left.left)`，皆為 null，返回 `true`。
            - 遞迴比較左子樹的右子樹：`isSameTree(tree_p.left.right, tree_q.left.right)`，皆為 null，返回 `true`。
            - 左子樹的左右子樹皆相同，左子樹判定為相同，返回 `true`。
        - 遞迴比較右子樹：`isSameTree(tree_p.right, tree_q.right)`
            - 右子節點值相同 (3 === 3)。
            - 遞迴比較右子樹的左子樹：`isSameTree(tree_p.right.left, tree_q.right.left)`，皆為 null，返回 `true`。
            - 遞迴比較右子樹的右子樹：`isSameTree(tree_p.right.right, tree_q.right.right)`，皆為 null，返回 `true`。
            - 右子樹的左右子樹皆相同，右子樹判定為相同，返回 `true`。
        - 左右子樹皆相同，整棵樹判定為相同，返回 `true`。
- 輸出：`true`

函式功能說明：
- `class TreeNode { ... }`：定義二叉樹節點類別。
    - `constructor(val = 0, left = null, right = null)`：建構子，初始化節點的值、左子節點和右子節點。
    - `this.val = val;`：設定節點的值。
    - `this.left = left;`：設定左子節點。
    - `this.right = right;`：設定右子節點。
- `function list_to_tree(values)`：將列表 `values` 轉換為二叉樹。
    - 使用廣度優先搜索 (BFS) 方式，逐層建立二叉樹。
    - `if (!values || values.length === 0) { return null; }`：處理空列表情況，返回 `null`。
    - `const root = new TreeNode(values[0]);`：創建根節點，使用列表的第一個元素。
    - `const queue = [root];`：使用佇列進行 BFS，初始將根節點加入佇列。
    - `while (i < values.length)`：迴圈遍歷列表剩餘元素，建立子節點。
    - `const current = queue.shift();`：從佇列取出父節點。
    - `if (i < values.length && values[i] !== null)`：建立左子節點，若列表有值且不為 `null`。
    - `if (i < values.length && values[i] !== null)`：建立右子節點，若列表有值且不為 `null`。
- `function print_tree_as_structure(node, level = 0, prefix = "Root: ")`：以結構化形式打印二叉樹。
    - 遞迴函數，以樹狀結構輸出節點值，方便視覺化。
    - `if (!node) { return; }`：基礎情況，若節點為空則返回。
    - `console.log(" ".repeat(level * 4) + prefix + String(node.val));`：打印節點值，根據層級增加縮排。
    - `print_tree_as_structure(node.left, level + 1, "L--- ");`：遞迴打印左子樹。
    - `print_tree_as_structure(node.right, level + 1, "R--- ");`：遞迴打印右子樹。
- `class Solution { ... }`：定義解決方案類別。
    - `isSameTree(p, q)`：判斷兩棵樹是否相同的核心方法。
    - `if (!p && !q) { return true; }`：基礎情況：兩節點皆為空，返回 `true`。
    - `if (!p || !q) { return false; }`：基礎情況：僅一節點為空，返回 `false`。
    - `if (p.val !== q.val) { return false; }`：基礎情況：節點值不同，返回 `false`。
    - `return this.isSameTree(p.left, q.left) && this.isSameTree(p.right, q.right);`：遞迴步驟，檢查左右子樹是否相同。
- `const p = [1, 2, 3];` `const q = [1, 2, 3];`：定義測試用例的列表。
- `const tree_p = list_to_tree(p);` `const tree_q = list_to_tree(q);`：將列表轉換為二叉樹。
- `print_tree_as_structure(tree_p);` `print_tree_as_structure(tree_q);`：打印樹結構。
- `const solution = new Solution();`：創建 `Solution` 實例。
- `console.log(solution.isSameTree(tree_p, tree_q));`：調用 `isSameTree` 方法並輸出結果。
*/