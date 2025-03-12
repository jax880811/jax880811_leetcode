const { Heap } = require('heap-js');

class KthLargest {
    constructor(k, nums) {
        /**
         * 初始化 KthLargest 物件
         * @param {number} k - 第 k 大的元素
         * @param {number[]} nums - 初始數字列表
         */
        this.k = k;
        // 使用最小堆來保存前 k 大的數值
        this.heap = new Heap((a, b) => a - b); // 最小堆
        // 將每個初始數字加到堆中，維護 k 個最大值
        for (const num of nums) {
            this.add(num);
        }
    }

    add(val) {
        /**
         * 將新的值加入到堆中，並返回第 k 大的元素
         * @param {number} val - 要加入的新值
         * @return {number} - 第 k 大的元素
         */
        // 將新的值加入到堆中
        this.heap.push(val);
        // 如果堆的大小超過 k，則移除最小值，保持堆的大小為 k
        if (this.heap.size() > this.k) {
            this.heap.pop();
        }
        // 返回第 k 大的元素，即堆頂
        return this.heap.peek();
    }
}

// 測試範例
if (require.main === module) {
    // 初始化 KthLargest 物件，指定 k 為 3，初始數據為 [4, 5, 8, 2]
    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);

    // 測試不同的 add 操作，並打印結果
    console.log(kthLargest.add(3));  // 輸出 4
    console.log(kthLargest.add(5));  // 輸出 5
    console.log(kthLargest.add(10)); // 輸出 5
    console.log(kthLargest.add(9));  // 輸出 8
    console.log(kthLargest.add(4));  // 輸出 8
}

/*
LeetCode 703: 數據流中的第 K 大元素

題目翻譯：
設計一個類來找到數據流中第 k 大的元素。注意是排序後的第 k 大元素，而不是第 k 個不同的元素。

題目需求：
1. 實現一個類 KthLargest，包含以下功能：
   - 初始化時接受一個整數 k 和一個整數數組 nums。
   - 每次調用 add(val) 方法時，將 val 加入數據流，並返回當前數據流中第 k 大的元素。

原始代碼的問題：
1. 如果每次 add 操作都對整個數組進行排序，時間複雜度會很高（O(n log n)）。
2. 需要一種高效的方式來維護前 k 大的元素。

解題思路與拆解：
1. 問題分析：
   - 需要動態維護數據流中的前 k 大元素。
   - 每次 add 操作後，需要快速找到第 k 大的元素。

2. 解題方法選擇：
   - 使用最小堆（Min Heap）來保存前 k 大的元素。
   - 堆的大小始終保持為 k，堆頂元素即為第 k 大的元素。

3. 解題步驟：
   - 初始化時，將 nums 中的元素加入最小堆，並保持堆的大小不超過 k。
   - 每次 add 操作時，將新元素加入堆中。
   - 如果堆的大小超過 k，則移除堆頂元素（最小值）。
   - 返回堆頂元素，即為第 k 大的元素。

重點筆記：
1. **最小堆的使用**:
   - 最小堆的堆頂元素是堆中的最小值。
   - 通過維護一個大小為 k 的最小堆，可以高效地找到第 k 大的元素。

2. **時間複雜度**:
   - 初始化時，將 nums 中的元素加入堆的時間複雜度為 O(n log k)。
   - 每次 add 操作的時間複雜度為 O(log k)。

3. **空間複雜度**:
   - 需要 O(k) 的空間來存儲堆。

4. **適用場景**:
   - 適用於需要動態維護前 k 大元素的場景。
   - 例如實時數據流中的 Top K 問題。

範例解析：
- 輸入：
  - k = 3
  - nums = [4, 5, 8, 2]
  - add 操作序列：[3, 5, 10, 9, 4]
- 過程：
  - 初始化後，堆中的元素為 [4, 5, 8]。
  - add(3)：堆保持不變，返回 4。
  - add(5)：堆變為 [5, 5, 8]，返回 5。
  - add(10)：堆變為 [5, 8, 10]，返回 5。
  - add(9)：堆變為 [8, 9, 10]，返回 8。
  - add(4)：堆保持不變，返回 8。
- 輸出：[4, 5, 5, 8, 8]

函式功能說明：
- `class KthLargest`：封裝解決方案的類。
- `constructor(k, nums)`：初始化 KthLargest 物件。
- `add(val)`：將新值加入數據流，並返回第 k 大的元素。
- `Heap`：`heap-js` 模組的堆類，用於維護前 k 大的元素。
- `push(val)`：將元素插入堆中。
- `pop()`：移除並返回堆的最小元素。
- `peek()`：返回堆頂元素。
*/
