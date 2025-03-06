class Solution{
    isAnagram(s, t) {
        if (s.length != t.length){
            return false;
        }
        const sortedS = s.split('').sort().join();
        const sortedT = t.split('').sort().join();
        console.log(sortedS);
        console.log(sortedT);
        return sortedS === sortedT;
        
    };
}

let s = "anagram";
let t = "nagaram";

let solution = new Solution();
console.log(solution.isAnagram(s,t));
/*
這題的第一個方法是將字串的字元分割並做出排序
接著兩個排序好的字串再做比較
如果一樣就回答true
*/