from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def issymmetric(p,q):
            if not p and not q:#如果都不存在，那一定是對稱，回傳true
                return True
            if not p or not q:#如果其中一個不存在，另一個存在，肯定非對稱，回傳false
                return False
            return p.val == q.val and issymmetric(p.left,q.right) and issymmetric(p.right,q.left)#父節點一致，左子節點等於另一邊的右子節點，右子節點等於另一邊的左子節點
        
        return issymmetric(root,root)
    
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


root_list = [1,2,2,None,3,None,3]
tree_root = list_to_tree(root_list)
solution = Solution()
print(solution.isSymmetric(tree_root))