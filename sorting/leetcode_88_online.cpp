#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        if (n == 0) return;
        
        int p1 = m - 1;
        int p2 = n - 1;
        int p = m + n - 1;
        
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
    }
};

void printArray(const vector<int>& arr, const string& name) {
    cout << name << ": [";
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i];
        if (i < arr.size() - 1) cout << ", ";
    }
    cout << "]" << endl;
}

int main() {
    cout << "=== LeetCode 88: Merge Sorted Array ===" << endl;
    
    // 測試案例 1
    cout << "\n測試案例 1:" << endl;
    vector<int> nums1 = {1, 2, 3, 0, 0, 0};
    int m = 3;
    vector<int> nums2 = {2, 5, 6};
    int n = 3;
    
    cout << "合併前：" << endl;
    printArray(nums1, "nums1");
    printArray(nums2, "nums2");
    
    Solution solution;
    solution.merge(nums1, m, nums2, n);
    
    cout << "合併後：" << endl;
    printArray(nums1, "nums1");
    
    // 測試案例 2
    cout << "\n測試案例 2 (nums2 為空):" << endl;
    vector<int> nums3 = {1, 2, 3};
    int m2 = 3;
    vector<int> nums4 = {};
    int n2 = 0;
    
    cout << "合併前：" << endl;
    printArray(nums3, "nums3");
    printArray(nums4, "nums4");
    
    solution.merge(nums3, m2, nums4, n2);
    
    cout << "合併後：" << endl;
    printArray(nums3, "nums3");
    
    // 測試案例 3
    cout << "\n測試案例 3 (nums1 為空):" << endl;
    vector<int> nums5 = {0, 0, 0};
    int m3 = 0;
    vector<int> nums6 = {1, 2, 3};
    int n3 = 3;
    
    cout << "合併前：" << endl;
    printArray(nums5, "nums5");
    printArray(nums6, "nums6");
    
    solution.merge(nums5, m3, nums6, n3);
    
    cout << "合併後：" << endl;
    printArray(nums5, "nums5");
    
    return 0;
} 