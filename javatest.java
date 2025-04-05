import java.util.*;
import java.lang.*;



public class javatest {
    public static class Animal {
        protected String name;
    
        public Animal(String name) {
            this.name = name;
        }
    
        public void eat() {
            System.out.println(name + " is eating.");
        }
    }
    
    private static class Dog extends Animal {
        public Dog(String name) {
            super(name);   // 調用父類別的建構函式
        }
    
        // 新增方法：吠叫
        public void bark() {
            System.out.println(name + " is barking.");
        }
    
        // 覆寫方法：覆寫父類別的 eat()
        @Override
        public void eat() {
            System.out.println(name + " is eating dog food.");
        }
    }
    public static void main(String[] args) {
        int n = 12;
        Dog dog = new Dog("naafiri"); // 將狗的名字改為 Lucky 更具可讀性
        dog.bark();
        dog.eat(); // 呼叫 Dog 類別覆寫的 eat() 方法
        System.out.println(n); // 輸出: 12 (修正註解)
    }
}

