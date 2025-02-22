from typing import Optional
from typing import List
#Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def countNodes(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1+self.countNodes(root.left)+self.countNodes(root.right)



root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
root.right.left = TreeNode(6)
solution = Solution()
print(solution.countNodes(root))

'''這題是要算出這棵樹一共有多少個節點
那麼就用直接向左向右去遍歷即可
若為空 則回傳0
若有值就回傳 1+左邊所擁有的節點(root.left)+右邊所擁有的節點(root.right)
'''