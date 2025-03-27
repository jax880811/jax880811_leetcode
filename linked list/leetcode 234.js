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
    /**
     * 判斷鏈結串列是否為回文結構
     * @param {ListNode} head 鏈結串列頭節點
     * @returns {boolean}
     */
    isPalindrome(head) {
        // 邊界條件處理：空鏈表或單節點直接返回 true
        if (!head || !head.next) return true;

        // 階段1: 用快慢指針找到鏈表中點
        let slow = head, fast = head;
        while (fast.next && fast.next.next) {  // 快指針每次走兩步
            slow = slow.next;                  // 慢指針每次走一步
            fast = fast.next.next;
        }

        // 階段2: 反轉後半部分鏈表
        let prev = null, curr = slow.next;     // curr從中點的下一個開始
        while (curr) {
            const temp = curr.next;            // 暫存下一個節點
            curr.next = prev;                  // 反轉指向
            prev = curr;                       // 移動prev指針
            curr = temp;                       // 移動curr指針
        }

        // 階段3: 比較前半和反轉後的後半部分
        let left = head, right = prev;
        while (right) {                        // 只需比較後半部分長度
            if (left.val !== right.val) return false;
            left = left.next;
            right = right.next;
        }
        return true;
    }
}

/*------------------------ 測試區塊 ------------------------*/
const testCase = [1, 2, 2, 1];
const head = listToLinkedList(testCase);
const solution = new Solution();
console.log(`回文判斷結果: ${solution.isPalindrome(head)}`);  // 輸出: true

/*
# LeetCode 234: Palindrome Linked List 詳細解析

## 問題本質
驗證鏈表是否從前向後和從後向前的節點序列完全相同，核心操作包含：
1. **找中點**：將鏈表分為前後兩半
2. **反轉後半**：創造反向遍歷條件
3. **雙向比對**：模擬從兩端向中間比較

## 關鍵技術點
### 快慢指針找中點
- **快指針**：每次走兩步 (fast.next.next)
- **慢指針**：每次走一步 (slow.next)
- **停止條件**：快指針無法再走兩步時，慢指針位於前半部末端

### 鏈表部分反轉
- **反轉範圍**：只反轉後半部分節點
- **操作技巧**：經典三指針法 (prev, curr, temp)
- **終止條件**：curr 走完後半部分

### 節點值比較
- **左指針**：從頭部開始 (head)
- **右指針**：從反轉後的後半部頭節點開始 (prev)
- **終止條件**：右指針走完後半部 (不需處理奇數長度的中間節點)

## 複雜度分析
| 維度 | 數值 | 說明 |
|------|------|------|
| 時間 | O(n) | 找中點 O(n) + 反轉 O(n) + 比較 O(n) |
| 空間 | O(1) | 只使用固定數量指針 |

## 進階討論
### 奇數長度處理
當鏈表長度為奇數時，中間節點不參與比較。例如：
輸入 [1,2,3,2,1]
- 慢指針停在 2 (前半部 [1,2])
- 反轉後半部 [3,2,1] → [1,2,3]
- 比較時忽略中間的 3

### 空間換時間解法
將節點值存入陣列後用雙指針比較：
```javascript
function isPalindromeWithArray(head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    let left = 0, right = arr.length - 1;
    while (left < right) {
        if (arr[left] !== arr[right]) return false;
        left++;
        right--;
    }
    return true;
}
優點：代碼簡單

缺點：空間複雜度 O(n)
*/