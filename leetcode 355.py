import heapq
from collections import defaultdict, deque

class Twitter:
    def __init__(self):
        # 初始化所需的結構
        self.timestamp = 0
        self.tweets = defaultdict(deque)  # 儲存用戶推文
        self.followees = defaultdict(set)  # 儲存用戶關注的對象

    def postTweet(self, userId: int, tweetId: int) -> None:
        # 發送推文，記錄時間戳
        self.tweets[userId].appendleft((self.timestamp, tweetId))
        self.timestamp += 1

    def getNewsFeed(self, userId: int) -> list:
        # 獲取用戶和其追隨者的最新推文
        min_heap = []
        users = self.followees[userId] | {userId}  # 包含自己及關注對象
        for uid in users:
            for tweet in list(self.tweets[uid])[:10]:  # 每個用戶最多只取10條推文
                heapq.heappush(min_heap, tweet)
                if len(min_heap) > 10:
                    heapq.heappop(min_heap)  # 保持只有10條最新的推文
        return [tweetId for _, tweetId in sorted(min_heap, reverse=True)]

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.followees[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.followees[followerId].discard(followeeId)


#["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
#[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
twitter = Twitter()
twitter.postTweet(1, 5)             # 使用者 1 發布推文 5
print(twitter.getNewsFeed(1))        # 應輸出：[5]
twitter.follow(1, 2)                 # 使用者 1 追蹤使用者 2
twitter.postTweet(2, 6)              # 使用者 2 發布推文 6
print(twitter.getNewsFeed(1))        # 應輸出：[6, 5]
twitter.unfollow(1, 2)               # 使用者 1 取消追蹤使用者 2
print(twitter.getNewsFeed(1))        # 應輸出：[5]


