class Solution {

    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea = function(heights) {
        // 在 heights 陣列最後加上一個高度為 0 的柱子，
        // 目的是為了強制處理所有尚未出堆的柱子。
        heights.push(0);

        // 初始化一個堆疊，堆疊中將存放柱子的索引值。
        const stack = [];

        // 用來記錄最大矩形面積
        let maxArea = 0;

        // 遍歷整個 heights 陣列（包含最後補的 0）
        for (let i = 0; i < heights.length; i++) {

            // 當目前柱子的高度 小於 堆頂柱子的高度時，
            // 表示可以計算以堆頂為高的最大矩形。
            while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {

                // 從堆疊中彈出索引，這個柱子高度最高、但已無法往右延伸。
                const topIndex = stack.pop();

                // 取得該柱子的高度
                const height = heights[topIndex];

                // 如果堆疊已空，表示這個柱子是最左邊的
                // 可延展寬度即為目前索引 i
                // 否則，寬度為當前索引 i 減去堆頂索引再減 1
                const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;

                // 計算以此柱子為高的矩形面積
                const area = height * width;

                // 更新最大面積
                maxArea = Math.max(maxArea, area);
            }

            // 將當前柱子的索引加入堆疊
            stack.push(i);
        }

        // 回傳最大矩形面積
        return maxArea;
    }
}

// 測試範例
const solution = new Solution();

console.log(solution.largestRectangleArea([2,1,5,6,2,3])); // 輸出：10
console.log(solution.largestRectangleArea([2,4]));         // 輸出：4

/*
LeetCode 84: 直方圖中最大的矩形 (Largest Rectangle in Histogram) (Node.js 實現)

題目翻譯：
給定一個整數陣列 heights，陣列中每個元素代表直方圖中柱子的高度，每個柱子的寬度為 1。
請找出在直方圖中可以構成的最大矩形面積。

題目需求：
1. 輸入一個整數陣列 `heights`。
2. 陣列中的每個元素表示柱子的高度，寬度皆為 1。
3. 輸出最大矩形的面積。

解題思路與拆解：
本解法使用「單調遞增堆疊法」來高效處理此題。

1. 問題分析：
   - 我們希望找出每根柱子向左、向右能延伸的範圍（不遇到比它矮的柱子）
   - 透過堆疊儲存柱子的索引，我們能快速找到每根柱子的「左右界線」

2. 解題方法選擇：
   - 方法：使用單調遞增堆疊（只存柱子索引）
   - 每當遇到比堆頂還小的柱子，就代表堆頂柱子已不能再往右延伸，可以開始計算面積

3. 解題步驟：
   - **步驟 1：在原陣列尾端加上一個高度為 0 的柱子。**
     - 強制堆疊中的柱子都會被處理。
   - **步驟 2：建立堆疊，儲存柱子索引（非高度）。**
   - **步驟 3：當遇到比堆頂柱子高度更小的值時，開始結算堆頂柱子的矩形面積。**
     - 若堆為空，寬度為目前索引
     - 若堆不空，寬度為 `i - stackTopIndex - 1`
   - **步驟 4：更新最大面積。**

重點筆記：
1. **單調堆疊：** 用來維持從左到右柱子的高度是遞增的，便於判斷右界。
2. **高度比較：** 當遇到比堆頂低的柱子時，就能確定堆頂柱子的右界是目前柱子。
3. **處理尾部：** 在 heights 陣列最後加上 `0`，確保所有柱子都能被計算面積。
4. **時間複雜度：** O(n)，每根柱子最多進出堆疊一次。
5. **空間複雜度：** O(n)，最壞情況堆疊內會儲存所有柱子索引。

函數功能說明：
- `largestRectangleArea(heights)`: 接收直方圖高度陣列，返回最大矩形面積。
- `heights.push(0)`: 加入結尾虛擬柱子，確保所有柱子會被出堆。
- `while stack 非空 && 當前柱子高度 < stack 頂端柱子高度`: 開始處理面積。
- `height * width`: 使用彈出柱子的高度與計算得出的寬度，取得矩形面積。
- `maxArea = Math.max(maxArea, area)`: 持續更新最大面積。
*/
/*
整體思路是： 對於每個柱子，我們需要知道它能向左和向右延伸多遠，直到遇到比它矮的柱子。單調棧能幫助我們高效地找到這兩個邊界。我們會維護一個儲存索引的單調遞增棧。

準備工作：
首先，為了方便處理邊界情況和確保所有柱子都被計算到，我們在原始 heights 數組的末尾加上一個高度為 0 的柱子。所以現在數組變成 [2, 1, 5, 6, 2, 3, 0]。
然後，我們初始化最大面積 maxArea = 0 和一個空棧 stack = []。

開始遍歷：
接下來，我們從左到右遍歷這個新的 heights 數組（索引從 0 到 6）：

i = 0, height = 2: 棧是空的。我們直接把索引 0 壓入棧。

stack: [0]
maxArea: 0
i = 1, height = 1: 當前高度 1 小於棧頂索引 0 對應的高度 heights[0] = 2。觸發 while 迴圈。

彈出棧頂 topIndex = 0。它的高度 h = heights[0] = 2。
彈出後棧變空了。這表示 topIndex = 0 的左邊界是 -1。右邊界是當前的 i = 1。
寬度 width = R - L - 1 = 1 - (-1) - 1 = 1。
面積 area = h * width = 2 * 1 = 2。
更新 maxArea = max(0, 2) = 2。
while 結束。現在棧是空的，將當前索引 1 壓入棧。
stack: [1]
maxArea: 2
i = 2, height = 5: 當前高度 5 大於棧頂索引 1 對應的高度 heights[1] = 1。不觸發 while。將索引 2 壓入棧。

stack: [1, 2]
maxArea: 2
i = 3, height = 6: 當前高度 6 大於棧頂索引 2 對應的高度 heights[2] = 5。不觸發 while。將索引 3 壓入棧。

stack: [1, 2, 3]
maxArea: 2
i = 4, height = 2: 當前高度 2 小於棧頂索引 3 對應的高度 heights[3] = 6。觸發 while。

彈出 topIndex = 3。高度 h = 6。
彈出後新的棧頂是 2。左邊界 L = 2。右邊界 R = i = 4。
寬度 width = R - L - 1 = 4 - 2 - 1 = 1。
面積 area = h * width = 6 * 1 = 6。
更新 maxArea = max(2, 6) = 6。
繼續 while 判斷：當前高度 2 小於新的棧頂索引 2 對應的高度 heights[2] = 5。
彈出 topIndex = 2。高度 h = 5。
彈出後新的棧頂是 1。左邊界 L = 1。右邊界 R = i = 4。
寬度 width = R - L - 1 = 4 - 1 - 1 = 2。
面積 area = h * width = 5 * 2 = 10。
更新 maxArea = max(6, 10) = 10。
繼續 while 判斷：當前高度 2 大於新的棧頂索引 1 對應的高度 heights[1] = 1。while 結束。
將當前索引 4 壓入棧。
stack: [1, 4]
maxArea: 10
i = 5, height = 3: 當前高度 3 大於棧頂索引 4 對應的高度 heights[4] = 2。不觸發 while。將索引 5 壓入棧。

stack: [1, 4, 5]
maxArea: 10
i = 6, height = 0 (我們添加的虛擬柱子): 當前高度 0 小於棧頂索引 5 對應的高度 heights[5] = 3。觸發 while。

彈出 topIndex = 5。高度 h = 3。
新棧頂 4。左邊界 L = 4。右邊界 R = i = 6。
寬度 width = 6 - 4 - 1 = 1。
面積 area = 3 * 1 = 3。
更新 maxArea = max(10, 3) = 10。
繼續 while：當前高度 0 小於新棧頂 4 對應的高度 heights[4] = 2。
彈出 topIndex = 4。高度 h = 2。
新棧頂 1。左邊界 L = 1。右邊界 R = i = 6。
寬度 width = 6 - 1 - 1 = 4。
面積 area = 2 * 4 = 8。
更新 maxArea = max(10, 8) = 10。
繼續 while：當前高度 0 小於新棧頂 1 對應的高度 heights[1] = 1。
彈出 topIndex = 1。高度 h = 1。
棧變空。左邊界 L = -1。右邊界 R = i = 6。
寬度 width = 6 - (-1) - 1 = 6。
面積 area = 1 * 6 = 6。
更新 maxArea = max(10, 6) = 10。
繼續 while：棧已空，while 結束。
將當前索引 6 壓入棧。
stack: [6]
maxArea: 10
遍歷結束：
for 迴圈結束。最終 maxArea 的值是 10。

返回結果：
函數返回 maxArea，即 10。
*/