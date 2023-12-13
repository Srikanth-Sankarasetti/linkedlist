const readline = require('readline');

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Add a node to the end of the linked list
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    current.next = newNode;
  }

  // Reverse the linked list
  reverse() {
    let prev = null;
    let current = this.head;
    let next = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  // Find the second-largest number in the linked list
  findSecondLargest() {
    if (!this.head || !this.head.next) {
      console.log("List is empty or contains only one element.");
      return;
    }

    let firstMax = -Infinity;
    let secondMax = -Infinity;
    let current = this.head;

    while (current) {
      if (current.data > firstMax) {
        secondMax = firstMax;
        firstMax = current.data;
      } else if (current.data > secondMax && current.data < firstMax) {
        secondMax = current.data;
      }

      current = current.next;
    }

    return secondMax;
  }

  // Print the linked list
  print() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}

// Function to take numbers from the user using readline
async function takeNumbersFromUser() {
  const linkedList = new LinkedList();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let n = await new Promise(resolve => {
    rl.question("Enter the number of elements: ", resolve);
  });

  for (let i = 0; i < n; i++) {
    let data = await new Promise(resolve => {
      rl.question(`Enter element #${i + 1}: `, resolve);
    });
    linkedList.append(parseFloat(data)); // Convert input to numbers
  }

  rl.close();
  return linkedList;
}

// Example usage
(async () => {
  const userLinkedList = await takeNumbersFromUser();

  console.log("\nOriginal Linked List:");
  userLinkedList.print();

  userLinkedList.reverse();

  console.log("\nReversed Linked List:");
  userLinkedList.print();

  const secondLargest = userLinkedList.findSecondLargest();
  console.log("\nSecond Largest Number:", secondLargest);
})();
