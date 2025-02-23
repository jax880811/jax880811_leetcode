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
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        check = set()

        while head:
            if head in check:
                return True
            check.add(head)
            head = head.next

        return False

'''
遍尋所有的list
把所有出現的node值放入set當中
如果遊歷的過程中有發現一樣的node值在set當中出現的話
就代表環形結構存在
'''



head = list_to_linkedlist([3,2,0,-4])

solution = Solution()
print(solution.hasCycle(head))