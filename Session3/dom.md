# Understanding the DOM (Document Object Model) and Manipulating it with JavaScript

The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a web page as a tree of objects, enabling developers to interact with and manipulate the content, structure, and styling dynamically.

---

## **What is the DOM?**
The DOM is an abstraction of the HTML document. It allows scripts like JavaScript to update the document's content, structure, and styles.

### **Key Concepts**
1. **Nodes**: The basic unit of the DOM, including elements, text, attributes, and comments.
2. **Tree Structure**: Represents the hierarchy of elements in an HTML document.
3. **API**: Methods and properties provided to manipulate nodes and elements.

### **DOM Tree Example**
Here’s an HTML example and its corresponding DOM representation:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Example</title>
  </head>
  <body>
    <h1>Hello, DOM!</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
```

**Visual Representation**:  
![DOM Tree](https://upload.wikimedia.org/wikipedia/commons/5/5a/DOM-model.svg)

---

## **Accessing DOM Elements**

JavaScript provides several methods to access elements in the DOM. Before diving into examples, let’s understand each selector.

### **1. Selecting Elements by ID**
- An **ID** is a unique identifier for an HTML element.
- The `getElementById` method allows you to retrieve an element by its ID.

#### Example
```html
<div id="example">Hello, World!</div>
<script>
  // Accessing the element with ID "example"
  const element = document.getElementById("example");
  console.log(element.textContent); // Output: Hello, World!
</script>
```
- **Explanation**:
  - The `getElementById("example")` method targets the `<div>` element with the `id="example"` attribute.

---

### **2. Selecting Elements by Class Name**
- A **class** is used to apply styles or behaviors to groups of elements.
- The `getElementsByClassName` method retrieves all elements with a specific class name.

#### Example
```html
<div class="sample">Item 1</div>
<div class="sample">Item 2</div>
<script>
  // Accessing all elements with class "sample"
  const elements = document.getElementsByClassName("sample");
  console.log(elements[0].textContent); // Output: Item 1
  console.log(elements[1].textContent); // Output: Item 2
</script>
```
- **Explanation**:
  - The `getElementsByClassName("sample")` method returns a collection of all elements with the `class="sample"` attribute.

---

### **3. Query Selector and Query Selector All**
- The `querySelector` method retrieves the first element that matches a CSS selector.
- The `querySelectorAll` method retrieves all elements that match a CSS selector.

#### Example
```html
<p class="note">First note</p>
<p class="note">Second note</p>
<script>
  // Access the first element with class "note"
  const firstNote = document.querySelector(".note");
  console.log(firstNote.textContent); // Output: First note

  // Access all elements with class "note"
  const allNotes = document.querySelectorAll(".note");
  console.log(allNotes.length); // Output: 2
</script>
```
- **Explanation**:
  - `querySelector(".note")` selects the first `<p>` element with the class `note`.
  - `querySelectorAll(".note")` selects all `<p>` elements with the class `note`.

---

## **Manipulating the DOM**

### **1. Changing Content**
You can modify the text or HTML of an element:
```html
<div id="content">Old Text</div>
<script>
  const element = document.getElementById("content");
  element.textContent = "New Text"; // Updates text content
  element.innerHTML = "<strong>New Content</strong>"; // Adds bold HTML content
</script>
```
- **Explanation**:
  - `textContent` changes only the plain text inside the element.
  - `innerHTML` allows HTML content to be inserted.

---

### **2. Adding Elements**
You can dynamically add new elements to the DOM:
```html
<ul id="list">
  <li>Item 1</li>
</ul>
<script>
  const list = document.getElementById("list");
  const newItem = document.createElement("li");
  newItem.textContent = "Item 2"; // Create new list item
  list.appendChild(newItem); // Add it to the list
</script>
```
- **Explanation**:
  - `document.createElement("li")` creates a new `<li>` element.
  - `appendChild(newItem)` appends the new `<li>` element to the `<ul>` list.

---

### **3. Removing Elements**
You can remove elements using `removeChild` or `remove`:
```html
<div id="container">
  <p id="remove-me">Remove this paragraph</p>
</div>
<script>
  const container = document.getElementById("container");
  const removeMe = document.getElementById("remove-me");
  container.removeChild(removeMe); // Alternative: removeMe.remove();
</script>
```
- **Explanation**:
  - `removeChild` removes the specified child element from its parent.
  - `remove` directly removes the element.

---

## **Event Listeners**
Event listeners let you handle user interactions. Here are some major types:

### **1. `click` Event**
Triggered when an element is clicked.
```html
<button id="btn">Click Me</button>
<script>
  const button = document.getElementById("btn");
  button.addEventListener("click", () => {
    alert("Button clicked!");
  });
</script>
```

### **2. `mouseover` Event**
Triggered when the mouse pointer hovers over an element.
```html
<div id="hover-me">Hover over me</div>
<script>
  const div = document.getElementById("hover-me");
  div.addEventListener("mouseover", () => {
    div.style.color = "blue";
  });
</script>
```

### **3. `input` Event**
Triggered when the value of an input field changes.
```html
<input type="text" id="name" placeholder="Enter your name" />
<script>
  const input = document.getElementById("name");
  input.addEventListener("input", (event) => {
    console.log("Value entered: ", event.target.value);
  });
</script>
```

### **4. `keydown` and `keyup` Events**
Triggered when a key is pressed or released.
```html
<input type="text" id="keyboard-input" placeholder="Type something" />
<script>
  const input = document.getElementById("keyboard-input");

  input.addEventListener("keydown", (event) => {
    console.log("Key down: ", event.key);
  });

  input.addEventListener("keyup", (event) => {
    console.log("Key up: ", event.key);
  });
</script>
```

### **5. `submit` Event**
Triggered when a form is submitted.
```html
<form id="my-form">
  <input type="text" name="name" required />
  <button type="submit">Submit</button>
</form>
<script>
  const form = document.getElementById("my-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log("Form submitted!");
  });
</script>
```

### **6. `resize` Event**
Triggered when the window is resized.
```html
<script>
  window.addEventListener("resize", () => {
    console.log("Window resized to: ", window.innerWidth, "x", window.innerHeight);
  });
</script>
```

### **7. `scroll` Event**
Triggered when the user scrolls.
```html
<div id="scrollable" style="height: 100px; overflow-y: scroll;">
  <p>Scroll inside this box to see the event in action.</p>
  <p>More content...</p>
</div>
<script>
  const scrollable = document.getElementById("scrollable");
  scrollable.addEventListener("scroll", () => {
    console.log("Scrolled: ", scrollable.scrollTop);
  });
</script>
```

---

# **Event Capturing and Bubbling in JavaScript**

Event handling in JavaScript involves two key phases: **Capturing** and **Bubbling**. Understanding these phases is essential for building robust event-driven web applications.

---

## **1. Event Phases**

### **Event Capturing (Trickling Phase)**
- Events propagate from the root of the document (e.g., `document`) down to the target element.
- Also called the **trickling phase**.
- Capturing allows you to handle events *before* they reach the target element.

### **Event Bubbling**
- Events propagate from the target element back up to the root (e.g., `document`).
- Bubbling is the default behavior for most events in JavaScript.

---

## **2. How Event Capturing and Bubbling Work**

Let’s say you have the following HTML structure:

```html
<div id="parent" style="padding: 20px; background-color: lightblue;">
  Parent Div
  <button id="child" style="margin: 10px;">Child Button</button>
</div>
```

### **JavaScript Example: Capturing and Bubbling**
```javascript
const parentDiv = document.getElementById("parent");
const childButton = document.getElementById("child");

// Add capturing phase listener to the parent
parentDiv.addEventListener(
  "click",
  (e) => {
    console.log("Parent Div (Capturing Phase)");
  },
  true // Enables capturing phase
);

// Add bubbling phase listener to the parent
parentDiv.addEventListener("click", (e) => {
  console.log("Parent Div (Bubbling Phase)");
});

// Add listener to the child button
childButton.addEventListener("click", (e) => {
  console.log("Child Button Clicked");
});
```

### **Output Explanation**
1. If you click the button (`#child`):
   - Capturing Phase: Logs `"Parent Div (Capturing Phase)"` first.
   - Target Phase: Logs `"Child Button Clicked"`.
   - Bubbling Phase: Logs `"Parent Div (Bubbling Phase)"`.

2. The order of event propagation is:
   - **Capturing → Target → Bubbling**.

---

## **3. Understanding the `e` Argument**

The `e` parameter in the event listener function is an **Event Object**. It provides information about the event and methods to control it.

### **Key Properties of `e`**
| Property        | Description                                                  |
|-----------------|--------------------------------------------------------------|
| `e.target`      | The element on which the event occurred (child button in this case). |
| `e.currentTarget` | The element on which the event listener is currently executing (parent or child, depending on context). |
| `e.type`        | The type of event (e.g., `click`, `keyup`).                  |
| `e.bubbles`     | `true` if the event bubbles, `false` otherwise.              |

### **Example**
```javascript
childButton.addEventListener("click", (e) => {
  console.log("Target:", e.target); // Logs the button
  console.log("Current Target:", e.currentTarget); // Logs the button (listener is on the button)
  console.log("Event Type:", e.type); // Logs "click"
  console.log("Bubbles:", e.bubbles); // Logs true
});
```

---

## **4. Preventing Default Behavior with `e.preventDefault()`**

The `e.preventDefault()` method prevents the browser’s default behavior for the event.

### **Example: Preventing Form Submission**
```html
<form id="myForm">
  <input type="text" placeholder="Enter text" />
  <button type="submit">Submit</button>
</form>
```

```javascript
document.getElementById("myForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents form submission
  console.log("Form submission prevented!");
});
```

### **When to Use `e.preventDefault()`**
- Preventing form submissions.
- Stopping links (`<a>`) from navigating to a new page.
- Blocking default behavior of specific keys or interactions.

---

## **5. Stopping Event Propagation**

### **`e.stopPropagation()`**
- Stops the event from propagating further (no bubbling or capturing beyond the current element).

### **Example: Stop Propagation**
```javascript
childButton.addEventListener("click", (e) => {
  console.log("Child Button Clicked");
  e.stopPropagation(); // Prevents the event from reaching the parent
});

parentDiv.addEventListener("click", (e) => {
  console.log("Parent Div Clicked");
});
```

### **Output**
1. If you click the button:
   - Logs `"Child Button Clicked"`.
   - The parent’s event handler is not triggered because propagation is stopped.

---

## **6. Combining `preventDefault` and `stopPropagation`**

Both methods can be used together for more control:
```javascript
childButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default action (if any)
  e.stopPropagation(); // Stop the event from propagating further
  console.log("Child Button: Default prevented, propagation stopped");
});
```

---

