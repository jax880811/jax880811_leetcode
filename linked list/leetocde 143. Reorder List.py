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
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head:
            return []
        slow ,fast =head , head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next 
        prev , curr = None,slow.next
        while curr: #從最後一個節點開始往回指，也就是指針的位置開始轉另一個方向
            temp = curr.next
            curr.next = prev
            prev = curr
            curr = temp
        slow.next = None #前後拆斷 分成兩個list
        head1 ,head2 = head , prev
        while head2: #已經分解成兩個List 一個list由小到大，另一個由大到小
            #接下來就是小list先指大list的第一個node，再從大List第一個node指向小list第二個node，以此類推
            temp = head1.next
            head1.next = head2
            head1 = head2
            head2 = temp
            
        return head

'''
給定一個單鏈表的頭節點 head，請將鏈表重新排列成以下形式：
1.原來的第一個節點。
2.原來的最後一個節點。
3.原來的第二個節點。
4.原來的倒數第二個節點。
以此類推。

換句話說，將鏈表從 L0 → L1 → L2 → … → Ln-1 → Ln 重新排列為 L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …。

題目的解法其實就是將原本的list拆解成兩個list
一個list由小到大，另一個由大到小
接下來就是小list先指大list的第一個node，再從大List第一個node指向小list第二個node，以此類推

可以用快跟慢指針
先把原本List後半的指向反轉過來
再從中間指定slow.next = None 將list一分為二
'''


head = list_to_linkedlist([1,2,3,4,5])
solution = Solution()
print(solution.reorderList(head))