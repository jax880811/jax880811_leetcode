// 定義 ListNode 類別
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }

    // 為了方便打印，加入一個 toString 方法
    toString() {
        const result = [];
        let current = this;
        while (current) {
            result.push(String(current.val));
            current = current.next;
        }
        return result.join(" -> ");
    }
}

// 將陣列轉換為鏈表的輔助函數
function listToLinkedList(elements) {
    const dummy = new ListNode();
    let current = dummy;
    for (const element of elements) {
        current.next = new ListNode(element);
        current = current.next;
    }
    return dummy.next;
}

// 解決方案類別
class Solution {
    reverseList(head) {
        let node = null; // 放置前一個節點
        let temp = head; // 作為 head 的指針使用

        while (temp) {
            const nextNode = temp.next; // 先暫存下一個節點
            temp.next = node; // 反轉當前的指標指向，從往右指變成往左指
            // 意象圖：本來是 node -> 1 -> 2，反轉成 node <- 1 -> 2
            node = temp; // 移動放置的節點到目前的位置
            temp = nextNode; // 把 temp 指針轉到下一個節點，重複反轉過程
        }

        return node; // 最後 node 會是新的頭節點
    }
}

/*
簡單來說：
本來是 1 -> 2 -> 3 -> 4 -> 5
慢慢轉成 5 -> 4 -> 3 -> 2 -> 1
先虛擬一個 node 節點，把 1 指過來，變成 node <- 1 -> 2 -> 3 -> 4 -> 5
此時 temp 節點還在 1 上，然後移到 2 上，反轉成 node <- 1 <- 2 -> 3 -> 4 -> 5
如此反覆循環，最終讓 node 成為反轉後的頭節點
*/

// 測試程式碼
const head = listToLinkedList([1, 2, 3, 4, 5]);
const solution = new Solution();
const reversedList = solution.reverseList(head);
console.log(reversedList.toString()); // 輸出：5 -> 4 -> 3 -> 2 -> 1

/*
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
   - 初始化兩個指針 `node` 和 `temp`，分別用於儲存前一個節點和當前節點。
   - 遍歷鏈表，將當前節點的 `next` 指向前一個節點，實現反轉。
   - 移動指針，繼續處理下一個節點。
   - 遍歷結束後，返回反轉後的鏈表的頭節點。

重點筆記：
1. **指針的使用**:
   - `node`：用於儲存前一個節點。
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
  - 初始化 `node = null`，`temp = 1`。
  - 第一次迭代：
    - `nextNode = 2`
    - `1 -> null`
    - `node = 1`
    - `temp = 2`
  - 第二次迭代：
    - `nextNode = 3`
    - `2 -> 1`
    - `node = 2`
    - `temp = 3`
  - 依此類推，直到鏈表反轉完成。
- 輸出：5 -> 4 -> 3 -> 2 -> 1
*/