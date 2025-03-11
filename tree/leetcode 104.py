class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        # 初始化樹節點，設置值和左右子節點
        self.val = val
        self.left = left
        self.right = right

def list_to_tree(values):
    """
    將列表轉換為二叉樹
    :param values: 以層序遍歷表示的二叉樹列表
    :return: 樹的根節點
    """
    if not values or len(values) == 0:
        # 如果列表為空，返回 None
        return None
    
    # 創建根節點
    root = TreeNode(values[0])
    queue = [root]  # 使用佇列追蹤父節點
    i = 1  # 從第二個元素開始
    
    while i < len(values):
        current = queue.pop(0)  # 取出父節點
        
        # 建立左子節點
        if i < len(values) and values[i] is not None:
            current.left = TreeNode(values[i])
            queue.append(current.left)
        i += 1
        
        # 建立右子節點
        if i < len(values) and values[i] is not None:
            current.right = TreeNode(values[i])
            queue.append(current.right)
        i += 1
    
    return root

def print_tree_as_structure(node, level=0, prefix="Root: "):
    """
    以樹的形式打印二叉樹
    :param node: 當前節點
    :param level: 當前層級
    :param prefix: 節點前綴標記
    """
    if not node:
        return
    
    print(" " * (level * 4) + prefix + str(node.val))
    if node.left or node.right:  # 如果有子節點，繼續打印
        print_tree_as_structure(node.left, level + 1, "L--- ")
        print_tree_as_structure(node.right, level + 1, "R--- ")

class Solution:
    def maxDepth(self, root):
        """
        計算二叉樹的最大深度
        :param root: 二叉樹的根節點
        :return: 最大深度
        """
        # 基礎情況：如果節點為空，深度為0
        if not root:
            return 0
        
        # 遞歸計算左子樹深度
        left_depth = self.maxDepth(root.left)
        # 遞歸計算右子樹深度
        right_depth = self.maxDepth(root.right)
        
        # 返回左右子樹的最大深度加1(當前層)
        return 1 + max(left_depth, right_depth)

# 測試範例
root = [3, 9, 20, None, None, 15, 7]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(f"樹的最大深度: {solution.maxDepth(tree_root)}")

'''
LeetCode 104: 二叉樹的最大深度

題目翻譯：
給定一個二叉樹的根節點 root，返回其最大深度。二叉樹的最大深度是指從根節點到最遠葉子節點的最長路徑上的節點數。

題目需求：
1. 計算二叉樹的最大深度（根節點到最遠葉子節點的路徑長度）
2. 空樹的深度為0
3. 返回類型為整數

解題思路與拆解：
1. 問題分析：
   - 這是一個典型的遞歸問題，可以用深度優先搜索(DFS)解決
   - 樹的最大深度 = max(左子樹最大深度, 右子樹最大深度) + 1
   - 遞歸的終止條件是當節點為空時，返回深度0

2. 解題方法選擇：
   - 方法一：遞歸DFS（本解法採用）- 時間 O(n)，空間 O(h)，h為樹的高度
   - 方法二：迭代BFS - 時間 O(n)，空間 O(n)
   - 方法三：迭代DFS - 時間 O(n)，空間 O(h)

3. 解題步驟：
   - 如果根節點為空，返回0
   - 遞歸計算左子樹的最大深度
   - 遞歸計算右子樹的最大深度
   - 返回左右子樹的最大深度加1（當前層）

重點筆記：
1. **遞歸的使用**:
   - 遞歸基礎情況：節點為空時返回0
   - 遞歸關係式：當前節點的深度 = max(左子節點深度, 右子節點深度) + 1

2. **時間複雜度**:
   - O(n)，其中n是樹中的節點數量
   - 每個節點只被訪問一次

3. **空間複雜度**:
   - O(h)，h是樹的高度，最壞情況下為O(n)（單鏈樹）
   - 最好情況下為O(log n)（平衡二叉樹）
   - 空間主要用於遞歸調用棧

4. **適用場景**:
   - 計算樹的高度或深度
   - 判斷樹是否平衡
   - 路徑規劃問題

範例解析：
- 輸入：root = [3, 9, 20, None, None, 15, 7]
- 樹的結構：
  ```
  Root: 3
      L--- 9
      R--- 20
          L--- 15
          R--- 7
  ```
- 過程：
  - 節點3的左子樹(9)深度為1
  - 節點3的右子樹(20、15、7)深度為2
  - 最大深度 = max(1, 2) + 1 = 3
- 輸出：3

函式功能說明：
- `class TreeNode`：定義樹節點的結構，包含值和左右子節點引用。
- `def __init__(self, val, left, right)`：初始化樹節點的構造函數。
- `list_to_tree(values)`：將列表轉換為二叉樹，處理None值作為空節點。
- `print_tree_as_structure(node, level, prefix)`：以可視化方式打印樹結構。
- `class Solution`：封裝解決方案的類。
- `maxDepth(root)`：使用遞歸計算二叉樹的最大深度。
- `max()`：返回兩個值中的較大值。
'''