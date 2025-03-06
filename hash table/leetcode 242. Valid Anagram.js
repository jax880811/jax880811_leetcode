class Solution {
    // 定義一個方法 isAnagram，用於判斷兩個字串是否為字母異位詞
    isAnagram(s, t) {
        // 如果兩個字串的長度不同，直接返回 false
        if (s.length != t.length) {
            return false;
        }

        // 將字串 s 轉換為陣列，排序後再轉回字串
        const sortedS = s.split('').sort().join();
        
        // 將字串 t 轉換為陣列，排序後再轉回字串
        const sortedT = t.split('').sort().join();
        
        // 輸出排序後的字串 s 和 t，用於調試
        console.log(sortedS);
        console.log(sortedT);
        
        // 比較排序後的字串是否相同
        return sortedS === sortedT;
    }
}

// 測試範例
let s = "anagram";
let t = "nagaram";

// 創建 Solution 的實例
let solution = new Solution();

// 調用 isAnagram 方法並輸出結果
console.log(solution.isAnagram(s, t));


/*
這題的第一個方法是將字串的字元分割並做出排序
接著兩個排序好的字串再做比較
如果一樣就回答 true

重點筆記：
1. **split('')**:
   - 將字串轉換為陣列，每個字元作為陣列的一個元素。
   - 例如："anagram" -> ["a", "n", "a", "g", "r", "a", "m"]。

2. **sort()**:
   - 對陣列進行排序，默認按字母順序排序。
   - 例如：["a", "n", "a", "g", "r", "a", "m"] -> ["a", "a", "a", "g", "m", "n", "r"]。

3. **join()**:
   - 將陣列轉換回字串，默認使用逗號分隔。
   - 例如：["a", "a", "a", "g", "m", "n", "r"] -> "a,a,a,g,m,n,r"。

4. **比較排序後的字串**:
   - 如果兩個字串排序後的結果相同，則它們是字母異位詞。
   - 例如："anagram" 排序後為 "a,a,a,g,m,n,r"，"nagaram" 排序後也為 "a,a,a,g,m,n,r"。

5. **時間複雜度**:
   - 排序的時間複雜度為 O(N log N)，其中 N 是字串的長度。
   - 比較排序後的字串的時間複雜度為 O(N)。
   - 總時間複雜度為 O(N log N)。

6. **空間複雜度**:
   - 排序需要額外的空間來存儲陣列，因此空間複雜度為 O(N)。

7. **適用場景**:
   - 這種方法適合字串長度較小的情況，因為排序的時間複雜度較高。
   - 如果字串長度很大，可以考慮使用哈希表法來優化時間複雜度。
*/