from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution:
    def dfs(self,root,subRoot):
        if root is None and subRoot is None:#跑完root跟subroot都沒有節點，就代表確實是子節點
            return True
        if root is None or subRoot is  None or root.val != subRoot.val:#subroot或者root跑完或者目前的root值跟subroot對不起來，那就是錯誤，並非subroot
            return False
        return self.dfs(root.left,subRoot.left) and self.dfs(root.right,subRoot.right)
        
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if subRoot is None:
            return True
        if root is None:
            return False
        
        return self.dfs(root,subRoot) or self.isSubtree(root.left,subRoot) or self.isSubtree(root.right,subRoot)

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


root = [3,4,5,1,2]
subRoot = [4,1,2]
tree_root = list_to_tree(root)
tree_subroot = list_to_tree(subRoot)
print_tree_as_structure(tree_root)
print_tree_as_structure(tree_subroot)
solution = Solution()
print(solution.isSubtree(tree_root,tree_subroot))