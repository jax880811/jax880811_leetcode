
import java.lang.*;

public class javatest_complete {
    // 抽象類別 Animal - 體現抽象化
    public static abstract class Animal {
        protected String name;

        public Animal(String name) {
            this.name = name;
        }

        // 抽象方法 eat() - 強制子類別實作，體現多型
        public abstract void eat();

        // 具體方法 getName() - 體現封裝 (透過方法存取屬性)
        public String getName() {
            return name;
        }

        // 具體方法 makeSound() - 為多型做準備，子類別可覆寫
        public void makeSound() {
            System.out.println(name + " makes a generic sound.");
        }
    }

    // 介面 Barkable - 定義行為，體現抽象化和多型
    public interface Barkable {
        void bark();
    }

    // 介面 Climbable - 定義行為，體現抽象化和多型
    public interface Climbable {
        void climb();
    }

    // Dog 類別 - 繼承 Animal 並實作 Barkable
    private static class Dog extends Animal implements Barkable {
        private String breed; // Dog 特有的屬性 - 體現封裝

        public Dog(String name, String breed) {
            super(name);
            this.breed = breed;
        }

        public String getBreed() {
            return breed;
        }

        @Override
        public void eat() {
            System.out.println(getName() + " (a " + getBreed() + ") is eating dog food.");
        }

        @Override
        public void bark() {
            System.out.println(getName() + " (a " + getBreed() + ") is barking woof!");
        }

        @Override
        public void makeSound() {
            bark(); // Dog 發出吠叫聲
        }
    }

    // Cat 類別 - 繼承 Animal 並實作 Climbable
    private static class Cat extends Animal implements Climbable {
        private String color; // Cat 特有的屬性 - 體現封裝

        public Cat(String name, String color) {
            super(name);
            this.color = color;
        }

        public String getColor() {
            return color;
        }

        @Override
        public void eat() {
            System.out.println(getName() + " (a " + getColor() + " cat) is eating cat food.");
        }

        @Override
        public void climb() {
            System.out.println(getName() + " (a " + getColor() + " cat) is climbing a tree.");
        }

        @Override
        public void makeSound() {
            System.out.println(getName() + " (a " + getColor() + " cat) meows.");
        }
    }

    public static void main(String[] args) {
        

        // 物件的建立 (Instantiation)
        Dog dog = new Dog("naafiri", "Golden Retriever");
        Cat cat = new Cat("yumi", "Calico");

        // 呼叫特定於子類別的方法
        dog.bark();
        cat.climb();

        // 呼叫覆寫的方法 (多型 - Polymorphism)
        dog.eat();
        cat.eat();

        

        System.out.println("\n--- 多型範例 (Polymorphism) ---");
        // 使用父類別的引用指向子類別的物件
        Animal animalDog = dog;
        Animal animalCat = cat;

        animalDog.eat(); // 呼叫 Dog 的 eat() 方法
        animalCat.eat(); // 呼叫 Cat 的 eat() 方法

        animalDog.makeSound(); // 呼叫 Dog 的 makeSound() 方法 (實際執行 bark())
        animalCat.makeSound(); // 呼叫 Cat 的 makeSound() 方法

        // 呼叫介面方法
        if (animalDog instanceof Barkable) {
            ((Barkable) animalDog).bark();
        }

        if (animalCat instanceof Climbable) {
            ((Climbable) animalCat).climb();
        }

        System.out.println("\n--- 封裝範例 (Encapsulation) ---");
        System.out.println(dog.getName() + " is a " + dog.getBreed());
        System.out.println(cat.getName() + " is a " + cat.getColor() + " cat");
    }
}
