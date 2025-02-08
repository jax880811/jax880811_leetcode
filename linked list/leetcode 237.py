from typing import Optional

class Solution:
    def deleteNode(self, node):
        """
        :type node: ListNode
        :rtype: void Do not return anything, modify node in-place instead.
        """
        node.val = node.next.val
        node.next = node.next.next

'''
一開始我是有點理解錯題目要怎麼實作
最一開始我是打算說遍歷所有的Listnode
然後找到需要找的node之後
再用node.val = node.next.val
node.next = node.next.next

沒想到這題目是直接這樣子做就可以了
'''

'''
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
    def deleteNode(self, node):
        if head.val == n:
            return head.next
        ans = ListNode()
        temp = ans
        while head:
            if head.val == n:
                head.val = head.next.val
                head.next = head.next.next
            print(head.val)
            temp.next = head
            temp = temp.next
            
            head = head.next
            
        return ans.next

        


head = list_to_linkedlist([4,5,1,9])
node = 1
solution = Solution()
print(solution.deleteNode(head,node))
'''