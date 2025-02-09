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
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        node = None  #放置前一個節點
        temp = head  #作為head的指針來使用
        
        while temp:
            
            next_node = temp.next #先暫存下一個節點
            temp.next = node #反轉當前的指標指向 從往右指變成往左指  
            #意象圖大概是  本來是 node->1->2 反轉成 node<-1->2
            node = temp #移動放置的節點到目前的位置
            temp = next_node #把temp指針轉到下一個節點，不斷重複前面三行過程，把指著的方向反轉
        
        return node #最後node就會是新的頭節點

'''
簡單來說就是本來1 -> 2 -> 3 -> 4 -> 5
慢慢地轉成5 -> 4 -> 3 -> 2 -> 1
先虛擬一個node節點 把1指過來，先變成node <- 1 -> 2 -> 3 -> 4 -> 5
此時temp節點還指在1上，然後指到2上面後 在反轉成 node <- 1 <- 2 -> 3 -> 4 -> 5

如此反覆循環最終讓node成為反轉後的頭節點
'''

head = list_to_linkedlist([1,2,3,4,5])
solution = Solution()
print(solution.reverseList(head))