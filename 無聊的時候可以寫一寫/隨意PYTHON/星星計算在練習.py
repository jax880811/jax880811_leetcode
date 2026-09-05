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

mode = int(input())
star = int(input())
space = " "
if mode == 1:
    for i in range(star,0,-2):
        s = '*' * i
        print(s)
elif mode == 2:
    for i in range(star,0,-2):
        s = space * ((star-i)//2) + "*" * i + space * ((star-i)//2)
        print(s)
elif mode == 3:
    for i in range(star,0,-2):
        s = space * ((star-i)) + "*" * i
        print(s)
else:
    print("不對")














'''
mode = int(input())
star = int(input())

result = []

if mode == 1:
    for i in range(star , 0 ,-2):
        result.append("*" * i)
elif mode == 2:
    for i in range(star , 0 ,-2):
        space = (star - i) // 2
        result.append(" " * space + "*" * i + " " * space)
elif mode == 3:
    for i in range(star , 0 ,-2):
        space = star - i
        result.append(" " * space + "*" * i)

for r in result:
    print(r)

    '''