from typing import Optional

# 定義 ListNode 類別
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    # 為了方便打印，加入一個 __str__ 方法
    def __str__(self):
        result = []
        current = self
        while current:
            result.append(str(current.val))
            current = current.next
        return " -> ".join(result)
    
def list_to_linkedlist(elements):
    dummy = ListNode()
    current = dummy
    for element in elements:
        current.next = ListNode(element)
        current = current.next
    return dummy.next
    
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if not list1:
            return list2
        elif not list2:
            return list1
        
        temp = ListNode()
        current = temp
        while list1 and list2: 
            if list1.val<list2.val: #如果list1.val值比較小，就先放進去融合後的linked list
                current.next = list1
                list1 = list1.next
            else:
                current.next = list2
                list2 = list2.next
            current = current.next
        if list1:
            current.next = list1
        if list2:
            current.next = list2

                
        return temp.next

'''
這題目基本上就是每個節點都進行比對
如果目前List1或者list2的節點數值比較小，就先放進去融合後的串列
最後再檢查list1或者list2有沒有其他節點還沒有放進去的 再逐步放進去

時間複雜度： O(m+n)
m 和 n 分別是 list1 和 list2 的長度。
每個節點最多被訪問一次並插入到新的鏈表，因此總共遍歷 O(m+n) 次。
空間複雜度： O(1)
只使用了額外的 temp 和 current 指針，並沒有創建新的節點，所有節點都來自於輸入的鏈表，所以是 常數空間。
'''

#list1 = [1,2,4]
#list2 = [1,3,4]
list1 = list_to_linkedlist([1, 2, 4])
list2 = list_to_linkedlist([1, 3, 4])
solution = Solution()
print(solution.mergeTwoLists(list1,list2))
