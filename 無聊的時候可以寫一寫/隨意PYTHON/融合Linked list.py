'''
兩個維修批次分別以單向鏈結串列（Singly Linked List）保存工單優先值，
且每一串列均已由小到大排序。請設計 merge_sorted_lists(head_a, head_b)，
將兩個串列合併為一個由小到大排列的串列。

限制：除一個輔助的假節點外，不得為原有資料建立新節點；必須重接原節點。若兩節點值相同，A 串列的節點應排在 B 串列的節點之前。
說明合併過程應維持的核心不變量。（4 分）
以 Python 3 或語意清楚的虛擬碼實作函式。（10 分）
分析時間與額外空間複雜度，並說明空串列如何處理。（4 分）
'''
def merge_sorted_lists(head_a, head_b):
    node = ListNode()
    temp = node
    while head_a and head_b:
        if head_a.val <= head_b.val:
            temp.next = head_a
            head_a = head_a.next
        else:
            temp.next = head_b
            head_b = head_b.next
        temp = temp.next
    if head_a:
        temp.next = head_a
    if head_b:
        temp.next = head_b
    return node.next
'''
def merge_sorted_lists(head_a, head_b):
    # 建立一個輔助假節點
    # 題目允許使用一個 dummy node
    node = ListNode()

    # temp 永遠指向目前已合併串列的最後一個節點
    temp = node

    # 只要 A、B 兩個串列目前都還有節點
    # 就比較兩邊目前的頭節點
    while head_a and head_b:

        # 若 A 的值小於或等於 B 的值
        # 相等時優先取 A，符合題目要求
        if head_a.val <= head_b.val:

            # 將 A 目前節點接到結果串列尾端
            temp.next = head_a

            # A 的指標往下一個節點移動
            head_a = head_a.next

        else:
            # 若 B 的值比較小
            # 將 B 目前節點接到結果串列尾端
            temp.next = head_b

            # B 的指標往下一個節點移動
            head_b = head_b.next

        # temp 移動到剛才接上的節點
        # 繼續維持「temp 指向結果串列尾端」
        temp = temp.next

    # 若 A 還有剩餘節點
    # 因為 A 本身已經排序完成，
    # 可以直接把剩餘整串接到結果尾端
    if head_a:
        temp.next = head_a

    # 若 B 還有剩餘節點
    # 同理直接把剩餘整串接到結果尾端
    if head_b:
        temp.next = head_b

    # node 是假節點，不是真正資料的一部分
    # 所以真正合併後的頭節點是 node.next
    return node.next
'''

'''
遞迴法
def merge_sorted_lists(head_a, head_b):
    if not head_a:
        return head_b
    if not head_b:
        return head_a
    if head_a.val <= head_b.val:
        head_a.next = merge_sorted_lists(head_a.next, head_b)
        return head_a
    else :
        head_b.next = merge_sorted_lists(head_a, head_b.next)
        return head_b
----------------------------------------
def merge_sorted_lists(head_a, head_b):
    # 如果 A 串列為空，
    # 代表只剩下 B 串列，直接回傳 B
    if not head_a:
        return head_b

    # 如果 B 串列為空，
    # 代表只剩下 A 串列，直接回傳 A
    if not head_b:
        return head_a

    # 若 A 目前節點的值小於或等於 B 目前節點的值
    # 相等時優先選 A，符合題目要求
    if head_a.val <= head_b.val:

        # 將 A 目前節點的下一個位置，
        # 接到「A 剩餘串列」與「完整 B 串列」合併後的結果
        head_a.next = merge_sorted_lists(head_a.next, head_b)

        # 回傳目前較小的 A 節點，作為這一段串列的頭
        return head_a

    else:
        # 若 B 目前節點比較小，
        # 將 B 目前節點的下一個位置，
        # 接到「完整 A 串列」與「B 剩餘串列」合併後的結果
        head_b.next = merge_sorted_lists(head_a, head_b.next)

        # 回傳目前較小的 B 節點，作為這一段串列的頭
        return head_b
'''