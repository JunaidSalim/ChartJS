# Setting Up JavaScript

Before diving into JavaScript programming, you need to set up your development environment. Here’s how you can get started:

### Tools Needed
1. **Web Browser**: Modern browsers like Chrome, Firefox, or Edge come with built-in JavaScript engines.
2. **Text Editor**: Use a code editor like [Visual Studio Code](https://code.visualstudio.com/) or Sublime Text.

### Setting Up
1. **Create a New HTML File**:
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>JavaScript Setup</title>
    </head>
    <body>
        <h1>Hello, JavaScript!</h1>
        <script src="script.js"></script>
    </body>
    </html>
    ```
2. **Create a JavaScript File**:
    Create a file named `script.js` and link it to your HTML file using the `<script>` tag.

3. **Run the HTML File**:
    Open the HTML file in a web browser to see JavaScript in action.

---

# Introduction to JavaScript

JavaScript was initially developed in 1995 by Brendan Eich while working at Netscape. It was created to add interactivity to web pages, but today, it powers web development, mobile apps, server-side programming, and more.

### Features of JavaScript
- **Lightweight and Fast**: Executes directly in the browser without requiring compilation.
- **Dynamic Typing**: Variable types are determined at runtime.
- **Versatility**: Can be used for both frontend and backend development.
- **Event-Driven**: Responds to user actions like clicks or key presses.
- **Rich Ecosystem**: Includes powerful libraries and frameworks like React, Angular, and Node.js.

---

# Step-by-Step JavaScript Basics

## 1. Comments
Comments are used to explain the code and make it more readable. They are ignored by the JavaScript engine.

```javascript
// Single-line comment

/*
Multi-line comment
Comments do not affect code execution.
*/
```

---

## 2. Variables
Variables store data values. In JavaScript, you can declare variables using `var`, `let`, or `const`.

### How to Declare Variables
```javascript
var age = 25;        // Global or function-scoped
let name = "John";  // Block-scoped
const country = "USA"; // Block-scoped, cannot be reassigned
```

### Rules for Naming Variables
1. Must start with a letter, `_`, or `$`.
2. Cannot start with a number.
3. Cannot use JavaScript reserved keywords.
4. JavaScript is case-sensitive.

---

## 3. Data Types
JavaScript has primitive and derived data types.

### Primitive Data Types
- **String**: Text data
- **Number**: Numeric values
- **Boolean**: `true`/`false`
- **Null**: Absence of value
- **Undefined**: Variable that has not been initialized

### Derived Data Types
- **Arrays**: Ordered collection of values
- **Objects**: Key-value pairs

### Example
```javascript
let text = "Hello";       // String
let age = 30;              // Number
let isHappy = true;        // Boolean
let noValue = null;        // Null
let notAssigned;           // Undefined
let fruits = ["Apple", "Banana", "Cherry"]; // Array
let person = { name: "John", age: 25 };      // Object
```

---

## 4. Operators
### Arithmetic Operators
```javascript
let x = 10, y = 5;
console.log(x + y); // Addition: 15
console.log(x - y); // Subtraction: 5
```


## 6. Control Flow
### If-Else
```javascript
let age = 18;
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

---

## 7. Loops
### For Loop
```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}
```

### While Loop
```javascript
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
```

### For-Of Loop
```javascript
let fruits = ["Apple", "Banana", "Cherry"];
for (let fruit of fruits) {
  console.log(fruit);
}
```

---

## 8. Arrays and Objects
### Arrays
```javascript
let colors = ["Red", "Green", "Blue"];
colors.push("Yellow");
console.log(colors);
```

### Objects
```javascript
let car = {
  brand: "Tesla",
  model: "Model S",
  start: function() {
    console.log("Car started");
  }
};
car.start();
```

