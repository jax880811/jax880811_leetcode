from typing import List
from typing import Optional
class TreeNode:
     def __init__(self, val=0, left=None, right=None):
         self.val = val
         self.left = left
         self.right = right


class Solution:
    def findMode(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return 0
        inorder_array = []
        def inorder(root):
            if not root:
                return
            inorder(root.left)
            inorder_array.append(root.val)
            inorder(root.right)
        inorder(root)
        current_count = 1
        max_count = 0
        answer = []
        for i in range(len(inorder_array)):
            if inorder_array[i] == inorder_array[i-1]:
                current_count += 1
            else:
                current_count = 1
            if current_count>max_count:
                max_count = current_count
                answer = [inorder_array[i]]
            elif current_count==max_count:
                answer.append(inorder_array[i])
        return answer
'''
題目要找出該二園搜尋樹當中出現最多次的元素
先進行中序法進行排序，即可從小到大排序出來
根據排序的結果一一比對，尋找出最多次出現的元素
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
print(solution.findMode(tree_root))