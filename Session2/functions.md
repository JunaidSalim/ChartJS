# Understanding Functions in JavaScript

## What is a Function in Programming?

A **function** is a reusable block of code designed to perform a specific task. Functions help break down complex problems into smaller, manageable pieces and promote code reuse.

![What is a Function?](data:image/png;base64,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)

---

## Functions in JavaScript

In JavaScript, a function is a block of code that can be invoked (or called) to perform a task. Functions are fundamental building blocks in JavaScript and are used extensively to execute logic, manipulate data, and structure programs.

### Components of a Function:

1.  **Function Name**: Identifies the function.
2.  **Parameters**: Input values provided to the function. Parameters can be of any type, including:

    - **Primitive Types**: Numbers, Strings, Booleans, etc.
      ```javascript
      function greet(name) {
        console.log(`Hello, ${name}!`);
      }
      greet("Alice"); // Output: Hello, Alice!
      ```
    - **Objects**: Arrays, Objects, Functions, etc.
      ```javascript
      function printArray(arr) {
        arr.forEach((item) => console.log(item));
      }
      printArray([1, 2, 3]); // Output: 1 2 3
      ```
    - **Default Parameters**: Values assigned to parameters if no argument is provided.
      ```javascript
      function greet(name = "Guest") {
        console.log(`Welcome, ${name}!`);
      }
      greet(); // Output: Welcome, Guest!
      ```
    - **Rest Parameters**: Allows passing an indefinite number of arguments as an array.
      ```javascript
      function sum(...numbers) {
        let total = 0;
        for (let num of numbers) {
          total += num;
        }
        return total;
      }
      console.log(sum(1, 2, 3, 4)); // Output: 10
      ```

3.  **Function Body**: The block of code inside curly braces `{}` that performs the task.
4.  **Return Value**: The output value (optional) returned by the function.

### General Syntax:

```javascript
function functionName(parameters) {
  // Function body
  return value; // Optional
}
```

---

## Types of Functions in JavaScript

1. **User-Defined Functions**: Functions that are created by the developer.
2. **Built-In Functions**: Functions provided by JavaScript, such as `Math.max()` or `Array.map()`.

---

## User-Defined Functions

User-defined functions can be declared in various ways:

1. **Named Functions**
2. **Anonymous Functions**
3. **Arrow Functions**
4. **Recursive Functions**

### 1. Named Functions
Named functions have a specific name and are declared using the `function` keyword.

#### Example:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Junaid")); // Output: Hello, Junaid!
```

---

### 2. Anonymous Functions
Anonymous functions do not have a name and are often used as arguments or assigned to variables.

#### Example:

```javascript
const greet = function (name) {
  return `Hi, ${name}!`;
};
console.log(greet("Ali")); // Output: Hi, Ali!
```

---

### 3. Arrow Functions
Arrow functions are a concise way to write functions introduced in ES6.

#### Syntax:

```javascript
const functionName = (parameters) => {
  // Function body
};
```

#### Example:

```javascript
const add = (a, b) => a + b;
console.log(add(5, 3)); // Output: 8

const greet = (name = "Guest") => `Hello, ${name}!`;
console.log(greet()); // Output: Hello, Guest!
console.log(greet("Sara")); // Output: Hello, Sara!
```

---

### 4. Recursive Functions

Recursive functions call themselves until a condition is met.

To define recursive functions, the following requirements must be fulfilled:

1. The function must call itself.
2. There should be a base condition.
3. For each iteration, the function must approach the base condition.

#### Example:

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // Output: 120

function countdown(n) {
  if (n < 1) return;
  console.log(n);
  countdown(n - 1);
}
countdown(5); // Output: 5, 4, 3, 2, 1
```

![Recursive Function](data:image/jpeg;base64,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)

---

## Declaring a Function in JavaScript

Functions can be declared in several ways:

1. **Function Declaration**:
   ```javascript
   function greet() {
     console.log("Hello!");
   }
   greet(); // Output: Hello!
   ```

2. **Function Expression**:
   ```javascript
   const greet = function () {
     console.log("Hello!");
   };
   greet(); // Output: Hello!
   ```

3. **Arrow Function**:
   ```javascript
   const greet = () => {
     console.log("Hello!");
   };
   greet(); // Output: Hello!
   ```

---

## Built-In Functions in JavaScript

### 1. Array Functions

- **map()**: Creates a new array by applying a function to each element.
  ```javascript
  const numbers = [1, 2, 3];
  const squares = numbers.map((num) => num * num);
  console.log(squares); // Output: [1, 4, 9]
  ```

- **filter()**: Filters elements based on a condition.
  ```javascript
  const numbers = [1, 2, 3, 4];
  const evenNumbers = numbers.filter((num) => num % 2 === 0);
  console.log(evenNumbers); // Output: [2, 4]
  ```

- **push()**: Adds one or more elements to the end of an array.
  ```javascript
  const fruits = ["apple", "banana"];
  fruits.push("orange");
  console.log(fruits); // Output: ["apple", "banana", "orange"]
  ```

- **pop()**: Removes the last element from an array.
  ```javascript
  const fruits = ["apple", "banana", "orange"];
  fruits.pop();
  console.log(fruits); // Output: ["apple", "banana"]
  ```

- **find()**: Returns the first element that satisfies the condition.
  ```javascript
  const numbers = [1, 2, 3, 4];
  const firstEven = numbers.find((num) => num % 2 === 0);
  console.log(firstEven); // Output: 2
  ```

### 2. String Functions

- **toUpperCase()**: Converts a string to uppercase.
  ```javascript
  const text = "hello";
  console.log(text.toUpperCase()); // Output: HELLO
  ```

- **split()**: Splits a string into an array of substrings.
  ```javascript
  const text = "hello world";
  console.log(text.split(" ")); // Output: ["hello", "world"]
  ```

- **replace()**: Replaces a specified value with another value in a string.
  ```javascript
  const text = "hello world";
  console.log(text.replace("world", "JavaScript")); // Output: hello JavaScript
  ```

### 3. Other Built-In Functions

- **Math.max()**: Returns the largest of the given numbers.
  ```javascript
  console.log(Math.max(1, 5, 10)); // Output: 10
  ```

- **Math.random()**: Returns a random number between 0 and 1.
  ```javascript
  console.log(Math.random()); // Output: Random number between 0 and 1
  ```

- **Date()**: Returns the current date and time.
  ```javascript
  console.log(new Date());
  ```

- **parseInt()**: Parses a string and returns an integer.
  ```javascript
  console.log(parseInt("42")); // Output: 42
  ```


## Synchronous and Asynchronous Functions

### 1. Synchronous Functions

#### What Are They?
Synchronous functions execute one line at a time, **in order**. The next line of code does not run until the current function is finished.

#### When to Use?
- For tasks that are quick and do not need to wait for something else (like simple calculations).

#### Example

```javascript
function add(a, b) {
  return a + b;
}

console.log("Start");
console.log("Result:", add(5, 3)); // Output: Result: 8
console.log("End");
// Output:
// Start
// Result: 8
// End
```

### Key Idea:
Everything happens one after another, like waiting in line.

---

### 2. Asynchronous Functions

#### What Are They?
Asynchronous functions allow your program to **keep going** while waiting for a task to finish (like fetching data from the internet). They don’t make your program wait.

#### When to Use?
- When the task takes time, like:
  - Getting data from a server.
  - Waiting for a timer.
  - Reading files.

#### Examples

##### Example with a Timer

```javascript
console.log("Start");

setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

console.log("End");
// Output:
// Start
// End
// This runs after 2 seconds
```

Notice how "End" prints before the timer finishes? That’s asynchronous!

---

### How to Write Asynchronous Code

You can write asynchronous code in different ways:

#### 1. Using Callbacks

A **callback** is a function you give to another function to call when it’s done.

```javascript
function fetchData(callback) {
  console.log("Fetching data...");
  setTimeout(() => {
    console.log("Data fetched!");
    callback();
  }, 2000);
}

function processData() {
  console.log("Processing data...");
}

fetchData(processData);
// Output:
// Fetching data...
// Data fetched!
// Processing data...
```

---

#### 2. Using Promises

A **Promise** is a way to handle something that will finish in the future. It can:
- **Resolve** (success) or
- **Reject** (failure).

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Change to false to simulate failure
      if (success) {
        resolve("Data fetched successfully!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 2000);
  });
}

fetchData()
  .then((message) => console.log(message)) // Output: Data fetched successfully!
  .catch((error) => console.error(error)); // Output: Failed to fetch data (if failed)
```

---

#### 3. Using Async/Await

**Async/Await** makes writing asynchronous code easier to read and understand.

```javascript
async function fetchData() {
  console.log("Fetching data...");
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 2000);
  });

  const result = await promise; // Wait for the promise to resolve
  console.log(result);
}

fetchData();
// Output:
// Fetching data...
// Data fetched!
```

---

### Quick Comparison: Synchronous vs Asynchronous

| **Aspect**          | **Synchronous**              | **Asynchronous**                |
|----------------------|------------------------------|----------------------------------|
| **Execution**        | One line at a time           | Keeps going while waiting       |
| **Use Case**         | Simple, quick tasks          | Tasks that take time (like APIs)|
| **Examples**         | Math operations              | Fetching data, timers           |

---
