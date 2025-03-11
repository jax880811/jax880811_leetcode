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

'''
LeetCode 206: 反轉鏈表

題目翻譯：
給定一個單鏈表的頭節點 `head`，請將其反轉並返回反轉後的鏈表的頭節點。

題目需求：
1. 反轉單鏈表。
2. 需要考慮時間和空間複雜度。

解題思路與拆解：
1. 問題分析：
   - 核心問題是將單鏈表反轉。
   - 可以使用迭代法來解決。

2. 解題方法選擇：
   - 方法一：迭代法（本解法採用）- 時間 O(N)，空間 O(1)
   - 方法二：遞歸法 - 時間 O(N)，空間 O(N)

3. 解題步驟：
   - 初始化兩個指針 `node` 和 `temp`，分別用於存儲前一個節點和當前節點。
   - 遍歷鏈表，將當前節點的 `next` 指向前一個節點，實現反轉。
   - 移動指針，繼續處理下一個節點。
   - 遍歷結束後，返回反轉後的鏈表的頭節點。

重點筆記：
1. **指針的使用**:
   - `node`：用於存儲前一個節點。
   - `temp`：用於遍歷鏈表的指針。

2. **時間複雜度**:
   - 只需遍歷鏈表一次，時間複雜度為 O(N)，其中 N 是鏈表的長度。

3. **空間複雜度**:
   - 只使用了常數級別的額外空間，空間複雜度為 O(1)。

4. **適用場景**:
   - 適合處理單鏈表的反轉問題，例如：反轉鏈表、反轉部分鏈表等。

範例解析：
- 輸入：head = [1, 2, 3, 4, 5]
- 過程：
  - 初始化 `node = None`，`temp = 1`。
  - 第一次迭代：
    - `next_node = 2`
    - `1 -> None`
    - `node = 1`
    - `temp = 2`
  - 第二次迭代：
    - `next_node = 3`
    - `2 -> 1`
    - `node = 2`
    - `temp = 3`
  - 依此類推，直到鏈表反轉完成。
- 輸出：5 -> 4 -> 3 -> 2 -> 1

函式功能說明：
- `class ListNode`：定義鏈表的節點。
- `def list_to_linkedlist`：將列表轉換為鏈表。
- `class Solution`：定義一個解決方案類別，用於封裝問題的解決方法。
- `def reverseList`：定義一個方法，用於反轉鏈表。
- `node = None`：初始化前一個節點為 `None`。
- `temp = head`：初始化當前節點為 `head`。
- `while temp`：遍歷鏈表。
- `next_node = temp.next`：暫存下一個節點。
- `temp.next = node`：反轉當前節點的 `next` 指針。
- `node = temp`：移動 `node` 到當前節點。
- `temp = next_node`：移動 `temp` 到下一個節點。
- `return node`：返回反轉後的鏈表的頭節點。
- `print()`：將結果輸出到控制台。
'''