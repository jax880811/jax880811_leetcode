class Solution {

    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    nextGreaterElement = function (nums1, nums2) {
        // 1. 初始化工具
        // stack: 實作「單調棧」，用來存放還沒找到右邊大數的元素
        let stack = [];
        // res_map: 哈希表，紀錄「數字 -> 它的下一個大數」的映射關係
        const res_map = new Map();

        // 2. 遍歷 nums2 (尋找每個元素的下一個更大元素)
        for (let i = 0; i < nums2.length; i++) {
            // 取出當前要比對的數字
            let check = nums2[i];

            // 核心邏輯：如果棧不為空，且「當前數字」大於「棧頂數字」
            // 代表棧頂數字終於遇到了它右邊第一個比它大的數
            while (stack.length > 0 && check > stack[stack.length - 1]) {
                // 彈出棧頂元素，它已經找到答案了
                let res = stack.pop();
                // 在 Map 中紀錄：res 的下一個大數是 check
                res_map.set(res, check);
            }

            // 將當前數字推入棧中，等待屬於它的「更大數」出現
            stack.push(check);
        }

        // 偵錯用：印出留在棧中(沒找到大數)的人，以及紀錄好的答案簿
        console.log(stack);
        console.log(res_map);

        // 3. 根據 nums1 的需求，對照答案簿 (res_map) 取出結果
        let result = [];
        for (let i = 0; i < nums1.length; i++) {
            let check = nums1[i];
            // 如果答案簿裡有紀錄這個數字
            if (res_map.has(check)) {
                // 取出對應的大數答案
                let answer = res_map.get(check);
                result.push(answer);
            }
            else {
                // 若無紀錄（代表在 nums2 中它右邊沒有比它大的數），補上 -1
                result.push(-1);
            }
        }

        // 4. 回傳最終答案陣列
        return result;
    }
}
//有自己做出來

// 測試範例
let nums1 = [4, 1, 3];
let nums2 = [1, 3, 4, 2];

// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.nextGreaterElement(nums1, nums2));  