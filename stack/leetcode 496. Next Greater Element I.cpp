#include <iostream>
#include <vector>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        stack<int> s;
        unordered_map<int, int> res_map;

        // 1. 遍歷 nums2 尋找每個數字的下一個大數
        for (int num : nums2) {
            // 當棧不為空，且當前數字比棧頂大
            while (!s.empty() && num > s.top()) {
                // 棧頂數字找到了它的答案
                res_map[s.top()] = num;
                s.pop();
            }
            // 將當前數字壓入棧
            s.push(num);
        }

        // 2. 準備結果向量
        vector<int> result;
        for (int num : nums1) {
            // 在 map 中尋找有無答案
            if (res_map.count(num)) {
                result.push_back(res_map[num]);
            } else {
                // 沒找到則回傳 -1
                result.push_back(-1);
            }
        }

        return result;
    }
};



int main() {
    Solution solution;
    vector<int> nums1 = {4, 1, 3};
    vector<int> nums2 = {1, 3, 4, 2};

    vector<int> result = solution.nextGreaterElement(nums1, nums2);
    for (int num : result) {
        cout << num << " ";
    }
    return 0;
}

