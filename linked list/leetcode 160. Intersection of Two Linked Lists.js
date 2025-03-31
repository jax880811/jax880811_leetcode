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
    
    getIntersectionNode = function(headA, headB) {
        // 創建兩個指針分別指向兩個鏈表頭部
        let pointerA = headA;
        let pointerB = headB;

        // 當兩個指針不相等時持續遍歷
        while (pointerA !== pointerB) {
            // 指針A走到末尾後切換到鏈表B頭部
            pointerA = pointerA ? pointerA.next : headB;
            // 指針B走到末尾後切換到鏈表A頭部
            pointerB = pointerB ? pointerB.next : headA;
        }

        // 當 pointerA == pointerB 時，即為交點或 null
        return pointerA;
    }
}

//沒有自己做出來


/*------------------------ 測試區塊 ------------------------*/
const listA = [4,1,8,4,5];
const listB = [5,6,1,8,4,5];
const headA = listToLinkedList(listA);
const headB = listToLinkedList(listB);
const solution = new Solution();
console.log(solution.getIntersectionNode(headA, headB)); 

/*
LeetCode 160: 相交鏈表 (Intersection of Two Linked Lists)

題目翻譯：
給定兩個單鏈表的頭節點 headA 和 headB，找出並返回兩個鏈表相交的起始節點。若無相交則返回 null。

題目需求：
1. 時間複雜度 O(n) 且空間複雜度 O(1)
2. 注意鏈表必須保持原始結構
3. 交點定義為兩個鏈表從某節點開始完全重合

解題思路與拆解：
1. 雙指針路徑對齊法：
   - 讓兩個指針分別遍歷兩個鏈表
   - 當任一指針走到鏈表末端時，切換到另一鏈表頭部
   - 最終會在交點相遇或同時走到 null

2. 數學證明：
   - 設鏈表A長度 a + c，鏈表B長度 b + c (c為共同長度)
   - 指針A總路程：a + c + b
   - 指針B總路程：b + c + a
   - 兩者會在第二輪遍歷時同時抵達交點

時間複雜度：O(m + n) 
空間複雜度：O(1)

重點筆記：
1. **路徑交換機制**：
   - 消除長度差影響的核心設計
   - 兩次遍歷確保總路徑長度相同

2. **終止條件**：
   - 無論是否相交，指針最終都會同時指向 null
   - 不需額外判斷邊界條件

範例解析：
Case 1: 有交點
A: 1->2->3->4
B: 5->6->3->4
pointerA 路徑：1-2-3-4-null-5-6-3
pointerB 路徑：5-6-3-4-null-1-2-3
在第三個節點 3 處相遇

Case 2: 無交點
A: 1->2->3
B: 4->5
pointerA 路徑：1-2-3-null-4-5-null
pointerB 路徑：4-5-null-1-2-3-null
最終同時指向 null

代碼逐行解析：
| 行數 | 代碼                         | 功能說明                     |
|------|-----------------------------|-----------------------------|
| 10   | let pointerA = headA        | 初始化指向鏈表A頭部          |
| 11   | let pointerB = headB        | 初始化指向鏈表B頭部          |
| 14   | while (pointerA !== pointerB)| 持續遍歷直到相等             |
| 16   | pointerA = pointerA?.next   | 指針A移動，末端切換到鏈表B   |
| 18   | pointerB = pointerB?.next   | 指針B移動，末端切換到鏈表A   |
| 22   | return pointerA             | 返回交點或 null             |

進階討論：
1. **環形鏈表處理**：
   - 若鏈表存在環，此算法會進入無限循環
   - 需先使用快慢指針檢測環的存在

2. **長度差優化**：
   - 可先計算兩鏈表長度差
   - 讓較長鏈表指針先移動差值步數
   - 但會增加空間複雜度 (需存儲長度值)

測試案例補充：
console.log(solution.getIntersectionNode(
    {val:1,next:{val:2,next:{val:3,next:null}}},
    {val:4,next:{val:5,next:null}}
)); // null (無交點)

console.log(solution.getIntersectionNode(
    {val:1,next:{val:9,next:{val:1,next:{val:2,next:{val:4}}}},
    {val:3,next:{val:2,next:{val:4}}}
)); // 節點2 (需構造實際交點)
*/