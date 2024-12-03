from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        first = second = prev = None
        def inorder(node):
            nonlocal first, second, prev
            if not node:
                return
            inorder(node.left)

            # 找到錯誤的節點
            if prev and prev.val > node.val:
                if not first:
                    first = prev  # 第一次找到逆序對，記錄第一個節點
                second = node  # 每次更新第二個節點

            prev = node  # 更新前一個節點
            
            inorder(node.right)

        inorder(root)

        # 恢復 BST，交換兩個節點的值
        first.val, second.val = second.val, first.val

'''
此題要找出二元搜尋樹當中，有兩個節點的順序有問題必須做交換
那就要根據二元搜尋樹的特性，向左尋找，跟根節點做比對，左節點就是prev，接著再繼續跟根節點比對
若左節點大於根節點就在往更上層的根結點去層層比對
接著再向右尋找，此時prev就變成了根結點，若根節點大於右子節點也不對，就必須繼續往右探詢下去
找到要互換的值，再進行交換
'''

def list_to_tree(values: List[Optional[int]]) -> Optional[TreeNode]:
    if not values:  # 如果列表為空，返回 None
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
def print_tree_as_structure(node: Optional[TreeNode], level=0, prefix="Root: "):
    """
    以樹的形式打印二叉樹。
    """
    if not node:
        return
    print(" " * (level * 4) + prefix + str(node.val))
    if node.left or node.right:  # 如果有子節點，繼續打印
        print_tree_as_structure(node.left, level + 1, "L--- ")
        print_tree_as_structure(node.right, level + 1, "R--- ")


root = [3,1,4,None,None,2]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(solution.recoverTree(tree_root))        