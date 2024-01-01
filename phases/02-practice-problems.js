function anagrams(str1, str2) {
  // Your code here
  let object1 = {};
  let object2 = {};
  for (let i = 0; i < str1.length; i++) {
    if (object1[str1[i]]) {
      object1[str1[i]] += 1;
    } else {
      object1[str1[i]] = 1;
    }
  }
  for (let i = 0; i < str2.length; i++) {
    if (object2[str2[i]]) {
      object2[str2[i]] += 1;
    } else {
      object2[str2[i]] = 1;
    }
  }
  for (let key in object1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}


function commonElements(arr1, arr2) {
  // Your code here
  let array = arr1.concat(arr2)
  let hashtable = {}
  let result = []
  
  for (let i = 0; i < array.length; i++) {
    if (hashtable[`${array[i]}`]) {
      hashtable[`${array[i]}`]++ 
    } else {
      hashtable[`${array[i]}`] = 1
    }
  }

  for (let key in hashtable) {
    if (hashtable[key] > 1) {
      result.push(parseInt(key))
    } 
  }

  return result
}


function duplicate(arr) {
  // Your code here
  let hashtable = {}

  for (let i = 0; i < arr.length; i++) {
    let key = `${arr[i]}`
    if (hashtable[key]) {
      return parseInt(key)
    } else {
      hashtable[key] = 1
    }
  }
}


function twoSum(nums, target) {
  const hashtable = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (hashtable.hasOwnProperty(complement.toString())) {
      return true; // Return true if a pair exists
    }
    
    hashtable[nums[i]] = i;
  }
  
  return false; // Return false if no such pair exists
}



function wordPattern(pattern, strings) {
  // Your code here
  const meanings = {};
  const hashtable = {};
  const seen = {};

  for (let i = 0; i < pattern.length; i++) {
    hashtable[pattern[i]] = strings[i];
    seen[strings[i]] = false;
  }

  for (let i = 0; i < pattern.length; i++) {
    const character = pattern[i];
    const string = strings[i];

    if (!meanings[character]) {
      if (seen[string]) {
        return false;
      }
      meanings[character] = string;
      seen[string] = true;
    } else {
      if (meanings[character] !== string) {
        return false;
      }
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];