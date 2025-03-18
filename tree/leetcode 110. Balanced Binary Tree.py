class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        """
        定義樹節點結構
        :param val: 節點值
        :param left: 左子節點
        :param right: 右子節點
        """
        self.val = val
        self.left = left
        self.right = right

def list_to_tree(values):
    """
    將列表轉換為二叉樹
    :param values: 以層序遍歷表示的二叉樹列表
    :return: 樹的根節點
    """
    if not values or len(values) == 0:  # 如果列表為空，返回 None
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
    def isBalanced(self, root: TreeNode) -> bool:
        """
        檢查二叉樹是否平衡
        :param root: 二叉樹的根節點
        :return: 是否平衡
        """
        if not root:  # 如果根節點為空，返回 True
            return True

        def dfs(node):
            """
            深度優先搜索（DFS）函數，計算節點高度並檢查平衡性
            :param node: 當前節點
            :return: 節點高度，若不平衡則返回 -1
            """
            if not node:  # 如果節點為空，返回高度 0
                return 0

            # 遞歸計算左右子樹的高度
            left_depth = dfs(node.left)
            right_depth = dfs(node.right)

            # 如果左右子樹不平衡，返回 -1
            if left_depth == -1 or right_depth == -1 or abs(left_depth - right_depth) > 1:
                return -1

            # 返回當前節點的高度
            return 1 + max(left_depth, right_depth)

        # 如果 DFS 返回 -1，表示樹不平衡
        return dfs(root) != -1


# 測試範例
if __name__ == "__main__":
    root = [1, None, 2, None, 3]
    tree_root = list_to_tree(root)
    print_tree_as_structure(tree_root)
    solution = Solution()
    print(solution.isBalanced(tree_root))  # 輸出 False

'''
LeetCode 110: 平衡二叉樹

題目翻譯：
給定一棵二叉樹，判斷它是否是高度平衡的。一棵高度平衡二叉樹定義為：一個二叉樹每個節點的左右兩個子樹的高度差的絕對值不超過 1。

題目需求：
1. 檢查二叉樹是否平衡。
2. 返回是否平衡的布林值。

解題思路與拆解：
1. 問題分析：
   - 需要計算每個節點的左右子樹高度差。
   - 如果任意節點的左右子樹高度差超過 1，則樹不平衡。

2. 解題方法選擇：
   - 使用深度優先搜索（DFS）來計算每個節點的高度。
   - 在計算高度的同時，檢查左右子樹是否平衡。

3. 解題步驟：
   - 定義一個 DFS 函數，計算節點的高度。
   - 如果節點為空，返回高度 0。
   - 遞歸計算左右子樹的高度。
   - 如果左右子樹高度差超過 1，返回 -1 表示不平衡。
   - 返回當前節點的高度。

重點筆記：
1. **深度優先搜索（DFS）的使用**:
   - 使用 DFS 來計算每個節點的高度。
   - 在計算高度的同時，檢查平衡性。

2. **時間複雜度**:
   - O(n)，其中 n 是樹的節點數量。
   - 每個節點只被訪問一次。

3. **空間複雜度**:
   - O(h)，其中 h 是樹的高度。
   - 遞歸調用棧的空間開銷。

4. **適用場景**:
   - 適用於需要檢查樹的平衡性的場景。
   - 例如 AVL 樹的平衡檢查。

範例解析：
- 輸入：root = [1, None, 2, None, 3]
- 樹的結構：
Root: 1
R--- 2
R--- 3

复制
- 過程：
- 節點 3 的高度為 1。
- 節點 2 的高度為 2。
- 節點 1 的高度為 3。
- 節點 1 的左右子樹高度差為 2，超過 1，返回 False。
- 輸出：False

函式功能說明：
- `class TreeNode`：定義樹節點的結構，包含值和左右子節點引用。
- `list_to_tree(values)`：將列表轉換為二叉樹。
- `print_tree_as_structure(node, level, prefix)`：以可視化方式打印樹結構。
- `class Solution`：封裝解決方案的類。
- `isBalanced(root)`：檢查二叉樹是否平衡。
- `dfs(node)`：深度優先搜索的輔助函數，用於計算節點高度並檢查平衡性。
'''