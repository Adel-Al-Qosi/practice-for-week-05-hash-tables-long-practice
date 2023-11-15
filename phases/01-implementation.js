class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets
    this.data = new Array(numBuckets).fill(null)
    this.count = 0
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    const newPair = new KeyValuePair(key, value)
    const index = this.hashMod(key)

    if (!(this.data[index])) {
      this.data[index] = newPair
      this.count++
    } else {
      let notInserted = true
      let listHead = this.data[index]
      while (listHead) {
        if (listHead.key === key) {
          listHead.value = value
          notInserted = false
        }
        listHead = listHead.next
      }

      if (notInserted) {
        const lastHead = this.data[index]
        newPair.next = lastHead
        this.data[index] = newPair
        this.count++
      }
    }

    const loadFactor = (this.count + 1) / this.capacity;
    if (loadFactor > 0.7) this.resize()
  }


  read(key) {
    // Your code here
    const index = this.hashMod(key)
    let head = this.data[index]
    while (head) {
      if (key === head.key) return head.value
      head = head.next
    }

    return;
  }


  resize() {
    // Your code here
    const resizedData = new Array(this.capacity * 2).fill(null)
    this.capacity *= 2
    this.data.forEach(element => {
      while (element){
        const pair = new KeyValuePair(element.key, element.value)
        const index = this.hashMod(element.key)
        pair.next = resizedData[index]
        resizedData[index] = pair

        element = element.next
      }
    })

    this.data = resizedData
  }


  delete(key) {
    // Your code here
    let index = this.hashMod(key)
    if (this.data[index]) {
      let element = this.data[index]
      let previousNode = null
      if (element.key === key) {
        this.data[index] = element.next
        this.count--
      } else {
        while (element.next) {
          previousNode = element
          element = element.next
          if (element.key === key) {
            previousNode.next = element.next
            this.count--
            break
          }
        }
        return 'Key not found'
      }
    } else {
      return 'Key not found'
    }
  }
}


module.exports = HashTable;