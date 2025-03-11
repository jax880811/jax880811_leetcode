class Solution {
    
    containsDuplicate = function(nums) {
        // 創建一個 Map 來記錄已經出現過的元素
        const map = new Map();
        
        // 遍歷數組
        for (let i = 0; i < nums.length; i++) {
            // 如果當前元素已經存在於 Map 中，返回 true
            if (map.has(nums[i])) {
                return true;
            }
            // 將當前元素加入 Map
            map.set(nums[i], i);
        }
        
        // 如果遍歷結束後沒有發現重複元素，返回 false
        return false;
    }
}

// 測試範例
let nums = [1,2,3,1];

// 創建 Solution 的實例
let solution = new Solution();

// 調用 isAnagram 方法並輸出結果
console.log(solution.containsDuplicate(nums));

/*
存在重複元素

重點筆記：
1. **Map 的使用**:
   - `new Map()`：創建一個空的 Map。
   - `map.has(key)`：檢查 Map 中是否存在指定的鍵。
   - `map.set(key, value)`：將鍵值對加入 Map。

2. **時間複雜度**:
   - 遍歷數組一次，時間複雜度為 O(N)，其中 N 是數組的長度。
   - Map 的查找和插入操作的平均時間複雜度為 O(1)。

3. **空間複雜度**:
   - 使用了一個 Map 來存儲元素，空間複雜度為 O(N)。

4. **適用場景**:
   - 適合處理中等規模的數組，例如：檢查用戶名是否重複、統計數據中的重複項等。

範例解析：
- 輸入：nums = [1, 2, 3, 1]
- 過程：
  - 遍歷到 1 時，Map = {1: 0}
  - 遍歷到 2 時，Map = {1: 0, 2: 1}
  - 遍歷到 3 時，Map = {1: 0, 2: 1, 3: 2}
  - 遍歷到 1 時，發現 1 已經存在於 Map 中，返回 true。
- 輸出：true
*/