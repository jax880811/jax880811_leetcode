class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function listToTree(values) {
    if (!values.length) { // 如果列表為空，返回 null
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
    if (!node) {
        return;
    }
    console.log(" ".repeat(level * 4) + prefix + node.val);
    if (node.left || node.right) { // 如果有子節點，繼續打印
        printTreeAsStructure(node.left, level + 1, "L--- ");
        printTreeAsStructure(node.right, level + 1, "R--- ");
    }
}


class Solution {
    sortedArrayToBST = function(nums) {
        if (nums.length === 0) {
            return null;
        }
        let mid = Math.floor(nums.length/2);
        let root = new TreeNode(nums[mid]);
        root.left = this.sortedArrayToBST(nums.slice(0, mid));
        root.right = this.sortedArrayToBST(nums.slice(mid + 1));
        return root;
    }
}


const nums = [-10, -3, 0, 5, 9];
const solution = new Solution();
const tree = solution.sortedArrayToBST(nums);
printTreeAsStructure(tree);
/*
const nums = [-10,-3,0,5,9];
const tree_nums = list_to_tree(nums);
print_tree_as_structure(tree_nums);
const solution = new Solution();
console.log(solution.sortedArrayToBST(tree_nums));
*/

/*
LeetCode 108: 將有序數組轉換為二元搜索樹

題目翻譯：
給定一個按升序排列的整數數組 `nums`，請將其轉換為一棵高度平衡的二元搜索樹（BST）。高度平衡的二元搜索樹是指一棵樹的每個節點的左右子樹高度差絕對值不超過 1。

題目需求：
1. 將有序數組轉換為高度平衡的二元搜索樹。
2. 需要考慮時間和空間複雜度。

解題思路與拆解：
1. 問題分析：
   - 核心問題是將有序數組轉換為高度平衡的二元搜索樹。
   - 可以使用遞歸方法來解決。

2. 解題方法選擇：
   - 方法一：遞歸法（本解法採用）- 時間 O(N)，空間 O(log N)
   - 方法二：迭代法 - 時間 O(N)，空間 O(N)

3. 解題步驟：
   - 如果數組為空，返回 `null`。
   - 找到中間元素 `mid`，並將其作為根節點。
   - 遞歸建立左子樹和右子樹。

重點筆記：
1. **遞歸的使用**:
   - 遞歸建立左子樹和右子樹。
   - 如果數組為空，返回 `null`。

2. **時間複雜度**:
   - 需要遍歷每個元素，時間複雜度為 O(N)，其中 N 是數組的長度。

3. **空間複雜度**:
   - 遞歸調用的深度取決於數組的長度，空間複雜度為 O(log N)。

4. **適用場景**:
   - 適合處理有序數組的轉換問題，例如：將有序數組轉換為二元搜索樹、將有序鏈表轉換為二元搜索樹等。

範例解析：
- 輸入：nums = [-10, -3, 0, 5, 9]
- 過程：
  - 找到中間元素 0，作為根節點。
  - 遞歸建立左子樹 [-10, -3] 和右子樹 [5, 9]。
  - 最終建立的高度平衡 BST 如下：
      0
     / \
   -3   9
   /   /
-10  5
- 輸出：True

函式功能說明：
- `class TreeNode`：定義二元樹的節點。
- `function listToTree`：將列表轉換為二元樹。
- `function printTreeAsStructure`：以樹的形式打印二元樹。
- `class Solution`：定義一個解決方案類別，用於封裝問題的解決方法。
- `sortedArrayToBST`：定義一個方法，用於將有序數組轉換為高度平衡的二元搜索樹。
- `if (!nums.length)`：如果數組為空，返回 `null`。
- `const mid = Math.floor(nums.length / 2)`：找到中間元素。
- `const root = new TreeNode(nums[mid])`：建立根節點。
- `root.left = this.sortedArrayToBST(nums.slice(0, mid))`：遞歸建立左子樹。
- `root.right = this.sortedArrayToBST(nums.slice(mid + 1))`：遞歸建立右子樹。
- `console.log()`：將結果輸出到控制台。
*/