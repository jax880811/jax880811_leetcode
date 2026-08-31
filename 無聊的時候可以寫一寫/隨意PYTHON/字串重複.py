'''
給定一個僅包含小寫英文字母的字串 s，字串長度最大為 \(10^6\)。
請撰寫函式 firstUnique(s)，依原字串順序回傳第一個僅出現一次的字元；
若不存在，回傳字元 #，並分析其時間複雜度。（15 分）
'''
def firstUnique(s):
    check = {}
    for c in s:
        if c in check:
            check[c] += 1
        else:
            check[c] = 1
    for char in s:
        if check[char] == 1:
            return char

    return "#"
