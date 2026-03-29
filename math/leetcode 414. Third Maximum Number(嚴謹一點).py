from typing import List

class Solution:
    def thirdMax(self, nums: List[int]) -> int:
        # 【筆記】使用 None 初始化，代表目前還沒找到任何有效數字
        first = second = third = None

        for num in nums:
            # 1. 忽略重複值：如果目前的數字已經在榜單上了，就跳過不處理
            if num == first or num == second or num == third:
                continue

            # 2. 如果目前的數字大於第一名（或者第一名還是空的）
            if first is None or num > first:
                third = second   # 原本的第二名退到第三名
                second = first   # 原本的第一名退到第二名
                first = num      # 目前數字成為第一名

            # 3. 如果目前的數字大於第二名（或者第二名還是空的）
            elif second is None or num > second:
                third = second   # 原本的第二名退到第三名
                second = num     # 目前數字成為第二名

            # 4. 如果目前的數字大於第三名（或者第三名還是空的）
            elif third is None or num > third:
                third = num      # 目前數字成為第三名

        # 【筆記】根據題目要求：
        # 如果第三名存在 (not None)，則回傳第三名；
        # 如果第三名不存在（代表不重複的數不到三個），則回傳第一名（最大值）。
        return third if third is not None else first

# 測試
nums = [3, 2, 1]
solution = Solution()
print(f"陣列 {nums} 中第三大的數是: {solution.thirdMax(nums)}")


'''
========================================
【追加筆記】詳細解析
========================================

【1】為什麼使用 None 而不是 float('-inf')？
─────────────────────────────────────
初始化方式對比：

方式 A: first = second = third = float('-inf')
  ❌ 問題：在迴圈中比較時，-inf 可能符合 num > third 的條件
  ❌ 問題：當陣列中有負數時，-inf 可能被認為是有效值
  ❌ 問題：最終判斷時無法區分「真正找到第三大」vs「只是初始值」

方式 B: first = second = third = None （本方案）
  ✅ 優點：None 明確表示「還沒找到這個位置的數字」
  ✅ 優點：使用 is None 判斷更清晰，效能更好
  ✅ 優點：避免數值邏輯上的混亂


【2】時間和空間複雜度分析
─────────────────────────────────────
時間複雜度：O(n)
  - 單次遍歷整個陣列
  - 每個元素最多進行 4 次比較

空間複雜度：O(1)
  - 只使用三個固定變數
  - 與陣列大小無關


【3】邊界情況處理
─────────────────────────────────────
情況 1: 陣列長度 < 3
  Input: [1, 2]
  Output: 2（返回最大值，因為 third 為 None）

情況 2: 有重複值
  Input: [1, 1, 1, 3, 2]
  Step 1: first=1, second=None, third=None
  Step 2: skip (1 == first)
  Step 3: skip (1 == first)
  Step 4: first=3, second=1, third=None
  Step 5: first=3, second=2, third=1
  Output: 1

情況 3: 包含負數
  Input: [-2, -1, 0]
  first=0, second=-1, third=-2
  Output: -2（正確處理負數）

情況 4: INT_MIN 值
  Input: [2147483647, 2147483647, 2147483646]
  正常工作（None 不受數值範圍限制）


【4】與其他方法的對比
─────────────────────────────────────
方法 A: 排序方式
  solution = sorted(set(nums), reverse=True)
  if len(solution) < 3:
      return max(nums)
  return solution[2]
  
  時間複雜度: O(n log n) - 更慢
  空間複雜度: O(n) - 需要排序空間

方法 B: 堆積方式
  import heapq
  unique = list(set(nums))
  if len(unique) < 3:
      return max(unique)
  return heapq.nlargest(3, unique)[2]
  
  時間複雜度: O(n) 平均
  空間複雜度: O(n) - 需要額外存儲

方法 C: 本方案（效率最優）
  時間複雜度: O(n)
  空間複雜度: O(1) ← 最優！


【5】核心邏輯的流程圖
─────────────────────────────────────
對於每個 num，檢查流程：

  目前 num ─→ (檢查重複) ─→ (不重複)
                   │
                   └─→ (若重複) → skip
  
  (不重複) ─→ num > first? ─→ YES: 更新榜單（三個都移動）
               │
               └─ NO ↓
                 num > second? ─→ YES: 更新榜單（二、三移動）
                     │
                     └─ NO ↓
                       num > third? ─→ YES: 更新榜單（三移動）
                           │
                           └─ NO: 無需更新


【6】為什麼這個方案優於其他常見方法？
─────────────────────────────────────
優勢：
  1. 空間效率最高（O(1) vs O(n)）
  2. 時間效率最優（O(n) 單次遍歷）
  3. 邏輯清晰易理解
  4. 無需額外資料結構
  5. 對邊界值處理完美（None 很優雅）

劣勢：
  1. 代碼略長（但邏輯清晰）
  2. 需要處理 None 的判斷


【7】進階變種題目
─────────────────────────────────────
• LeetCode 1157: 多查詢最大元素
  → 可用相同邏輯，只需追蹤更多排名

• LeetCode 295: 數據流的中位數
  → 可用堆積改進本演算法

• 找前 K 大元素
  → 可拓展至 k 個變數的追蹤方式


【8】實務應用場景
─────────────────────────────────────
✓ 實時排名系統（固定追蹤前 N 名）
✓ 滑動窗口最大值變種
✓ 股票價格最高三日追蹤
✓ 網站訪問量 Top 3 實時更新
========================================
'''