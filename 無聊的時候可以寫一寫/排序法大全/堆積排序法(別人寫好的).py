from typing import List


def heapify(arr: List[int], n: int, i: int) -> None:
    # 計算目前節點的左子節點索引
    left = 2 * i + 1
    # 計算目前節點的右子節點索引
    right = 2 * i + 2
    # 先假設目前節點是最大值節點
    largest = i

    # 如果左子節點存在，且左子節點值大於目前最大值節點
    if left < n and arr[left] > arr[largest]:
        # 更新最大值節點為左子節點
        largest = left

    # 如果右子節點存在，且右子節點值大於目前最大值節點
    if right < n and arr[right] > arr[largest]:
        # 更新最大值節點為右子節點
        largest = right

    # 如果最大值節點不是原本的根節點，代表需要調整
    if largest != i:
        # 交換根節點與最大值節點
        arr[i], arr[largest] = arr[largest], arr[i]
        # 交換後，遞迴往下修復受影響的子樹
        heapify(arr, n, largest)


def heap_sort(arr: List[int]) -> None:
    # 取得陣列長度
    n = len(arr)

    # 從最後一個非葉節點開始，往前建立最大堆
    for i in range(n // 2 - 1, -1, -1):
        # 對每個節點做 heapify，確保以它為根的子樹符合最大堆
        heapify(arr, n, i)

    # 反覆把堆頂最大值放到陣列尾端，縮小堆的範圍
    for end in range(n - 1, 0, -1):
        # 把目前堆頂最大值與尾端元素交換
        arr[0], arr[end] = arr[end], arr[0]
        # 對縮小後的堆重新 heapify，維持最大堆性質
        heapify(arr, end, 0)


if __name__ == "__main__":
    # 建立測試資料
    data = [12, 11, 13, 5, 6, 7, 3, 20, 1]
    # 印出排序前結果
    print("排序前:", data)

    # 執行 Heap Sort（原地排序）
    heap_sort(data)

    # 印出排序後結果
    print("排序後:", data)
