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
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return True
        slow , fast = head , head
        while fast.next and fast.next.next: #先把指針指向往中間靠攏
            slow = slow.next
            fast = fast.next.next
        prev = None
        curr = slow.next
        while curr:  #開始反轉順序，一開始只向中間，慢慢往最右邊指，然後把指向做反轉
            temp = curr.next 
            curr.next = prev
            prev = curr
            curr = temp
            
        left , right = head , prev
        while right: #從最右跟最左往中間收斂，一個不正確就回傳false
            if left.val!=right.val:
                return False
            left = left.next
            right = right.next 
        return True

'''
其實回文的本質 
就是從最左邊開始計算以及從最右邊開始計算
慢慢往中間靠攏，如果有一個文字不對稱，就不是回文
以linked list來說也是如此，但是要做到這個就是先變成
最左邊往中間繼續指，順序不便，但是從中間往右的節點則是改成向中間指，跟原本的指向相反
最後就能一個指針從最左邊開始指，另一個從最右邊，慢慢往中間收斂
'''
        



head = list_to_linkedlist([1,2,2,1])
solution = Solution()
print(solution.isPalindrome(head))