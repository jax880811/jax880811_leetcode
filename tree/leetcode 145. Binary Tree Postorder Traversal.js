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
        const result = [];
        const stack = [];
        let current = root;
        let lastVisited = null; // 記錄最後訪問的節點

        // 遍歷條件：當前節點存在或堆疊不空
        while (current || stack.length > 0) {
            // 深度優先將左子節點壓入堆疊
            while (current) {
                stack.push(current);
                current = current.left;
            }
            
            // 查看堆疊頂端節點但不彈出
            const peekNode = stack[stack.length - 1];
            
            // 若右子樹存在且未被訪問過
            if (peekNode.right && peekNode.right !== lastVisited) {
                current = peekNode.right;
            } else {
                // 處理當前節點並記錄最後訪問節點
                lastVisited = stack.pop();
                result.push(lastVisited.val);
            }
        }
        return result;
    }
}

// 測試範例
const root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9];
const tree_root = list_to_tree(root);
print_tree_as_structure(tree_root);
const solution = new Solution();
console.log(solution.postorderTraversal(tree_root));
/*
LeetCode 145: 二元樹的後序遍歷

題目翻譯：
給定一個二元樹的根節點 root，返回它的後序遍歷結果（左子樹→右子樹→根節點）。

題目需求：
1. 需按照嚴格的「左右根」順序輸出
2. 進階要求：使用迭代法而非遞迴
3. 時間複雜度 O(n)，空間複雜度 O(n)

解題思路與拆解：
1. **反向根右左法**：
   - 先進行類似前序但調整為「根→右→左」的遍歷
   - 最後反轉結果得到「左→右→根」順序
   - 此處採用更符合直覺的標準迭代法

2. **堆疊狀態追蹤**：
   - 使用 lastVisited 標記防止重複處理
   - 需先處理完左右子樹才能處理根節點

時間複雜度：O(n)
空間複雜度：O(n)

重點筆記：
1. **雙重訪問檢查機制**：
   - 堆疊保存待處理節點路徑
   - lastVisited 防止重複進入右子樹

2. **節點處理時機**：
   - 只有當節點的右子樹已處理完才記錄該節點值
   - 需先將所有左子節點壓入堆疊

範例解析：
輸入：
   1
    \
     2
    /
   3
流程：
1. 壓入1→1無左子樹→查看1的右子樹2
2. 壓入2→壓入2的左子樹3→3無左子樹
3. 彈出3→記錄3→lastVisited=3
4. 查看2的右子樹(null)→彈出2→記錄2→lastVisited=2
5. 查看1的右子樹(已處理)→彈出1→記錄1
輸出：[3,2,1]

代碼逐行解析：
| 行數 | 代碼                         | 功能說明                     |
|------|-----------------------------|-----------------------------|
| 19   | const result = []           | 儲存遍歷結果                 |
| 20   | const stack = []            | 模擬遞迴的堆疊結構           |
| 21   | let current = root          | 當前處理節點指針             |
| 22   | let lastVisited = null      | 防重入標記                   |
| 25   | while (current || stack...) | 主循環控制條件               |
| 27-30| 內層 while 循環             | 將所有左子節點壓入堆疊       |
| 33   | const peekNode = stack[...] | 查看堆疊頂端節點             |
| 36   | 處理右子樹條件判斷           | 確保右子樹尚未處理           |
| 40   | stack.pop()                 | 正式彈出已處理完成的節點     |
| 40   | result.push(...)            | 記錄符合後序條件的節點值     |

進階討論：
1. **統一迭代法模板**：
   - 使用 null 標記已訪問節點
   - 可統一處理前/中/後序遍歷
   ```javascript
   function postorder(root) {
       const stack = [root];
       const res = [];
       while (stack.length) {
           const node = stack.pop();
           if (!node) continue;
           if (node instanceof TreeNode) {
               stack.push(node.val);
               stack.push(node.right);
               stack.push(node.left);
           } else {
               res.push(node);
           }
       }
       return res;
   }
Morris 遍歷法：

空間複雜度 O(1)

修改樹結構後還原

實作複雜度較高

測試案例補充：
console.log(solution.postorderTraversal(null)); // []
console.log(solution.postorderTraversal(new TreeNode(1))); // [1]
console.log(solution.postorderTraversal(
new TreeNode(1, null, new TreeNode(2, new TreeNode(3)))
)); // [3,2,1]
console.log(solution.postorderTraversal(
new TreeNode(4,
new TreeNode(2, new TreeNode(1), new TreeNode(3)),
new TreeNode(6, new TreeNode(5))
)
)); // [1,3,2,5,6,4]
*/
