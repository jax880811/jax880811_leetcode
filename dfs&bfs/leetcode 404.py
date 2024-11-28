from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution:
    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:

        if not root:
            return 0
        answer = 0
        
        if root.left and not root.left.right and not root.left.left: #該根節點的左子節點存在，且這個左子節點並沒有其他的左右子節點，就可表示此為左葉節點
            answer += root.left.val
        
        answer += self.sumOfLeftLeaves(root.left)
        answer += self.sumOfLeftLeaves(root.right)
        return answer
'''
題目只需要找所有左葉節點的值的總和
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


root = [3,9,20,None,None,15,7]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(solution.sumOfLeftLeaves(tree_root))