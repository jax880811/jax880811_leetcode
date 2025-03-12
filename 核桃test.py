import numpy as np
from sklearn.metrics import jaccard_score
import pandas as pd
from itertools import combinations
import heapq

data_path =r"E:\vscode\leetcode\data.xlsx"
df = pd.read_excel(data_path)

all_user_dataset = {}

for index, row in df.iterrows():
    user, dataset = row["User ID"], row["Dataset ID"]
    if user not in all_user_dataset:
        all_user_dataset[user] = set()
    all_user_dataset[user].add(dataset)



    
def Jaccard_index(set1,set2):
    intersect = set1&set2
    union = set1|set2
    return  len(intersect)/len(union)

max_jaccard = 0
best_pair = 0

for user1, user2 in combinations(all_user_dataset.keys(), 2): #排列組合 c幾取幾，這題是要c all_user_dataset.keys()取2
    jaccard = Jaccard_index(all_user_dataset[user1], all_user_dataset[user2])
    
    if jaccard > max_jaccard:
        max_jaccard = jaccard
        best_pair = (user1, user2)

print(best_pair , max_jaccard)
    
#print(df.loc[df["User ID"] == "andrew"]["Dataset ID"])



list = []

print(all_user_dataset["andrew"])

for user in all_user_dataset.keys():
    if user != "andrew":
        list.append((Jaccard_index(all_user_dataset["andrew"],all_user_dataset[user]), user))
    
answer_list = heapq.nlargest(3,list) #題目要前三個推薦數值，我的想法是用heapq



print(answer_list)
'''
平常不太會去記住一些函式
所以有些函式真的是一個個google出來的

對於直接讀txt檔案我不習慣，所以我轉成excel檔案再作分析

第一題的想法是全部的組合都丟進去再取最大
若不是用combination的話 我會用兩層迴圈 放進去queue裡面 最後在一個個可能Push出來丟到Jaccard_index的函式裡面

第二題則是在把andrew取出來 跟其他人在做對比
取前三大 那就用heap

'''





