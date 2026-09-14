'''
某國營事業欲建立員工薪資計算程式。每位員工具有姓名與基本薪資。

（一）何謂類別（Class）與物件（Object）？（4 分）
class是定義一個規格，表示該規格內有哪一些屬性，以及方法
物件則是將class變成一個實體的案例

（二）設計 Employee 類別，包含姓名、基本薪資，以及 getSalary() 方法。（5 分）

（三）另設計 Manager 類別繼承 Employee，主管另有管理加給 bonus，其 getSalary() 應回傳基本薪資加管理加給。（6 分）
'''

class Employee:
    def __init__(self , name , salary):
        self.name = name
        self.salary = salary
    def getSalary(self):
        return self.salary

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)  # 呼叫父類別建構子，初始化姓名與基本薪資
        self.bonus = bonus  # 儲存主管管理加給
    def getSalary(self):
        return self.salary + self.bonus



'''
class Employee:
    def __init__(self, name, salary):
        self.name = name  # 員工姓名
        self.salary = salary  # 基本薪資

    def getSalary(self):
        return self.salary  # 回傳基本薪資


class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)  # 呼叫父類別建構子，初始化姓名與基本薪資
        self.bonus = bonus  # 儲存主管管理加給

    def getSalary(self):
        return self.salary + self.bonus  # 覆寫方法，回傳基本薪資加管理加給
'''
