from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right

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

class Solution:
    def findSecondMinimumValue(self, root: Optional[TreeNode]) -> int:
        if not root: #沒有根節點直接-1
            return -1
        if not root.left and not root.right: #只有根結點也-1
            return -1
        min_val = root.val #題目說的，基本上根結點會是最小值
        self.second_val = float('inf')
        def dfs(root):
            if not root:
                return 
            if min_val < root.val < self.second_val: #尋找第二小的節點
                self.second_val = root.val
            dfs(root.left)
            dfs(root.right)
        
        dfs(root) #尋找第二小的節點
        if self.second_val == float('inf'): #沒有第二小的節點就回-1
            return -1
        return  self.second_val

'''
靠邀 我做錯好幾次
這題就是尋找第二小的節點
本來我的想法是想說把每個元素取出來再放到heap當中
比對前面兩個值，長的一樣就回-1

但是題目的tag是dfs跟tree
'''



root = [2,2,5,None,None,5,7]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(solution.findSecondMinimumValue(tree_root))   