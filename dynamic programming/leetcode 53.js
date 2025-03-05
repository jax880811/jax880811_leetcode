console.log("Hello, JavaScript!");


var maxSubArray = function(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    let sum = -Infinity; // 記錄最大總和
    let temp = 0;        // 記錄當前子陣列的總和

    for (let i of nums) {
        sum = Math.max(sum, i, temp + i);
        if (i > temp + i) {
            temp = i;
        } else {
            temp += i;
        }
    }

    return sum;
};

// 測試
let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums)); // 輸出應該是 6