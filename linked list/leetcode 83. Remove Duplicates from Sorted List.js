// 定義鏈結串列節點類別
class ListNode {
    /**
     * @param {number} [val=0] - 節點值
     * @param {ListNode|null} [next=null] - 下一個節點
     */
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }

    /** 方便打印鏈結串列 */
    toString() {
        let result = [];
        let current = this;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result.join(" -> ");
    }
}

/**
 * 將陣列轉換為鏈結串列
 * @param {number[]} elements - 輸入陣列
 * @returns {ListNode|null} 鏈結串列頭節點
 */
function listToLinkedList(elements) {
    let dummy = new ListNode();
    let current = dummy;
    for (let element of elements) {
        current.next = new ListNode(element);
        current = current.next;
    }
    return dummy.next;
}

class Solution {
    
    deleteDuplicates = function(head) {
        // 如果鏈結串列為空，直接返回空鏈結串列
        if (!head){
            return head;
        }
        // 使用 first 指向鏈結串列的頭部，用於最後返回
        let first = head;
        // 遍歷鏈結串列，直到當前節點的下一個節點為空
        while(head.next){
            // 如果當前節點的值等於下一個節點的值，說明存在重複元素
            if (head.val === head.next.val){
                // 將當前節點的 next 指針指向下下個節點，跳過重複的下一個節點
                head.next = head.next.next;
            }
            // 如果當前節點的值不等於下一個節點的值，說明沒有重複，將 head 指針移動到下一個節點
            else{
                head = head.next;
            }
        }
        // 返回原始鏈結串列的頭部
        return first;
    }
}


//自己有做出來

/*------------------------ 測試區塊 ------------------------*/
const testCase = [1,1,2,3,3];
const head = listToLinkedList(testCase);
const solution = new Solution();
console.log(solution.deleteDuplicates(head)); 

/*
LeetCode 83: 移除重複節點 (Remove Duplicates from Sorted List) (Node.js 實現)

題目翻譯：
給定一個已排序的鏈結串列的頭部，刪除所有重複的節點，使得每個元素只出現一次。返回已排序的鏈結串列。

題目需求：
1. 移除已排序鏈結串列中的所有重複節點。
2. 保持鏈結串列的排序。
3. 每個元素在結果鏈結串列中只出現一次。

解題思路與拆解：
1. 問題分析：
   - 鏈結串列已經排序，這意味著重複的節點會彼此相鄰。
   - 我們需要遍歷鏈結串列，並比較相鄰的節點。
   - 如果發現相鄰節點的值相同，則需要將重複的節點從鏈結串列中移除。

2. 解題方法選擇：
   - 方法一：迭代 (Iterative) (本解法採用) - 時間 O(N)，空間 O(1)

3. 解題步驟 (迭代方法)：
   - 檢查鏈結串列是否為空 (`head` 是否為 `null` 或 `undefined`)。如果為空，則直接返回空鏈結串列。
   - 使用一個指針（這裡直接使用 `head`）遍歷鏈結串列。
   - 在遍歷過程中，比較當前節點的值和下一個節點的值。
   - 如果當前節點的值等於下一個節點的值，則說明下一個節點是重複的。將當前節點的 `next` 指針指向下下個節點，從而跳過重複的節點。
   - 如果當前節點的值不等於下一個節點的值，則說明沒有重複，將指針移動到下一個節點。
   - 為了返回原始鏈結串列的頭部，我們在開始遍歷之前使用 `first` 變數保存了原始的 `head`。
   - 當遍歷完成後，返回 `first`。

重點筆記：
1. **鏈結串列遍歷**: 使用 `while` 迴圈和 `next` 指針遍歷鏈結串列。
2. **原地修改**: 我們直接在原鏈結串列上進行修改，沒有創建新的鏈結串列，因此空間複雜度是 O(1)。
3. **已排序的特性**: 鏈結串列已排序是這個解法的關鍵，因為重複的元素會相鄰出現。
4. **邊界條件**: 需要考慮鏈結串列為空的情況。

範例解析 (testCase = [1,1,2,3,3]):
- 創建鏈結串列：1 -> 1 -> 2 -> 3 -> 3
- `head` 指向第一個節點 (值為 1)，`first` 也指向它。
- 迴圈開始：
  - 當前節點值為 1，下一個節點值為 1 (相等)。將 `head.next` 指向下下個節點 (值為 2)。鏈結串列變為 1 -> 2 -> 3 -> 3，`head` 仍然指向第一個節點。
  - `head` 指向的節點值為 1，下一個節點值為 2 (不相等)。將 `head` 移動到下一個節點 (值為 2)。
  - 當前節點值為 2，下一個節點值為 3 (不相等)。將 `head` 移動到下一個節點 (值為 3)。
  - 當前節點值為 3，下一個節點值為 3 (相等)。將 `head.next` 指向下下個節點 (為 `null`)。鏈結串列變為 1 -> 2 -> 3，`head` 仍然指向值為 3 的節點。
  - `head.next` 為 `null`，迴圈結束。
- 返回 `first`，指向修改後的鏈結串列的頭部：1 -> 2 -> 3。

函式功能說明 (已移動到程式碼的行內註解):
- `class ListNode`: 定義鏈結串列節點類別，包含 `val` (節點值) 和 `next` (指向下一個節點的指針)。
- `constructor(val = 0, next = null)`: 鏈結串列節點的建構子，用於創建新的節點。
- `toString()`: 方便打印鏈結串列的方法，將鏈結串列的值轉換為字串。
- `listToLinkedList(elements)`: 將一個數字陣列轉換為鏈結串列的輔助函式。
- `class Solution`: 定義解決方案類別。
- `deleteDuplicates(head)`: 移除已排序鏈結串列中重複節點的核心方法。
- `if (!head){ return head; }`: 如果鏈結串列為空，直接返回空鏈結串列。
- `let first = head;`: 保存鏈結串列的頭部。
- `while(head.next)`: 遍歷鏈結串列直到下一個節點為空。
- `if (head.val === head.next.val)`: 檢查當前節點和下一個節點的值是否相等。
- `head.next = head.next.next;`: 如果相等，跳過下一個節點。
- `else{ head = head.next; }`: 如果不相等，將 `head` 移動到下一個節點。
- `return first;`: 返回修改後的鏈結串列的頭部。
- `const testCase = [1,1,2,3,3];`: 定義測試案例陣列。
- `const head = listToLinkedList(testCase);`: 將測試案例陣列轉換為鏈結串列。
- `const solution = new Solution();`: 創建 Solution 實例。
- `console.log(solution.deleteDuplicates(head).toString());`: 調用方法並打印結果。
*/