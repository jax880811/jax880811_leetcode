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
    def dfs(self , root):
        if not root:
            return 0
        left_height = self.dfs(root.left)
        right_height = self.dfs(root.right)

        if left_height == -1 or right_height == -1 or abs(left_height - right_height) > 1:
            return -1
        
        return 1+max(left_height , right_height)
    


    def isBalanced(self, root: TreeNode) -> bool:
        if not root:
            return True

        return self.dfs(root) != -1


# 測試範例
if __name__ == "__main__":
    root = root = [1,2,2,3,3,None,None,4,4]
    tree_root = list_to_tree(root)
    print_tree_as_structure(tree_root)
    solution = Solution()
    print(solution.isBalanced(tree_root)) 