class Solution {
    
    containsDuplicate = function(nums) {
        // 創建一個 Map 來記錄已經出現過的元素
        const set = new Set();
        
        // 遍歷數組
        for (let i = 0; i < nums.length; i++) {
            
            // 如果當前元素已經存在於 Map 中，返回 true
            if (set.has(nums[i])) {
                return true;
            }
            // 將當前元素加入 Map
            set.add(nums[i]);
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