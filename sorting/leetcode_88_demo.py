#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
LeetCode 88: Merge Sorted Array - 合併兩個有序陣列
模擬 C++ 程式的輸出格式
"""

class Solution:
    def merge(self, nums1, m, nums2, n):
        """
        合併兩個有序陣列
        @param nums1: 第一個陣列，長度為 m+n
        @param m: nums1 中有效元素的數量
        @param nums2: 第二個陣列，長度為 n
        @param n: nums2 中元素的數量
        """
        if n == 0:
            return
        
        # 初始化三個指針
        p1 = m - 1      # nums1 最後一個有效元素
        p2 = n - 1      # nums2 最後一個元素
        p = m + n - 1   # nums1 最後一個位置
        
        # 從後往前合併
        while p2 >= 0:
            # 比較兩個陣列的元素，選擇較大的放入 nums1[p]
            if p1 >= 0 and nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]  # 選擇 nums1 的元素
                p1 -= 1
            else:
                nums1[p] = nums2[p2]  # 選擇 nums2 的元素
                p2 -= 1
            p -= 1  # 移動目標位置指針

def print_array(arr, name):
    """打印陣列，模擬 C++ 的輸出格式"""
    print(f"{name}: [{', '.join(map(str, arr))}]")

def main():
    print("=== LeetCode 88: Merge Sorted Array ===")
    
    # 測試案例 1
    print("\n測試案例 1:")
    nums1 = [1, 2, 3, 0, 0, 0]
    m = 3
    nums2 = [2, 5, 6]
    n = 3
    
    print("合併前：")
    print_array(nums1, "nums1")
    print_array(nums2, "nums2")
    
    solution = Solution()
    solution.merge(nums1, m, nums2, n)
    
    print("合併後：")
    print_array(nums1, "nums1")
    
    # 測試案例 2：nums2 為空
    print("\n測試案例 2 (nums2 為空):")
    nums3 = [1, 2, 3]
    m2 = 3
    nums4 = []
    n2 = 0
    
    print("合併前：")
    print_array(nums3, "nums3")
    print_array(nums4, "nums4")
    
    solution.merge(nums3, m2, nums4, n2)
    
    print("合併後：")
    print_array(nums3, "nums3")
    
    # 測試案例 3：nums1 為空
    print("\n測試案例 3 (nums1 為空):")
    nums5 = [0, 0, 0]
    m3 = 0
    nums6 = [1, 2, 3]
    n3 = 3
    
    print("合併前：")
    print_array(nums5, "nums5")
    print_array(nums6, "nums6")
    
    solution.merge(nums5, m3, nums6, n3)
    
    print("合併後：")
    print_array(nums5, "nums5")
    
    # 詳細執行流程分析
    print("\n" + "="*60)
    print("詳細執行流程分析")
    print("="*60)
    
    print("\n以範例為例：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3")
    print("\n初始狀態：")
    print("nums1: [1, 2, 3, 0, 0, 0]")
    print("       p1=2              p=5")
    print("nums2: [2, 5, 6]")
    print("       p2=2")
    
    print("\n步驟 1: p1=2, p2=2, p=5")
    print("- nums1[2] = 3, nums2[2] = 6")
    print("- 6 > 3，所以 nums1[5] = 6")
    print("- p2--, p--")
    print("nums1: [1, 2, 3, 0, 0, 6]")
    print("       p1=2            p=4")
    print("nums2: [2, 5, 6]")
    print("       p2=1")
    
    print("\n步驟 2: p1=2, p2=1, p=4")
    print("- nums1[2] = 3, nums2[1] = 5")
    print("- 5 > 3，所以 nums1[4] = 5")
    print("- p2--, p--")
    print("nums1: [1, 2, 3, 0, 5, 6]")
    print("       p1=2          p=3")
    print("nums2: [2, 5, 6]")
    print("       p2=0")
    
    print("\n步驟 3: p1=2, p2=0, p=3")
    print("- nums1[2] = 3, nums2[0] = 2")
    print("- 3 > 2，所以 nums1[3] = 3")
    print("- p1--, p--")
    print("nums1: [1, 2, 3, 3, 5, 6]")
    print("         p1=1        p=2")
    print("nums2: [2, 5, 6]")
    print("       p2=0")
    
    print("\n步驟 4: p1=1, p2=0, p=2")
    print("- nums1[1] = 2, nums2[0] = 2")
    print("- 2 == 2，選擇 nums2 的元素（else 分支）")
    print("- nums1[2] = 2")
    print("- p2--, p--")
    print("nums1: [1, 2, 2, 3, 5, 6]")
    print("         p1=1      p=1")
    print("nums2: [2, 5, 6]")
    print("       p2=-1")
    
    print("\np2 < 0，迴圈結束")
    print("最終結果：nums1 = [1, 2, 2, 3, 5, 6]")

if __name__ == "__main__":
    main() 