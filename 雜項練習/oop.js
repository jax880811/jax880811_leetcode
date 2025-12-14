// animal.js

// 模擬抽象類別 Animal - 體現抽象化
// 使用 class 語法
class Animal {
    // 模擬 protected 屬性 - 體現封裝 (使用約定 _name，但不是真正的 protected)
    _name;

    constructor(name) {
        // 模擬抽象類別不能被直接實例化 (運行時檢查)
        if (new.target === Animal) {
            throw new Error('抽象基底類別 Animal 不能被直接實例化');
        }
        this._name = name;
    }

    // 模擬抽象方法 eat() - 強制子類別實作 (運行時拋錯)
    // 體現多型：子類別必須提供自己的 eat 實作
    eat() {
        throw new Error('子類別必須實作 eat() 方法');
    }

    // 具體方法 getName() - 體現封裝 (透過方法存取屬性)
    getName() {
        return this._name;
    }

    // 具體方法 makeSound() - 為多型做準備，子類別可覆寫 (提供一個默認實作)
    makeSound() {
        console.log(this._name + " makes a generic sound.");
    }
}

// 模擬介面 Barkable - 定義行為契約 (沒有專門的 interface 語法)
// 這個概念體現在期望物件擁有 bark() 方法
/*
interface Barkable {
    bark(): void;
}
*/

// 模擬介面 Climbable - 定義行為契約 (沒有專門的 interface 語法)
// 這個概念體現在期望物件擁有 climb() 方法
/*
interface Climbable {
    climb(): void;
}
*/


// Dog 類別 - 繼承 Animal 並「概念上」實作 Barkable
class Dog extends Animal {
    // 使用私有欄位語法 (#) 模擬 private 屬性 - 體現封裝 (ES2022)
    #breed;

    constructor(name, breed) {
        super(name); // 呼叫父類別建構子
        this.#breed = breed;
    }

    // 體現封裝 - 提供公共方法存取私有屬性
    getBreed() {
        return this.#breed;
    }

    // 實作繼承自「抽象類別」的 eat() 方法 - 體現多型
    eat() {
        console.log(`${this.getName()} (a ${this.getBreed()}) is eating dog food.`);
    }

    // 實作「概念上」的 Barkable 介面中的 bark() 方法 - 體現多型
    bark() {
        console.log(`${this.getName()} (a ${this.getBreed()}) is barking woof!`);
    }

    // 覆寫繼承自父類別的 makeSound() 方法 - 體現多型
    makeSound() {
        this.bark(); // Dog 發出吠叫聲
    }
}

// Cat 類別 - 繼承 Animal 並「概念上」實作 Climbable
class Cat extends Animal {
     // 使用私有欄位語法 (#) 模擬 private 屬性
    #color;

    constructor(name, color) {
        super(name); // 呼叫父類別建構子
        this.#color = color;
    }

    // 體現封裝 - 提供公共方法存取私有屬性
    getColor() {
        return this.#color;
    }

    // 實作繼承自「抽象類別」的 eat() 方法 - 體現多型
    eat() {
        console.log(`${this.getName()} (a ${this.getColor()} cat) is eating cat food.`);
    }

    // 實作「概念上」的 Climbable 介面中的 climb() 方法 - 體現多型
    climb() {
        console.log(`${this.getName()} (a ${this.getColor()} cat) is climbing a tree.`);
    }

    // 覆寫繼承自父類別的 makeSound() 方法 - 體現多型
    makeSound() {
         console.log(`${this.getName()} (a ${this.getColor()} cat) meows.`);
    }
}


// --- 主執行程式碼 ---

// 物件的建立 (Instantiation)
const dog = new Dog("naafiri", "Golden Retriever");
const cat = new Cat("yumi", "Calico");

// 呼叫特定於子類別的方法 (體現繼承和子類別特有功能)
dog.bark();
cat.climb();

// 呼叫覆寫的方法 (多型 - Polymorphism)
dog.eat();
cat.eat();


console.log("\n--- 多型範例 (使用基底類別引用) ---");
// 使用父類別的引用指向子類別的物件 - 體現多型 (在 JS 中就是簡單的變數賦值)
const animalDog = dog;
const animalCat = cat;

// 透過父類別引用呼叫子類別覆寫的方法
// JS 會在運行時根據物件的實際原型鏈找到正確的方法
animalDog.eat(); // 呼叫 Dog 的 eat() 方法
animalCat.eat(); // 呼叫 Cat 的 eat() 方法

animalDog.makeSound(); // 呼叫 Dog 的 makeSound() 方法
animalCat.makeSound(); // 呼叫 Cat 的 makeSound() 方法

console.log("\n--- 多型範例 (使用「概念上」的介面) ---");
// JS 沒有介面引用這種語法，我們依賴鴨子型別和運行時檢查
// 判斷一個物件是否「像」一個 Barkable 或 Climbable
function performBark(animal) {
    // 運行時檢查物件是否有所需的方法 (鴨子型別)
    if (typeof animal.bark === 'function') {
        animal.bark(); // 如果有，就呼叫它
    } else {
        console.log(`${animal.getName()} 不會叫!`);
    }
}

function performClimb(animal) {
     if (typeof animal.climb === 'function') {
        animal.climb();
    } else {
        console.log(`${animal.getName()} 不會爬!`);
    }
}

performBark(dog); // Dog 執行 bark()
performBark(cat); // Cat 沒有 bark() 方法，輸出「不會叫!」

performClimb(dog); // Dog 沒有 climb() 方法，輸出「不會爬!」
performClimb(cat); // Cat 執行 climb()


console.log("\n--- 封裝範例 (Encapsulation) ---");
// 透過公共方法存取私有屬性 (getters)
console.log(dog.getName() + " is a " + dog.getBreed()); // 使用 getter 存取 breed
console.log(cat.getName() + " is a " + cat.getColor() + " cat"); // 使用 getter 存取 color

// 嘗試直接存取私有欄位會導致語法錯誤或 undefined (取決於語法和環境)
// console.log(dog.#breed); // 語法錯誤 (在模組外部)
// console.log(cat.#color); // 語法錯誤 (在模組外部)

// 嘗試直接存取「模擬 protected」屬性 (可以，但約定上不應該)
// console.log(dog._name); // 輸出: naafiri (在模組外部，可以存取 _name，這就是約定的侷限性)