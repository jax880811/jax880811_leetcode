class Solution {
    fairCandySwap = function(aliceSizes, bobSizes) {
        // 計算兩人原始糖果總量
        const sumA = aliceSizes.reduce((acc, curr) => acc + curr, 0);
        const sumB = bobSizes.reduce((acc, curr) => acc + curr, 0);
        console.log(sumA);
        console.log(sumB);
        // 計算需要交換的差值（數學公式推導）
        const delta = (sumA - sumB) / 2;
        
        // 建立愛麗絲糖果大小的快速查詢集合
        const aliceSet = new Set(aliceSizes);
        
        // 遍歷鮑勃的每個糖果尋找符合條件的組合
        for (const bobCandy of bobSizes) {
            const requiredAliceCandy = bobCandy + delta;
            if (aliceSet.has(requiredAliceCandy)) {
                return [requiredAliceCandy, bobCandy];
            }
        }
        
        // 題目保證有解，此處不會執行
        return [];
    }
}

// 測試範例
const solution = new Solution();
console.log(solution.fairCandySwap([1,1], [2,2]));       // 輸出 [1,2]
console.log(solution.fairCandySwap([1,2,5], [2,4]));    // 輸出 [5,4]

/*
LeetCode 888: 公平的糖果交換

題目翻譯：
愛麗絲和鮑勃各自有不同大小的糖果陣列。他們想交換一顆糖果，使得交換後兩人糖果總量相等。返回交換的糖果大小組合。

題目需求：
1. 必須恰好交換一顆糖果
2. 保證至少存在一個有效解
3. 返回格式為 [愛麗絲交換的糖果大小, 鮑勃交換的糖果大小]

解題思路與拆解：
1. 數學公式推導：
   - 設愛麗絲總和為 sumA，鮑勃總和為 sumB
   - 交換後需滿足：sumA - a + b = sumB + a - b
   - 推導得：a = b + (sumA - sumB)/2

2. 實作步驟：
   - 計算雙方糖果總量
   - 計算所需差值 delta
   - 使用哈希集合優化查詢效率
   - 線性掃描尋找符合條件的組合

時間複雜度：O(n + m) 
空間複雜度：O(n) 

重點筆記：
1. **數學核心公式**：
   - 差值計算必須為整數，題目保證解存在故不需額外檢查
   - 公式轉換後將問題簡化為查詢問題

2. **哈希集合優化**：
   - 將愛麗絲糖果存入 Set 結構
   - 查詢時間複雜度從 O(n) 降為 O(1)

3. **邊界情況處理**：
   - 當 sumA == sumB 時，需交換相同大小的糖果
   - 陣列元素可能非常大（需注意數值運算限制）

範例解析：
輸入：aliceSizes = [1,1], bobSizes = [2,2]
1. sumA = 2, sumB = 4 → delta = (2-4)/2 = -1
2. 遍歷鮑勃糖果：
   - 第一個糖果 2 → 需要愛麗絲有 2 + (-1) = 1
   - 愛麗絲集合包含 1 → 返回 [1,2]
最終輸出：[1,2]

代碼逐行解析：
| 行數 | 代碼                         | 功能說明                     |
|------|-----------------------------|-----------------------------|
| 4-5  | reduce計算總和               | 計算雙方原始糖果總量         |
| 8    | delta計算                   | 數學公式推導核心差值         |
| 11   | 建立Set                     | 優化愛麗絲糖果查詢效率       |
| 14-18| 遍歷鮑勃糖果                 | 尋找符合條件的交換組合       |

進階討論：
1. **多解情況處理**：
   - 若需返回所有解，可收集所有符合條件的組合
   - 使用陣列儲存結果後返回

2. **數學驗證**：
   - 檢查差值是否為偶數，但題目保證有解故可省略
   - 若差值為奇數可直接返回空陣列

測試案例補充：
console.log(solution.fairCandySwap([2], [1,3])); // 輸出 [2,3]
console.log(solution.fairCandySwap([1,2,3], [3])); // 輸出 [2,1]
*/