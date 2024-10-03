import heapq

class KthLargest:
    def __init__(self, k: int, nums: list):
        self.k = k
        # 使用一個最小堆來保存前 k 大的數值
        self.heap=[]
        for num in nums:
            self.add(num)  # 將每個初始數字加到堆中，維護 k 個最大值
            print(self.heap)

    def add(self, val: int) -> int:
        # 將新的值加入到堆中
        heapq.heappush(self.heap, val)
        # 如果堆的大小超過 k，則移除最小值，保持堆的大小為 k
        
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        # 返回第 k 大的元素，即堆頂
        return self.heap[0]


if __name__ == "__main__":
    # 初始化 KthLargest 物件，指定 k 為 3，初始數據為 [4, 5, 8, 2]
    kthLargest = KthLargest(3, [4, 5, 8, 2])
    
    # 測試不同的 add 操作，並打印結果
    print(kthLargest.add(3))  # 輸出 4
    print(kthLargest.add(5))  # 輸出 5
    print(kthLargest.add(10)) # 輸出 5
    print(kthLargest.add(9))  # 輸出 8
    print(kthLargest.add(4))  # 輸出 8