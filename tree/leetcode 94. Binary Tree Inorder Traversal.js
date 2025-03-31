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
    inorderTraversal = function (root) {
        // 初始化結果陣列和堆疊結構
        const result = [];
        const stack = [];
        let current = root;

        // 遍歷條件：當前節點存在或堆疊不空
        while (current || stack.length > 0) {
            // 深度優先將左子節點壓入堆疊
            while (current) {
                stack.push(current);
                current = current.left;
            }
            // 彈出堆疊頂端節點處理
            current = stack.pop();
            result.push(current.val);
            // 轉向右子樹繼續處理
            current = current.right;
        }
        return result;
    }
}

// 測試範例
const root = [1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9];
const tree_root = list_to_tree(root);
print_tree_as_structure(tree_root);
const solution = new Solution();
console.log(solution.inorderTraversal(tree_root));

/*
LeetCode 94: 二元樹的中序遍歷

題目翻譯：
給定一個二元樹的根節點 root，返回它的中序遍歷結果。

題目需求：
1. 需按照「左子樹→根節點→右子樹」順序輸出
2. 進階要求：使用迭代法而非遞迴
3. 時間複雜度 O(n)，空間複雜度 O(n)

解題思路與拆解：
1. 迭代法模擬遞迴：
   - 利用堆疊顯式模擬呼叫堆疊
   - 優先處理左子樹到底，再回溯處理根節點與右子樹

2. 遍歷流程控制：
   - 外層循環控制整體遍歷進度
   - 內層循環處理左子樹壓疊
   - 彈出節點時記錄數值並處理右子樹

時間複雜度：O(n) 每個節點恰好被訪問一次
空間複雜度：O(n) 最差情況存儲整條左鏈

重點筆記：
1. **雙重循環結構**：
   - 外層 while 處理遍歷狀態
   - 內層 while 實現深度優先左探尋

2. **節點轉向時機**：
   - 左子樹處理完畢後才記錄當前節點值
   - 記錄後立即轉向右子樹繼續流程

3. **終止條件**：
   - 堆疊空且當前節點為 null 時結束
   - 確保所有可能路徑都被處理

範例解析：
輸入：
   1
    \
     2
    /
   3
流程：
1. 壓入1→發現無左子樹→彈出1→記錄1→轉向右子樹2
2. 壓入2→壓入3→發現無左子樹→彈出3→記錄3→轉向右子樹null
3. 堆疊彈出2→記錄2→轉向右子樹null
4. 堆疊空且current=null→結束
輸出：[1,3,2]

代碼逐行解析：
| 行數 | 代碼                         | 功能說明                     |
|------|-----------------------------|-----------------------------|
| 14   | const result = []           | 儲存遍歷結果                 |
| 15   | const stack = []            | 模擬遞迴呼叫堆疊             |
| 16   | let current = root          | 初始化當前處理節點           |
| 19   | while (current || stack...) | 控制遍歷終止條件             |
| 21-24| 內層 while 循環             | 將左子樹節點全壓入堆疊       |
| 26   | current = stack.pop()       | 取出最後壓入的左子節點       |
| 27   | result.push(current.val)    | 記錄節點值                   |
| 29   | current = current.right     | 轉向右子樹繼續處理           |

進階討論：
1. **Morris遍歷法**：
   - 時間O(n)，空間O(1)
   - 利用葉節點空指針儲存資訊
   - 實作較複雜但符合進階空間要求
   
2. **統一迭代法**：
   - 標記法處理不同遍歷順序
   - 用 null 標記已處理節點
   - 代碼結構統一但效率稍低


*/