/**
 * 計算 data2 中的元素在 data1 中出現的次數。
 *
 * @param data1 包含整數的列表。
 * @param data2 包含要計數的整數的列表。
 * @returns 一個物件，鍵為 data2 中的元素，值為其在 data1 中出現的次數。
 */
function countAnswer(data1, data2) {
    var result = {};
    for (var i = 0; i < data2.length; i++) {
        var count = 0;
        for (var j = 0; j < data1.length; j++) {
            if (data1[j] === data2[i]) {
                count++;
            }
        }
        result[data2[i]] = count;
    }
    return result;
}
// 測試資料
var data1 = [1, 1, 1, 6, 3, 5, 4, 8, 7, 6, 3];
var data2 = [1, 6, 8];
console.log(countAnswer(data1, data2));
