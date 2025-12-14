def is_balance(self, node):
    # 線性時間 O(n) 判斷是否為 AVL：
    # 使用後序遍歷；若子樹不平衡，回傳 -1 作為哨兵值，向上即時剪枝。
    def helper(n):
        if n is None:
            return 0
        left_height = helper(n.left)
        if left_height == -1:
            return -1
        right_height = helper(n.right)
        if right_height == -1:
            return -1
        if abs(left_height - right_height) > 1:
            return -1
        return max(left_height, right_height) + 1

    return helper(node) != -1

'''
判斷一棵二元樹是否為AVL樹
'''

def is_avl(root):
    # 同功能的無 self 版本，方便直接呼叫
    def dfs(n):
        if n is None:
            return 0
        lh = dfs(n.left)
        if lh == -1:
            return -1
        rh = dfs(n.right)
        if rh == -1:
            return -1
        if abs(lh - rh) > 1:
            return -1
        return max(lh, rh) + 1

    return dfs(root) != -1

'''
此兩線性鏈結串列，分別由指標plist1與plist2指在串列首，請完成下列
程式片段，將plist2所指串列接在plist1所指串列後面。
'''

def connect(plist1, plist2):
    if plist1 is None:
        return plist2
    current = plist1
    while current.next is not None:
        current = current.next
    current.next = plist2
    return plist1
'''
我們欲將所管理的鍵值（Key）依序列出，請問是否可以利用一個AVL
樹對鍵值來進行排序（Sorting）？若不行，請說明原因；如果可以，請
描述方法及時間複雜度。（5分）


可以，avl tree本質上就是一個高度平衡的二元搜尋樹，對鍵值進行中序遍歷即可得到排序後的鍵值序列。
'''
def avl_sort(avl_root):
    result = []
    
    def inorder_traversal(node):
        if node is not None:
            inorder_traversal(node.left)
            result.append(node.key)
            inorder_traversal(node.right)
    
    inorder_traversal(avl_root)
    return result

'''
一、假設  
 1:
 A n是一個矩陣，存有n個不同的整數，且已依序從小到大排列。
給定一個整數s，設計一個線性時間（lineartime）的演算法，找出在  
中是否存在兩個相異之  
 A i 和  
 A j ，使得    
 
 A i A j s
 A n
 1:
  。若存在，則印出
任一組符合條件之i和j；若不存在，則印出0。（須詳述或證明所設計程
式之正確性及其計算複雜度，否則不計分）（25分）
'''
def find_pair_with_sum(A, s):
    left = 0
    right = len(A) - 1
    
    while left < right:
        current_sum = A[left] + A[right]
        if current_sum == s:
            return (left, right)
        elif current_sum < s:
            left += 1
        else:
            right -= 1
            
    return 0

def find_pair_with_sum_hash(A, s):
    seen = {}  # value -> index
    for i, x in enumerate(A):
        comp = s - x
        if comp in seen:
            return (seen[comp], i)   # 找到一組索引
        seen[x] = i
    return 0