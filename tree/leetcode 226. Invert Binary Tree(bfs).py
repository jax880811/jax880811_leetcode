
from collections import deque
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        # 初始化樹節點，設置值和左右子節點
        self.val = val
        self.left = left
        self.right = right

def list_to_tree(values):
    """
    將列表轉換為二叉樹
    :param values: 以層序遍歷表示的二叉樹列表
    :return: 樹的根節點
    """
    if not values or len(values) == 0:
        # 如果列表為空，返回 None
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

def print_tree_as_structure(node, level=0, prefix="Root: "):
    """
    以樹的形式打印二叉樹
    :param node: 當前節點
    :param level: 當前層級
    :param prefix: 節點前綴標記
    """
    if not node:
        return
    
    print(" " * (level * 4) + prefix + str(node.val))
    if node.left or node.right:  # 如果有子節點，繼續打印
        print_tree_as_structure(node.left, level + 1, "L--- ")
        print_tree_as_structure(node.right, level + 1, "R--- ")

def print_tree(node, level=0):
    if node:
        # 先印右子樹（這樣轉 90 度看才像樹）
        print_tree(node.right, level + 1)
        print(' ' * 4 * level + '->', node.val)
        # 再印左子樹
        print_tree(node.left, level + 1)

class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # 邊界條件：如果根節點為空，直接返回 None
        if not root:
            return None
        
        # 初始化雙端佇列 (deque)，並將根節點加入佇列
        # deque([root]) 等價於：queue = deque(); queue.append(root)
        queue = deque([root])
        
        # BFS 遍歷：當佇列不為空時繼續處理
        while queue:
            # 從佇列左側取出一個節點（先進先出，FIFO）
            # popleft() 會同時「讀取並移除」第一個元素
            node = queue.popleft()
            
            # 核心操作：交換當前節點的左右子節點
            # Python 的 tuple unpacking 技巧，一行完成交換
            node.left, node.right = node.right, node.left
            
            # 將交換後的子節點加入佇列，以便後續處理
            # 注意：此時 left 和 right 已經交換過了
            if node.left:  # 如果左子節點存在（原來的右子節點）
                queue.append(node.left)
            if node.right:  # 如果右子節點存在（原來的左子節點）
                queue.append(node.right)
        
        # 返回翻轉後的樹的根節點
        return root
        

# 測試範例
root = [4,2,7,1,3,6,9]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(solution.invertTree(tree_root))
print_tree(solution.invertTree(tree_root))
