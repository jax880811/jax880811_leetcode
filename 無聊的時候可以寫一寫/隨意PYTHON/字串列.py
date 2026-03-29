from collections import deque
from typing import List
'''
請以 任何程式 語言利用“for”迴圈指令設計
一可以產生右列輸出結果的程式。【10 分】

H G F E D C B A
G F E D C B A
F E D C B A
E D C B A
D C B A
C B A
B A
A

'''

example = "HGFEDCBA"


for i in range(len(example)):
    print(example[i : len(example)])

for i in range(len(example)):
    print(" ".join(example[i:]))