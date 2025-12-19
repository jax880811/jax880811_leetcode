// leetcode 1103: Distribute Candies to People
//
// 將 Python 寫法轉為 C++，並保留完整逐行中文註解與詳細筆記，風格參考同目錄下的 Python 檔案。

#include <iostream>
#include <vector>

using std::cout;
using std::endl;
using std::vector;

class Solution {
public:
	// distributeCandies: 把 candies 顆糖果依題目規則分配給 num_people 個人
	// 回傳一個 vector<int>，表示每個人的糖果數量
	vector<int> distributeCandies(int candies, int num_people) {
		// 邊界處理：若沒有糖果或沒有要分配的人，回傳一個 [0]
		// 題庫通常不會給 num_people == 0，但為保險處理與與 Python 檔行為一致
		if (candies == 0 || num_people == 0) {
			return vector<int>{0};
		}

		// 初始化答案陣列，長度為 num_people，初始值為 0
		vector<int> answer(num_people, 0);

		// i: 當前分配到的人索引（0-based）
		int i = 0;

		// candy: 本輪要發放的糖果數，從 1 開始逐次遞增
		int candy = 1;

		// 只要還有糖果就繼續分配
		while (candies > 0) {
			// 如果剩餘糖果足夠，發 candy 顆給當前人
			if (candy <= candies) {
				answer[i] += candy; // 把 candy 顆分給第 i 個人
			} else {
				// 若剩餘糖果不足，將剩餘糖果全部給當前人
				answer[i] += candies;
			}

			// 扣除已分配的糖果數（若 candy > candies，candies 會變負，下次 while 會結束）
			candies -= candy;

			// 移到下一個人
			++i;

			// 本次要發的糖果數遞增
			++candy;

			// 若超過最後一個人，回到第 0 個人（圓形分配）
			if (i >= num_people) i = 0;
		}

		// 回傳最終結果
		return answer;
	}
};


int main() {
	// 範例測試：
	int candies = 7;
	int num_people = 4;

	Solution solution;
	vector<int> res = solution.distributeCandies(candies, num_people);

	// 輸出結果，與 Python 範例一致
	cout << "[";
	for (size_t k = 0; k < res.size(); ++k) {
		cout << res[k];
		if (k + 1 < res.size()) cout << ", ";
	}
	cout << "]" << endl;

	return 0;
}


/*
詳細筆記 - LeetCode 1103: Distribute Candies to People

題目翻譯：
給定整數 `candies`（糖果總數）與 `num_people`（人數），依序分配遞增的糖果數列給每個人，
當剩餘糖果不足以給完整數量時，將剩下的糖果全部給當前人並結束。

解題重點：
- 本題屬於模擬（simulation），直接模擬題目描述即可。
- 使用一個長度為 `num_people` 的陣列 `answer` 保存結果，並以 `i`（目前人）與 `candy`（本輪要發的數量）
  維護狀態，逐次分配直到糖果耗盡。

時間與空間複雜度：
- 時間複雜度：O(k)，其中 k 為迴圈執行次數，滿足 1 + 2 + ... + k >= 初始 candies，
  因此 k = O(sqrt(candies))，每次迴圈為 O(1) 操作。
- 空間複雜度：O(num_people)，用於儲存結果的陣列。

範例解析（candies=7, num_people=4）：
- 第 0 人拿 1（剩 6） => [1,0,0,0]
- 第 1 人拿 2（剩 4） => [1,2,0,0]
- 第 2 人拿 3（剩 1） => [1,2,3,0]
- 第 3 人欲拿 4，但只剩 1 => 給第 3 人 1 => [1,2,3,1]

註：本檔案已盡量保留與 Python 檔一致的註解風格與內容，若要我把註解改為更精簡、或改成英文註解、
或額外加入數學優化版本（不逐一模擬）請告訴我。
*/
