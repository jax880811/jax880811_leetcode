
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0 ;i<nums.length;i++){
        const element = target - nums[i];
        if(map.has(element)){
            return [map.get(element),i];
        }
        map.set(nums[i],i);
    }
    return []
};

let nums = [3,3];
let target = 6;

console.log(twoSum(nums,target));