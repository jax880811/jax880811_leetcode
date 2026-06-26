'''
(二) 請設計父類別 Sensor，包含設備代號、設備名稱、目前讀值，並提供 showInfo() 方法。（4 分）
(三) 請設計子類別 TemperatureSensor 繼承 Sensor，覆寫 showInfo()，輸出時額外顯示單位 °C；並以主程式示範多型。（6 分）
(四) 請說明封裝、繼承、多型在本題中的呈現。（2 分）
'''

class Sensor:
    def __init__(self , device_id , device_name ,value):
        self.device_id = device_id
        self.device_name = device_name
        self.value = value

    def showInfo(self):
        print(self.device_id)
        print(self.device_name)
        print(self.value)

class TemperatureSensor(Sensor):
    def showInfo(self):
        print(self.device_id)
        print(self.device_name)
        print(f"{self.value}°C")
        print(self.value , "°C")
