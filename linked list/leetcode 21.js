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
    let dummy = new ListNode();  // 虛擬頭節點
    let current = dummy;
    for (let element of elements) {
        current.next = new ListNode(element);
        current = current.next;
    }
    return dummy.next;  // 返回真正的頭節點
}

class Solution {
    /**
     * 合併兩個有序鏈結串列 (迭代法)
     * @param {ListNode|null} list1 
     * @param {ListNode|null} list2 
     * @returns {ListNode|null}
     */
    mergeTwoLists(list1, list2) {
        // 創建虛擬頭節點簡化邊界處理
        const dummy = new ListNode(-Infinity);
        let current = dummy;

        // 雙指針遍歷比較 (核心邏輯)
        while (list1 && list2) {
            if (list1.val <= list2.val) {
                current.next = list1;  // 連接較小節點
                list1 = list1.next;    // 移動指針
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;    // 移動新鏈表指針
        }

        // 處理剩餘節點 (優化技巧)
        current.next = list1 || list2;

        return dummy.next;  // 跳過虛擬頭節點返回
    }
}

/*------------------------ 測試區塊 ------------------------*/
// 標準測試案例
const list1 = listToLinkedList([1, 2, 4]);
const list2 = listToLinkedList([1, 3, 4]);
const solution = new Solution();
console.log('合併結果:', solution.mergeTwoLists(list1, list2).toString());  // 1 -> 1 -> 2 -> 3 -> 4 -> 4

/*
LeetCode 21: 合併兩個有序鏈表

題目翻譯：
給定兩個已排序的鏈結串列的頭節點 `list1` 和 `list2`，將其合併為一個新的已排序鏈結串列並返回。

題目需求：
1. 合併後的新鏈表必須由原節點拼接組成
2. 新鏈表必須保持升序排列

解題思路與拆解：
1. 問題分析：
   - 核心問題是合併兩個已排序鏈表
   - 可用雙指針逐個比較節點

2. 解題方法選擇：
   - 迭代法（本解法採用）- 時間 O(m+n)，空間 O(1)
   - 遞歸法 - 時間 O(m+n)，空間 O(m+n)

3. 解題步驟：
   - 建立虛擬頭節點簡化邊界處理
   - 用雙指針同時遍歷兩個鏈表
   - 每次選擇較小節點進行連接
   - 將剩餘節點直接接在新鏈表末端

重點筆記：
1. **虛擬頭節點技巧**:
   - 避免處理空鏈表的特殊情況
   - 統一節點連接操作邏輯

2. **時間複雜度**:
   - O(m+n) 需完整遍歷兩個鏈表

3. **空間複雜度**:
   - 只使用常數級別額外空間 (O(1))

4. **適用場景**:
   - 合併多個有序數據流
   - 實現歸併排序的合併階段

範例解析：
- 輸入：list1 = [1,2,4], list2 = [1,3,4]
- 過程：
  1. 建立虛擬頭節點 -1
  2. 比較 1 vs 1 → 連接 list1 節點
  3. 比較 2 vs 1 → 連接 list2 節點
  4. 比較 2 vs 3 → 連接 list1 節點
  5. 比較 4 vs 3 → 連接 list2 節點
  6. 連接剩餘 list1 節點 4
- 輸出：1 -> 1 -> 2 -> 3 -> 4 -> 4
*/