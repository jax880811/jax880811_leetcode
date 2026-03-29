'''
倒印星星_v1.1.pdf
請勿查詢有關列印星星之資訊與文章*禁止使用 Python string formatting輸入為兩個數字，
兩個數字以空白間隔，第一個數字範圍為 $[1, 3]$ 所有正整數，第二個數字範圍為 $[1, 99]$ 所有正奇數。
第一個數字為 $1$ 時代表輸出結果靠左對齊，為 $2$ 時表示輸出結果置中對齊，為 $3$ 時表示輸出結果靠右對齊。
第二個數字表示輸出第一列 * 的數量，其後每列依序輸出小於第二個數字的正奇數數量的 *，
範例如下：
範例一：1 3
Plaintext
***
*
範例二：2 5
Plaintext
*****
 ***
  *
範例三：3 5
Plaintext
*****
  ***
    *
'''

format_ = int(input())
check = int(input())

space = " "
answer = []


if format_ == 1:
    for i in range(0,check,2):
        answer.append("*" * (check - i))
        
elif format_ == 2:
    for i in range(0,check,2):
        answer.append(space * (i//2) + "*" * (check - i) + space * (i//2))

elif format_ == 3:
    for i in range(0,check,2):
        answer.append(space * i + "*" * (check - i))

for i in answer:
    print(i)
        
'''
# 1. 處理輸入 (支援 "2 5" 這種空白間隔格式)
data = input().split()
format_ = int(data[0])
check = int(data[1])

space = " "

# 2. 直接用迴圈控制每一行的輸出
for i in range(0, check, 2):
    if format_ == 1:
        # 靠左：直接印星星
        print("*" * (check - i))
        
    elif format_ == 2:
        # 置中：左邊補 i//2 個空格
        print(space * (i // 2) + "*" * (check - i))
        
    elif format_ == 3:
        # 靠右：左邊補 i 個空格
        print(space * i + "*" * (check - i))
'''



