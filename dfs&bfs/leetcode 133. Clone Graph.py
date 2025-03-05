from typing import Optional
from typing import List

class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
        
class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None

        visited = {}  # 哈希表存放 {原始節點: 克隆節點}

        def dfs(node: 'Node') -> 'Node':
            if node in visited:  # 若節點已經克隆過，直接返回
                return visited[node]

            clone_node = Node(node.val)  # 創建克隆節點
            visited[node] = clone_node   # 存入哈希表
            
            for neighbor in node.neighbors:  # 遍歷原始節點的所有鄰居
                clone_node.neighbors.append(dfs(neighbor))  # 遞迴克隆並連接

            return clone_node  # 返回克隆的節點

        return dfs(node)
    

adjList = [[2,4],[1,3],[2,4],[1,3]]
solution = Solution()
print(solution.cloneGraph(adjList))