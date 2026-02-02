from collections import deque
from typing import Optional




class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return 
        queue = deque([root])
        while queue:
            node = queue.popleft()
            node.left , node.right = node.right , node.left
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        return root
    
root = [4,2,7,1,3,6,9]
solution = Solution()
print(solution.invertTree(TreeNode(root)))