#include <iostream>
using namespace std;

int main() {
    int x = 5;
    int& b = x;
    int *p;
    p = &b;
    cout << *p << endl;
    cout << x << endl;
    cout << b << endl;
    b = 30;
    cout << *p << endl;
    cout << x << endl;
    cout << b << endl;
    x = 15;
    cout << *p << endl;
    cout << x << endl;
    cout << b << endl;
    
    p = nullptr;
    x = 25;
    cout << x << endl;
    cout << b << endl;
    cout << p << endl;
    return 0;
}

