from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        answer = float('inf')#預設無限大
        inorder_array = []
        def inorder(root):
            if not root:
                return
            inorder(root.left)
            inorder_array.append(root.val)
            inorder(root.right)
        inorder(root)
        for i in range(1,len(inorder_array)):
            answer = min(answer,inorder_array[i]-inorder_array[i-1])
        return answer     
'''
二元搜尋樹的特性為所有在左邊的節點都小於根結點，所有在右邊的節點都大於根結點
利用中序排序法對二元搜尋樹做重新排序，可以排出從最小到最大的陣列
處理完之後，就重新進行比對，進行每個元素之間的比對，找出最小值
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
print(solution.getMinimumDifference(tree_root))