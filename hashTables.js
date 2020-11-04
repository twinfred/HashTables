function hashStringToInt(string, tableSize) { // HASHING STRINGS TO INTEGERS!!
  let hash = 11;

  for (let i = 0; i < string.length; i++) {
    hash = (13 * hash * string.charCodeAt(i)) % tableSize; // tableSize is the mod
  }

  return hash;
}

class HashTable {
  table = new Array(3333);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);

    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const index = hashStringToInt(key, newTable.length);
          if (newTable[index]) {
            newTable[index].push([key, value])
          } else {
            newTable[index] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  }

  getItem = key => {
    const index = hashStringToInt(key, this.table.length);

    if (!this.table[index]) {
      return null;
    }

    return this.table[index].find(x => x[0] === key)[1];
  }

  setItem = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.table.length;

    if (loadFactor > 0.8) {
      this.resize()
    }

    const index = hashStringToInt(key, this.table.length);
    if (this.table[index]) {
      this.table[index].push([key, value])
    } else {
      this.table[index] = [[key, value]];
    }
  }
}

// Shorter hash table = more collisions = slower operations (getItem/setItem) -- Less wasted space / Less memory used
// -- Load factor is the percent full threshold to increase the size
// Larger hash table = less collisions = faster /getItem/setItem -- More wasted space / More memory used

const myTable = new HashTable();
myTable.setItem('firstName', 'Tim');
myTable.setItem('lastName', 'Winfred');
myTable.setItem('age', 31);
myTable.setItem('dob', '10/25');

console.log(myTable.getItem('firstName'));
console.log(myTable.getItem('lastName'));
console.log(myTable.getItem('age'));
console.log(myTable.getItem('dob'));