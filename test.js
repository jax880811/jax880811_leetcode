function countAnswer(data1, data2) {
    /**
     * 計算 data2 中的元素在 data1 中出現的次數。
     *
     * @param {number[]} data1 包含整數的列表。
     * @param {number[]} data2 包含要計數的整數的列表。
     * @returns {object} 一個字典，鍵為 data2 中的元素，值為其在 data1 中出現的次數。
     */
    const result = {}; // 使用物件模擬 Python 的 Counter
    /*
    for (const num of data1) {
      counts[num] = (counts[num] || 0) + 1; // 計算 data1 中每個元素的出現次數
    }
  
    const result = {};
    for (const num of data2) {
      result[num] = counts[num] || 0; // 獲取 data2 中每個元素在 data1 中的出現次數
    }
      */
    for (let i=0 ;i<data2.length;i++){
      let count = 0;
      for (let j=0 ;j<data1.length;j++){
        if(data1[j] === data2[i]){
          count++;
        }
      }
      result[data2[i]] = count
    }
  
    return result;
  }
  
  const data1 = [1, 1, 1, 6, 3, 5, 4, 8, 7, 6, 3];
  const data2 = [1, 6, 8];
  
  console.log(countAnswer(data1, data2));