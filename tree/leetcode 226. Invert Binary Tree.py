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

class Solution:
    def invertTree(self, root):
        def invert(node):
            if node is None:
                return None
            
            # 交換左右子節點
            node.left, node.right = node.right, node.left
            
            # 遞迴反轉左右子樹
            invert(node.left)
            invert(node.right)
            
            return node
        return invert(root)
        

# 測試範例
root = [4,2,7,1,3,6,9]
tree_root = list_to_tree(root)
print_tree_as_structure(tree_root)
solution = Solution()
print(solution.invertTree(tree_root))