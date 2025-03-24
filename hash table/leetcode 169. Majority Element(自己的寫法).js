class Solution {

    majorityElement = function (nums) {
        if (nums.length === 1) {
            return nums[0];
        }
        let len_nums = nums.length;
        let base = Math.floor(len_nums / 2);
        let sorted_nums = nums.sort();
        let temp = 1;
        for (let i = 1; i < len_nums; i++) {
            if (sorted_nums[i] === sorted_nums[i - 1]) {
                temp++;
                if (temp > base) {
                    return sorted_nums[i];
                }
            }
            else {
                temp = 1;
            }

        }
        return 0;
    }
}




let nums = [2, 2, 1, 1, 1, 2, 2];


// 創建 Solution 的實例
let solution = new Solution();


console.log(solution.majorityElement(nums));