'''
某國營事業建置電動車充電站管理系統，站內設有兩種充電樁：交流慢充樁（輸出功率 7 瓩，每分鐘計費 2 元）與直流快充樁
（輸出功率 120 瓩，每分鐘計費 8 元，且單次充電超過 30 分鐘之部分，超出部分每分鐘加收 2 元）。
所有充電樁均具備樁號、輸出功率與目前狀態（「閒置」、「充電中」、「故障」），並提供查詢狀態、變更狀態與計算費用之功能。
請回答下列問題：（3 題，共 20 分）
（一）請說明物件導向程式設計之三大特性——封裝（Encapsulation）、繼承（Inheritance）與多型（Polymorphism），
並就上述充電站情境分別舉例說明。（6 分）
（二）請設計上述充電樁之類別階層並撰寫程式碼實作，須包含一個基底類別與兩個子類別，
且須具體展現封裝、繼承與多型三項特性。請註明所使用之程式語言。（10 分）
（三）請說明抽象類別（Abstract Class）與介面（Interface）之差異，並說明本題若改以介面實作，適合定義哪些內容。（4 分）
'''
class ChargingPile:
    def __init__(self , id , power ,state):
        self.id = id
        self.power = power
        self.state = state
    def read_state(self):
        return self.state
    def change_state(self , new_state):
        self.state = new_state
        return self.state
    def counting(self , minutes):
        return 0

class a1(ChargingPile):
    def __init__(self, id, power, state):
        super().__init__(id, power, state)
    def counting(self , minutes):
        return minutes * 2
class a2(ChargingPile):
    def __init__(self, id, power, state):
        super().__init__(id, power, state)
    def counting(self , minutes):
        if minutes <= 30:
            return minutes * 8
        else:
            answer = 8 * 30
            return answer + (8+2) * (minutes - 30)


'''
（一）請說明物件導向程式設計之三大特性——封裝（Encapsulation）、繼承（Inheritance）與多型（Polymorphism）
封裝:將該物件的類別屬性與方法包裝起來，對外界隱藏內部的實作細節，僅提供必要的介面供外部使用。
繼承:將類別的使用方式繼承下來使用
多型:同樣的方法類別，有不同的實作方式，可能是同樣名稱但是呼叫的屬性方法不同，也就是多載，或者是完全的覆寫這個功能

（三）請說明抽象類別（Abstract Class）與介面（Interface）之差異，並說明本題若改以介面實作，適合定義哪些內容。（4 分）
抽象類別也就是說，將物件類別跟方法變成一個虛擬的類別概念，不能夠直接將這個概念變成實例，必須以繼承的方式運作
介面則是純粹的功能追加，定義需要追加的外接功能方法，而使用了介面之後就需要使用介面所擁有的功能
若是用介面實作，適合定義的內容就是交流慢充樁以及直流快衝樁自己專屬才有的額外追加功能
'''
'''
# 使用語言：Python

class ChargingPile:
    def __init__(self, id, power, state):
        self.__id = id          # 私有屬性：充電樁編號
        self.__power = power    # 私有屬性：輸出功率
        self.__state = state    # 私有屬性：目前狀態

    def read_state(self):
        return self.__state     # 透過方法讀取狀態

    def change_state(self, new_state):
        self.__state = new_state  # 透過方法修改狀態

    def counting(self, minutes):
        return 0                # 由子類別覆寫


# 交流慢充樁
class ACChargingPile(ChargingPile):
    def __init__(self, id, state):
        super().__init__(id, 7, state)  # 功率固定 7 瓩

    def counting(self, minutes):
        return minutes * 2      # 每分鐘 2 元


# 直流快充樁
class DCChargingPile(ChargingPile):
    def __init__(self, id, state):
        super().__init__(id, 120, state)  # 功率固定 120 瓩

    def counting(self, minutes):
        if minutes <= 30:
            return minutes * 8

        answer = 30 * 8
        return answer + (minutes - 30) * 10
'''

