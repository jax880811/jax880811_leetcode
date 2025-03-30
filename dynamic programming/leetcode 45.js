class Solution {
    jump = function(nums) {
        // 邊界條件處理：當數組長度為 1 時不需跳躍
        if (nums.length === 1) return 0;

        let jump = 0;       // 記錄跳躍次數
        let far = 0;        // 當前能到達的最遠位置
        let temp = 0;       // 當前跳躍次數能到達的邊界

        for (let i = 0; i < nums.length; i++) {
            far = Math.max(far, i + nums[i]);  // 更新全局最遠距離

            // 修正點：判斷是否已能到達最後一個位置（索引為 length-1）
            if (far >= nums.length - 1) {
                jump++;     // 需要最後一跳
                return jump;
            }

            // 當遍歷到當前跳躍邊界時
            if (i === temp) {
                jump++;     // 增加跳躍次數
                temp = far; // 更新下個邊界
            }
        }
        return jump; // 理論上不會執行到這，因前面已 return
    }
}



// 測試範例
let nums = [2,3,1,1,4];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.jump(nums));
/*
LeetCode 45: 跳跃游戏 II (Jump Game II) (Node.js 實現)

題目翻譯：
給定一個非負整數數組 nums，初始位於數組的第一個位置。數組中的每個元素表示在該位置可以跳躍的最大長度。求到達最後一個位置的最小跳躍次數。

示例：
輸入：nums = [2,3,1,1,4]
輸出：2
解釋：跳躍到位置1 (3)，再跳3步到達末尾。

題目需求：
1. 使用最少的跳躍次數到達數組末尾
2. 假設總是可以到達最後一個位置

解題思路與拆解：
1. 問題分析：
   - 需要動態計算當前能到達的最遠範圍
   - 每次達到當前跳躍邊界時觸發新跳躍
   - 採用貪心算法在線性時間內解決問題

2. 解題方法選擇：
   - 貪心算法 (本解法採用) - 時間 O(n)，空間 O(1)
   - BFS 層級遍歷 - 時間 O(n)，空間 O(1)

3. 解題步驟 (貪心算法)：
   - 初始化三個核心變量：
     - jump_count: 記錄跳躍次數
     - current_end: 當前跳躍能到達的最遠位置
     - farthest: 全局能到達的最遠位置
   - 遍歷數組(最後一位不需要處理)
   - 動態更新最遠可達位置
   - 當觸及當前邊界時進行跳躍
   - 提前終止條件判斷

重點筆記：
1. **貪心策略**：
   - 總是在當前可選範圍內選擇能跳最遠的位置
   - 不回溯，保證最優子結構

2. **核心變量定義**：
   - jump_count: 已完成的跳躍次數
   - current_end: 當前跳躍次數下能到達的邊界
   - farthest: 歷史能到達的最遠位置

3. **狀態轉移方程式**：
   - farthest = max(farthest, i + nums[i])
   - 當 i == current_end 時：
     jump_count += 1
     current_end = farthest

4. **邊界條件處理**：
   - 數組長度為1時直接返回0
   - 提前終止條件(farthest >= nums.length -1)

5. **時間複雜度**：
   - O(n) 只需一次線性掃描

6. **空間複雜度**：
   - O(1) 只使用常數級別變量

範例解析 (nums = [2,3,1,1,4]):
- 初始化：jump=0, current_end=0, farthest=0
- i=0:
  farthest = max(0,0+2)=2
  觸發邊界(i==current_end): jump=1, current_end=2
- i=1:
  farthest = max(2,1+3)=4
  提前終止(farthest>=4): jump=2 返回

函式功能說明：
*/