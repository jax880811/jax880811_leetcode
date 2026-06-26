'''
(一) 請說明例外處理（Exception Handling）的目的，並比較錯誤回傳碼與 try-catch 的差異。
(二) 請以 Python 寫一個函式，將兩個字串轉整數後相除；若輸入不是整數或除數為 0，需安全處理。
'''
def check(input1: str, input2: str) -> float:
    try:
        value1 = int(input1)
        value2 = int(input2)
        return value1 / value2

    except ValueError:
        print("輸入不合法，請輸入整數")
        return None

    except ZeroDivisionError:
        print("除數不可為 0")
        return None


input1 = input()
input2 = input()

result = check(input1, input2)

if result is not None:
    print(result)

'''
def check(input1: str, input2: str) -> float:
    # 定義函式 check，接收兩個字串，最後回傳浮點數結果

    try:
        # try 區塊放「可能出錯」的程式碼

        value1 = int(input1)
        # 將第一個字串轉成整數
        # 如果 input1 不是合法整數，會產生 ValueError

        value2 = int(input2)
        # 將第二個字串轉成整數
        # 如果 input2 不是合法整數，會產生 ValueError

        return value1 / value2
        # 兩數相除
        # 如果 value2 是 0，會產生 ZeroDivisionError

    except ValueError:
        # 捕捉「字串無法轉成整數」的錯誤

        print("輸入不合法，請輸入整數")
        return None

    except ZeroDivisionError:
        # 捕捉「除數為 0」的錯誤

        print("除數不可為 0")
        return None


input1 = input()
# 讀取第一個輸入，input() 本來就會回傳字串

input2 = input()
# 讀取第二個輸入

result = check(input1, input2)
# 呼叫函式，取得結果

if result is not None:
    # 如果結果不是 None，代表成功相除

    print(result)
    # 印出相除結果
'''