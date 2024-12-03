from typing import List
from typing import Optional
from functools import reduce
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right


class Solution:
    def __init__(self):
        self.answer = 0
    def list_to_int(self,node):
        return reduce(lambda x, y: x * 10 + y,node)
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        stack = []
        def list_to_int(node):
            return reduce(lambda x, y: x * 10 + y,node)
        def dfs(node):
            if not node:
                return
            stack.append(node.val)
            print(self.answer)
            if not node.left and not node.right:
                self.answer += self.list_to_int(stack)
            dfs(node.left)
            dfs(node.right)
            stack.pop()
        dfs(root)
            
        return self.answer

'''
此題目要不斷找出從最初的根結點到所有葉子節點之間所可能形成的路徑
並將這些可能的路徑變成數字，在做加總
我選擇的方法是使用深度優先的方式慢慢往下找到葉節點的路徑，並放入堆疊當中
一旦無法往下找了就把堆疊內的元素轉成數字在做總和
接著每當開始往上爬回去要尋找其他路徑的時候再pop掉堆疊當中的元素
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


root = [4,9,0,5,1]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(solution.sumNumbers(tree_root))          
