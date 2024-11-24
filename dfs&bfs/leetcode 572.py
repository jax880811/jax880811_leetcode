from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution:
    def dfs(self,root,subRoot):
        if not root and not subRoot:
            return True
        if root.left == subRoot.left and root.right == subRoot.right:
            self.dfs(root.left,subRoot.left)
            self.dfs(root.right,subRoot.right)
        return False
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if root is None and subRoot is None:
            return True
        elif root is None and subRoot is not None:
            return 
        if root.val == subRoot.val:
            if self.dfs(root,subRoot):
                return True
        self.isSubtree(root.left,subRoot)
        self.isSubtree(root.right,subRoot)
        
        return False

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