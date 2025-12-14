#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Hello, C++ is working!" << endl;
    cout << "測試中文輸出" << endl;
    
    vector<int> nums = {1, 2, 3, 4, 5};
    cout << "Vector: ";
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}
