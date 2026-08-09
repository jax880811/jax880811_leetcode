'''
單向鏈結串列（Singly Linked List）每個節點包含整數 value 與下一節點指標 next。
給定串列首節點 head 與整數 x，請將所有小於 x 的節點移到前段，其餘節點移到後段；
兩組節點內部的原始相對順序必須保持不變。

不得建立新的資料節點，不得將所有值複製到陣列後排序；可使用固定數量的假節點與指標。

說明如何維護前段與後段兩條暫存串列。（4 分）
實作 stablePartition(head, x)。（11 分）
分析時間與額外空間複雜度。（3 分）
例：1 → 4 → 3 → 2 → 5 → 2，x = 3，結果為 1 → 2 → 2 → 4 → 3 → 5。
'''

class Node:
    # 定義單向鏈結串列節點
    def __init__(self, value):
        # 儲存節點的資料值
        self.value = value

        # 指向下一個節點
        self.next = None


def stablePartition(head, x):
    # 若原串列為空，直接回傳 None
    if not head:
        return None

    # 建立「小於 x」串列的假節點
    small_node = Node(0)

    # 建立「大於等於 x」串列的假節點
    large_node = Node(0)

    # small_tail 永遠指向小於 x 串列目前的最後一個節點
    small_tail = small_node

    # large_tail 永遠指向大於等於 x 串列目前的最後一個節點
    large_tail = large_node

    # current 從原始串列頭節點開始走訪
    current = head

    # 逐一處理原始串列的每個節點
    while current:

        # 先保存原本的下一個節點
        # 因為等等會修改 current.next
        next_node = current.next

        # 切斷目前節點原本的連結
        # 避免留下舊串列的 next 關係
        current.next = None

        # 若目前節點的值小於 x
        if current.value < x:

            # 將目前節點接到 small 串列尾端
            small_tail.next = current

            # 更新 small_tail，使其指向新的最後節點
            small_tail = current

        else:
            # 若目前節點的值大於或等於 x，
            # 將它接到 large 串列尾端
            large_tail.next = current

            # 更新 large_tail
            large_tail = current

        # 移動到原串列的下一個節點
        current = next_node

    # 將「小於 x」串列的尾端
    # 接到「大於等於 x」串列真正的第一個節點
    small_tail.next = large_node.next

    # small_node 是假節點，
    # 所以真正結果從 small_node.next 開始
    return small_node.next



'''
class Node:                                      # 定義單向鏈結串列節點
    def __init__(self, value):                  # 建立節點時接收資料值
        self.value = value                     # 儲存節點資料
        self.next = None   

def stablePartition(head, x):
    if not head:
        return
    small_node = Node(0)
    large_node = Node(0)
    small_tail = small_node
    large_tail = large_node
    current = head
    while current:
        next_node = current.next
        current.next = None
        if current.value < x:
            small_tail.next = current
            small_tail = current
        else:
            large_tail.next = current
            large_tail = current
        current = next_node
    small_tail.next = large_node.next
    return small_node.next
 '''