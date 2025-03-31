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
    
    removeElements = function(head, val) {
        // 如果鏈結串列為空，直接返回空鏈結串列
        if (!head){
            return head;
        }
        // 創建一個虛擬頭節點 (dummy node)，方便處理頭部節點需要被刪除的情況
        let first = new ListNode();
        // 將虛擬頭節點的 next 指向原始鏈結串列的頭部
        first.next = head;
        // 使用 answer 指向虛擬頭節點，用於最後返回修改後的鏈結串列的頭部
        let answer = first;
        // 遍歷鏈結串列，直到當前節點 (first) 的下一個節點為空
        while(first.next){
            // 如果下一個節點的值等於給定的目標值 val
            if(first.next.val === val){
                // 將當前節點 (first) 的 next 指針指向下下個節點，從而跳過需要被刪除的下一個節點
                first.next = first.next.next;
            }
            // 如果下一個節點的值不等於目標值 val，則將 first 指針移動到下一個節點，繼續遍歷
            else{
                first = first.next;
            }
        }
        // 返回虛擬頭節點的 next，即修改後的鏈結串列的頭部
        return answer.next;
    }
}
//有自己做出來


/*------------------------ 測試區塊 ------------------------*/
const testCase = [1,2,6,3,4,5,6];
let val = 6;
const head = listToLinkedList(testCase);
const solution = new Solution();
console.log(solution.removeElements(head, val)); 
/*
LeetCode 203: 移除鏈結串列元素 (Remove Linked List Elements) (Node.js 實現)

題目翻譯：
給定一個鏈結串列的頭部和一個整數值 val，移除鏈結串列中所有值等於 val 的節點，並返回新的頭部。

題目需求：
1. 移除鏈結串列中所有值等於給定值 `val` 的節點。
2. 返回修改後的鏈結串列的頭部。

解題思路與拆解：
1. 問題分析：
   - 需要遍歷鏈結串列中的每個節點。
   - 如果節點的值等於目標值 `val`，則需要將該節點從鏈結串列中移除。
   - 需要特別注意頭部節點是否需要被移除的情況。

2. 解題方法選擇：
   - 方法一：迭代 (Iterative) (本解法採用) - 時間 O(N)，空間 O(1)

3. 解題步驟 (迭代方法 - 使用虛擬頭節點)：
   - 檢查鏈結串列是否為空 (`head` 是否為 `null` 或 `undefined`)。如果為空，則直接返回空鏈結串列。
   - 創建一個虛擬頭節點 (dummy node)。這個節點的值可以是任意的，它的主要作用是簡化對原始鏈結串列頭部的操作。
   - 將虛擬頭節點的 `next` 指針指向原始鏈結串列的頭部 `head`。
   - 使用一個指針 `first` 指向虛擬頭節點。我們將使用 `first` 來遍歷鏈結串列並進行節點的移除操作。
   - 使用 `answer` 指向虛擬頭節點，這樣我們可以在遍歷結束後通過 `answer.next` 獲取修改後的鏈結串列的頭部。
   - 使用 `while` 迴圈遍歷鏈結串列，條件是 `first.next` 不為空。
   - 在迴圈中，檢查 `first` 的下一個節點 (`first.next`) 的值是否等於目標值 `val`。
   - 如果相等，說明需要移除下一個節點。我們通過將 `first` 的 `next` 指針指向下下個節點 (`first.next.next`) 來實現移除。這樣就跳過了值為 `val` 的節點。
   - 如果不相等，說明下一個節點不需要被移除，我們將 `first` 指針移動到下一個節點 (`first = first.next`)，繼續遍歷。
   - 當迴圈結束時，所有值等於 `val` 的節點都已被移除。返回 `answer.next`，它是修改後的鏈結串列的頭部。

重點筆記：
1. **虛擬頭節點 (Dummy Node)**:
   - 使用虛擬頭節點可以簡化對鏈結串列頭部的操作，特別是當頭部節點需要被移除時，不需要額外的判斷。

2. **鏈結串列遍歷**: 使用 `while` 迴圈和 `next` 指針遍歷鏈結串列。

3. **原地修改**: 我們直接在原鏈結串列上進行修改，沒有創建新的鏈結串列，因此空間複雜度是 O(1)。

4. **邊界條件**: 需要考慮鏈結串列為空的情況。

範例解析 (testCase = [1,2,6,3,4,5,6], val = 6):
- 創建鏈結串列：1 -> 2 -> 6 -> 3 -> 4 -> 5 -> 6
- 創建虛擬頭節點 `first`，`first.next` 指向原始頭部 (1)。`answer` 也指向 `first`。
- 迴圈開始：
  - `first` 指向虛擬頭節點，`first.next` 的值為 1 (不等於 6)。`first` 移動到下一個節點 (值為 1)。
  - `first` 指向值為 1 的節點，`first.next` 的值為 2 (不等於 6)。`first` 移動到下一個節點 (值為 2)。
  - `first` 指向值為 2 的節點，`first.next` 的值為 6 (等於 6)。將 `first.next` 指向 `first.next.next` (值為 3 的節點)。鏈結串列變為 1 -> 2 -> 3 -> 4 -> 5 -> 6 (虛擬頭節點 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6)，`first` 仍然指向值為 2 的節點。
  - `first` 指向值為 2 的節點，`first.next` 的值為 3 (不等於 6)。`first` 移動到下一個節點 (值為 3)。
  - `first` 指向值為 3 的節點，`first.next` 的值為 4 (不等於 6)。`first` 移動到下一個節點 (值為 4)。
  - `first` 指向值為 4 的節點，`first.next` 的值為 5 (不等於 6)。`first` 移動到下一個節點 (值為 5)。
  - `first` 指向值為 5 的節點，`first.next` 的值為 6 (等於 6)。將 `first.next` 指向 `first.next.next` (為 `null`)。鏈結串列變為 1 -> 2 -> 3 -> 4 -> 5 (虛擬頭節點 -> 1 -> 2 -> 3 -> 4 -> 5)，`first` 仍然指向值為 5 的節點。
  - `first` 指向值為 5 的節點，`first.next` 為 `null`，迴圈結束。
- 返回 `answer.next`，指向修改後的鏈結串列的頭部：1 -> 2 -> 3 -> 4 -> 5。

函式功能說明 (已移動到程式碼的行內註解):
- `class ListNode`: 定義鏈結串列節點類別，包含 `val` (節點值) 和 `next` (指向下一個節點的指針)。
- `constructor(val = 0, next = null)`: 鏈結串列節點的建構子，用於創建新的節點。
- `toString()`: 方便打印鏈結串列的方法，將鏈結串列的值轉換為字串。
- `listToLinkedList(elements)`: 將一個數字陣列轉換為鏈結串列的輔助函式。
- `class Solution`: 定義解決方案類別。
- `removeElements(head, val)`: 移除鏈結串列中所有值等於 `val` 的節點的核心方法。
- `if (!head){ return head; }`: 如果鏈結串列為空，直接返回空鏈結串列。
- `let first = new ListNode();`: 創建虛擬頭節點。
- `first.next = head;`: 將虛擬頭節點的 next 指向原始鏈結串列的頭部。
- `let answer = first;`: 使用 answer 指向虛擬頭節點。
- `while(first.next)`: 遍歷鏈結串列直到下一個節點為空。
- `if(first.next.val === val)`: 檢查下一個節點的值是否等於目標值。
- `first.next = first.next.next;`: 如果相等，跳過下一個節點。
- `else{ first = first.next; }`: 如果不相等，將 `first` 移動到下一個節點。
- `return answer.next;`: 返回修改後的鏈結串列的頭部。
- `const testCase = [1,2,6,3,4,5,6];`: 定義測試案例陣列。
- `let val = 6;`: 定義要移除的值。
- `const head = listToLinkedList(testCase);`: 將測試案例陣列轉換為鏈結串列。
- `const solution = new Solution();`: 創建 Solution 實例。
- `console.log(solution.removeElements(head, val).toString());`: 調用方法並打印結果。
*/