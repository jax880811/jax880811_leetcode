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
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        ans = ListNode()
        ans.next = head
        fast = slow = ans #創建雙重指針
        for i in range(n):
            fast = fast.next #快的指針先走n步
        while fast.next: #接下來快的指針到尾的時候，慢的指針就會指到了想要刪除的前一個點
            fast = fast.next
            slow = slow.next
        
        slow.next = slow.next.next #想要刪除的點就在這裡，把指針指向的這個點移到更下一步的點，就能刪除目標點
        return ans.next

'''
這題最佳解法是用雙指針的方式
先讓一個指針快速前進n步
然後慢的指針再隨著快的指針到底後，就會指到必須要刪掉的點的前一個點
接下來就是把本來指向下一個點(需要被刪除的點)，指向下下一個點，達成刪除的動作
'''

head = list_to_linkedlist([1,2,3,4,5])
n = 2

solution = Solution()
print(solution.removeNthFromEnd(head,n))