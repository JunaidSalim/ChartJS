# 1. Reading CSV in JavaScript

## Using Fetch API to Read and Parse CSV Files
```javascript

// File Path to the Local CSV
        const filePath = './first_chart.csv';

        // Function to fetch and parse CSV
        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.statusText}`);
                }

                const text = await response.text();
                return text
                    .trim()
                    .split('\n')
                    .map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        // Fetch and Render Chart
        fetchCSV(filePath)
            .then(data => {
                // Extract labels (first row)
                const labels = data[0];

                // Extract data rows
                const rows = data.slice(1);

                // Separate categories (X-axis) and values (Y-axis)
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));
            })
            .catch(error => console.error('Error:', error));
```

## Working of fetchCSV Function:

### Code:
```javascript
const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const text = await response.text();
```

### **Explanation**

This code snippet fetches a file (in this case, a CSV file) from the specified `filePath` using the `fetch` API. Let's break it down step by step:

---

### **1. `const response = await fetch(filePath);`**
- **Purpose**: Sends an HTTP request to the provided `filePath` and waits for the server's response.
- **How**:
  - The `fetch` function returns a `Promise` that resolves to a `Response` object representing the HTTP response.
  - The `await` keyword pauses the function execution until the `Promise` resolves, ensuring the response is fully received.

---

### **2. `if (!response.ok)`**
- **Purpose**: Checks if the HTTP response status indicates success.
- **How**:
  - The `ok` property of the `Response` object is `true` for successful HTTP status codes (200–299).
  - If the status code is outside this range (e.g., 404 for "Not Found" or 500 for "Server Error"), the condition evaluates to `true`.

---

### **3. `throw new Error(...)`**
- **Purpose**: Throws an error if the response is not successful.
- **Why**:
  - This ensures that if the file cannot be fetched (e.g., due to a missing file or network issue), the error is explicitly reported and can be handled by `catch`.
- **Example Error**:
  If the server returns a 404 error:
  ```javascript
  Error: Failed to fetch file: Not Found
  ```

---

### **4. `const text = await response.text();`**
- **Purpose**: Extracts the response body as plain text.
- **How**:
  - The `text()` method reads the response's body stream and returns a `Promise` that resolves to a string containing the file's content.
  - `await` ensures the function waits for the text to be fully read.

---

### **What is in `response.text()`?**
The `response.text()` method gives you the **content** of the file as a plain string. If the file is a CSV file, the content will look like this:

**Example CSV File (`data.csv`):**
```
Name,Age,City
Alice,30,New York
Bob,25,Los Angeles
```

**Value of `text`:**
```javascript
"Name,Age,City\nAlice,30,New York\nBob,25,Los Angeles"
```

---

### **How the Code Works Together**
1. `fetch(filePath)`:
   - Sends a request to fetch the file from the specified path.

2. `if (!response.ok)`:
   - Ensures the response is successful; otherwise, an error is thrown.

3. `response.text()`:
   - Reads the file's content and converts it into a plain string for further processing (e.g., parsing it into rows and columns).

---

### **Why Use `response.text()`?**
- The `.text()` method is ideal for reading plain text files, such as `.txt` or `.csv`, where you want to process the content in its raw string format.
- If you were working with JSON or binary data, you’d use `.json()` or `.arrayBuffer()` instead.
---

### Code:
```javascript
return text
    .trim()
    .split('\n')
    .map(row => row.split(',').map(cell => cell.trim()));
```

### Steps:

---

#### **1. `text.trim()`**
- **Purpose**: Removes leading and trailing whitespace from the input string.
- **Why**: When reading text from a file, there might be extra spaces or blank lines at the beginning or end of the file. `trim()` ensures that these are removed before further processing.
- **Input Example**:  
  ```
  "  Name, Age, City\nAlice, 30, New York\nBob, 25, Los Angeles  "
  ```
- **Output**:  
  ```
  "Name, Age, City\nAlice, 30, New York\nBob, 25, Los Angeles"
  ```

---

#### **2. `.split('\n')`**
- **Purpose**: Splits the string into an array of lines using the newline character (`\n`) as a delimiter.
- **Why**: CSV files are structured with rows of data separated by newlines, so splitting the text into an array of rows is essential for processing.
- **Input Example**:  
  ```
  "Name, Age, City\nAlice, 30, New York\nBob, 25, Los Angeles"
  ```
- **Output**:  
  ```javascript
  ["Name, Age, City", "Alice, 30, New York", "Bob, 25, Los Angeles"]
  ```

---

#### **3. `.map(row => row.split(','))`**
- **Purpose**: Iterates over each line (row) in the array, splitting the row into an array of cells using the comma (`,`) as a delimiter.
- **Why**: Each line in the CSV represents a row of data, and commas separate the individual values within the row. This step turns each line into an array of individual values (cells).
- **Input Example**:  
  ```javascript
  ["Name, Age, City", "Alice, 30, New York", "Bob, 25, Los Angeles"]
  ```
- **Output**:  
  ```javascript
  [
    ["Name", " Age", " City"],
    ["Alice", " 30", " New York"],
    ["Bob", " 25", " Los Angeles"]
  ]
  ```

---

#### **4. `.map(cell => cell.trim())` (Inner Map)**
- **Purpose**: Removes leading and trailing whitespace from each cell in the row.
- **Why**: In CSV files, there may be spaces around values. This step ensures clean data by removing unnecessary spaces.
- **Input Example**:  
  ```javascript
  ["Name", " Age", " City"]
  ```
- **Output**:  
  ```javascript
  ["Name", "Age", "City"]
  ```

---

#### **Final Output**
After processing all rows and cells, the function returns a 2D array where:
- Each inner array represents a row of data.
- Each element of the inner array is a trimmed string value.

**Example Input (text):**
```
"  Name, Age, City\nAlice, 30, New York\nBob, 25, Los Angeles  "
```

**Example Output:**
```javascript
[
  ["Name", "Age", "City"],
  ["Alice", "30", "New York"],
  ["Bob", "25", "Los Angeles"]
]
```

---

### Explanation of Purpose
This function:
1. Cleans the raw CSV text by trimming extra spaces.
2. Splits the text into rows based on newline characters.
3. Splits each row into cells based on commas.
4. Cleans up each cell's content by trimming whitespace.

---

### **Code Explanation of fetchCSV function**

### Code:
```javascript
fetchCSV(filePath)
    .then(data => {
        // Extract labels (first row)
        const labels = data[0];

        // Extract data rows
        const rows = data.slice(1);

        // Separate categories (X-axis) and values (Y-axis)
        const categories = rows.map(row => row[0]);
        const values = rows.map(row => parseFloat(row[1]));
    })
    .catch(error => console.error('Error:', error));
```

#### **1. `const labels = data[0];`**
- **Purpose**: Extracts the first row from the `data` array, which contains the column headers or labels in the CSV file.
- **Why**: The first row of a CSV file often describes the data structure (e.g., "Name", "Age", "City"). These labels are used for reference or chart legends.
- **Input Example (`data`):**
  ```javascript
  [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "Los Angeles"]
  ]
  ```
- **Output (`labels`):**
  ```javascript
  ["Name", "Age", "City"]
  ```

---

#### **2. `const rows = data.slice(1);`**
- **Purpose**: Extracts all rows except the first one (the actual data rows) from the `data` array.
- **Why**: The first row contains headers, so slicing from index `1` skips it and focuses on the actual data.
- **Input Example (`data`):**
  ```javascript
  [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "Los Angeles"]
  ]
  ```
- **Output (`rows`):**
  ```javascript
  [
    ["Alice", "30", "New York"],
    ["Bob", "25", "Los Angeles"]
  ]
  ```

---

#### **3. `const categories = rows.map(row => row[0]);`**
- **Purpose**: Extracts the first element of each row (often used as categories for the X-axis in a chart).
- **Why**: The first column in CSV data typically contains names or categories.
- **How**:
  - `rows.map()` iterates over each row.
  - `row[0]` selects the first value of each row.
- **Input Example (`rows`):**
  ```javascript
  [
    ["Alice", "30", "New York"],
    ["Bob", "25", "Los Angeles"]
  ]
  ```
- **Output (`categories`):**
  ```javascript
  ["Alice", "Bob"]
  ```

---

#### **4. `const values = rows.map(row => parseFloat(row[1]));`**
- **Purpose**: Extracts the second element of each row (often numeric values for the Y-axis) and converts them from strings to numbers.
- **Why**: In CSV data, numeric values are stored as strings. `parseFloat` ensures they are converted to numbers for operations like plotting charts.
- **How**:
  - `rows.map()` iterates over each row.
  - `parseFloat(row[1])` converts the second value (index `1`) of each row into a number.
- **Input Example (`rows`):**
  ```javascript
  [
    ["Alice", "30", "New York"],
    ["Bob", "25", "Los Angeles"]
  ]
  ```
- **Output (`values`):**
  ```javascript
  [30, 25]
  ```

---

### **How the Data is Used**
- **`labels`**: Used for legends or descriptive purposes in charts.
- **`categories`**: Represents the X-axis labels (e.g., names or categories).
- **`values`**: Represents the Y-axis values (e.g., numeric data points).


## Code Snippet:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reading CSV</title>
</head>
<body>
    <canvas id="myChart" width="400" height="200"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // File Path to the Local CSV
        const filePath = './first_chart.csv';

        // Function to fetch and parse CSV
        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.statusText}`);
                }

                const text = await response.text();
                return text
                    .trim()
                    .split('\n')
                    .map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        // Fetch and Render Chart
        fetchCSV(filePath)
            .then(data => {
                // Extract labels (first row)
                const labels = data[0];

                // Extract data rows
                const rows = data.slice(1);

                // Separate categories (X-axis) and values (Y-axis)
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));

                console.log('Data:', data);
                console.log('Labels:', labels);
                console.log('Categories:', categories);
                console.log('Values:', values);

                // Create Chart
                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: labels[1],
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>
</html>
```

## How to Add Chart Title?

To add a title to a chart in **Chart.js**, you can use the `plugins.title` configuration. Chart.js provides a built-in plugin for titles, which you can customize by setting properties like the title text, font size, position, and more.

Here's an example of how to add and customize a chart title:

---

### **Code Example**
```javascript
options: {
    responsive: true, // Makes the chart responsive
    plugins: {
    title: {
        display: true, // Enables the title
        text: 'How Long Should the Perfect Streaming Series Last?', // Title text
        font: {
            size: 18, // Font size for the title
            family: 'Arial, sans-serif', // Font family
            weight: 'bold' // Font weight
        },
        color: 'rgba(255,0,0,1)', // Title color
        padding: {
            top: 0,
            bottom: 0 // Space around the title
        },
        align: 'center', // Title alignment
        position: 'top' // Title position
    }
}
}
```
---

### **Key Properties for `title`**
1. **`display`**:
   - Type: `boolean`
   - Description: Toggles the display of the title.
   - Example: `display: true`

2. **`text`**:
   - Type: `string` or `array` of strings
   - Description: The text content of the title. You can use an array of strings for multiline titles.
   - Example: `text: 'Monthly Sales Data'`

3. **`font`**:
   - Type: `object`
   - Description: Defines font-related properties (e.g., size, weight, family).
   - Example:
     ```javascript
     font: {
         size: 18,
         weight: 'bold'
     }
     ```

4. **`color`**:
   - Type: `string`
   - Description: Sets the color of the title text.
   - Example: `color: 'blue'`

5. **`padding`**:
   - Type: `object` or `number`
   - Description: Controls the spacing around the title.
   - Example:
     ```javascript
     padding: {
         top: 20,
         bottom: 10
     }
     ```

6. **`align`**:
   - Type: `string` (`'start'`, `'center'`, `'end'`)
   - Description: Controls the alignment of the title.
   - Example: `align: 'center'`


7. **`Position (position)`**:

    **Possible values**:
    -    'top': Places the title at the top of the chart (default).
    -    'left': Places the title vertically on the left.
    -    'bottom': Places the title at the bottom of the chart.
    -    'right': Places the title vertically on the right.

8. **`Font Family (font.family)`**:

    - Sets the font family for the title.
    - Accepts a string value with the font name (e.g., 'Arial', 'Courier New').
---

### Integrated with Code:
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reading CSV</title>
</head>

<body>
    <canvas id="myChart" width="400" height="200"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        // File Path to the Local CSV
        const filePath = './first_chart.csv';

        // Function to fetch and parse CSV
        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    throw new Error(`Failed to fetch file: ${response.statusText}`);
                }

                const text = await response.text();
                return text
                    .trim()
                    .split('\n')
                    .map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        // Fetch and Render Chart
        fetchCSV(filePath)
            .then(data => {
                // Extract labels (first row)
                const labels = data[0];

                // Extract data rows
                const rows = data.slice(1);

                // Separate categories (X-axis) and values (Y-axis)
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));

                console.log('Data:', data);
                console.log('Labels:', labels);
                console.log('Categories:', categories);
                console.log('Values:', values);

                // Create Chart
                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: labels[1],
                            data: values,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true, // Makes the chart responsive
                        plugins: {
                            title: {
                                display: true, // Enables the title
                                text: 'How Long Should the Perfect Streaming Series Last?', // Title text
                                font: {
                                    size: 18, // Font size for the title
                                    family: 'Arial, sans-serif', // Font family
                                    weight: 'bold' // Font weight
                                },
                                color: 'rgba(255,0,0,1)', // Title color
                                padding: {
                                    top: 0,
                                    bottom: 0 // Space around the title
                                },
                                align: 'center', // Title alignment
                                position: 'top' // Title position
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>

</html>
```



## **Steps to Add Axis Labels in Chart.js**

1. **X-axis Labels**: Use the `scales.x.title` configuration to add a title to the X-axis.
2. **Y-axis Labels**: Use the `scales.y.title` configuration to add a title to the Y-axis.
3. **Customize Font, Color, and Position**: You can customize the appearance of the labels by adjusting the font size, color, family, and more.

---

### **Example Code with Axis Labels**
```js
scales: {
     x: {
        grid: {
          display: false  // Remove vertical grid lines
            },
         title: {
            display: true,
           text: labels[0],
           font: {
                size: 14,
                weight: 'bold',
                family: "'Helvetica Neue', 'Arial', sans-serif"
                    },
                padding: { top: 20 }
                },
        ticks: {
            minRotation: 0,
            autoSkip: false,
            padding: 10,
            wrap: true,
            maxTicksLimit: 8,
            multiline: true,
            font: {
                family: "'Helvetica Neue', 'Arial', sans-serif"
            }
        }
    },
    y: {
        grid: {
            color: 'rgba(0, 0, 0, 0.1)'  // Lighter grid lines
        },
        title: {
            display: true,
            text: labels[1],
            rotation: 0,
            font: {
                size: 14,
                weight: 'bold',
                family: "'Helvetica Neue', 'Arial', sans-serif"
            },
            padding: { bottom: 10 }
        },
        ticks: {
            font: {
                family: "'Helvetica Neue', 'Arial', sans-serif"
            }
        }
    }
}
```

---

### **Explanation of Axis Label Configuration**

1. **X-Axis Labels**:
   - `scales.x.title.display: true`: This enables the X-axis title.
   - `scales.x.title.text: 'Name'`: Sets the label text for the X-axis.
   - `scales.x.title.font`: Defines the font properties for the X-axis title (e.g., size, weight, family).
   - `scales.x.title.color`: Sets the color of the X-axis title.

2. **Y-Axis Labels**:
   - `scales.y.title.display: true`: This enables the Y-axis title.
   - `scales.y.title.text: 'Age'`: Sets the label text for the Y-axis.
   - `scales.y.title.font`: Defines the font properties for the Y-axis title.
   - `scales.y.title.color`: Sets the color of the Y-axis title.
   - `scales.y.beginAtZero: true`: Ensures that the Y-axis starts at 0 (if applicable).

---

## After Integrating

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Improved Streaming Series Chart</title>
</head>

<body>
    <canvas id="myChart" width="600" height="400"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const filePath = './first_chart.csv';

        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
                const text = await response.text();
                return text.trim().split('\n').map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        fetchCSV(filePath)
            .then(data => {
                const labels = data[0];
                const rows = data.slice(1);
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));

                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: labels[1],
                            data: values,
                            backgroundColor: 'rgba(52, 152, 219, 0.6)',  // Softer blue
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 2,
                            borderRadius: 6,  // Rounded corners
                            barThickness: 40  // Consistent bar width
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'How Long Should the Perfect Streaming Series Last?',
                                font: {
                                    size: 16,
                                    family: "'Helvetica Neue', 'Arial', sans-serif",
                                    weight: 'bold'
                                },
                                color: '#2c3e50',
                                padding: {
                                    top: 20,
                                    bottom: 20
                                }
                            },
                            legend: {
                                labels: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false  // Remove vertical grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[0],
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { top: 20 }
                                },
                                ticks: {
                                    minRotation: 0,
                                    autoSkip: false,
                                    padding: 10,
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            },
                            y: {
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.1)'  // Lighter grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[1],
                                    rotation: 0,
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { bottom: 10 }
                                },
                                ticks: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 0,
                                bottom: 10
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>

</html>
```

## Adding Bar Values

```js

plugins: {
    datalabels: { // Enables datalabels
        anchor: 'end',
        align: 'top',
        offset: 0,
        clamp: true,
        padding: {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
        },
        formatter: function (value) {
              return value; // Displays the value on top of the bar
        },
    font: {
                            weight: 'normal',
            size: '12'
        },
         color: 'rgba(0, 0, 0, 1)'
                    }
                },
```

### After adding Bar Values

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Improved Streaming Series Chart</title>
</head>

<body>
    <canvas id="myChart" width="600" height="400"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script> <!-- Added plugin -->

    <script>
        const filePath = './first_chart.csv';

        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
                const text = await response.text();
                return text.trim().split('\n').map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        fetchCSV(filePath)
            .then(data => {
                const labels = data[0];
                const rows = data.slice(1);
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));

                Chart.register(ChartDataLabels);
                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: labels[1],
                            data: values,
                            backgroundColor: 'rgba(52, 152, 219, 0.6)',  // Softer blue
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 2,
                            borderRadius: 6,  // Rounded corners
                            barThickness: 40  // Consistent bar width
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'How Long Should the Perfect Streaming Series Last?',
                                font: {
                                    size: 16,
                                    family: "'Helvetica Neue', 'Arial', sans-serif",
                                    weight: 'bold'
                                },
                                color: '#2c3e50',
                                padding: {
                                    top: 20,
                                    bottom: 20
                                }
                            },
                            legend: {
                                labels: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            },
                            datalabels: { // Enables datalabels
                                anchor: 'end',
                                align: 'top',
                                offset: 0,
                                clamp: true,
                                padding: {
                                    bottom: 0,
                                    top: 0,
                                    left: 0,
                                    right: 0
                                },
                                formatter: function (value) {
                                    return value; // Displays the value on top of the bar
                                },
                                font: {
                                    weight: 'normal',
                                    size: '12'
                                },
                                color: 'rgba(0, 0, 0, 1)'
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false  // Remove vertical grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[0],
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { top: 20 }
                                },
                                ticks: {
                                    minRotation: 0,
                                    autoSkip: false,
                                    padding: 10,

                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                    color: 'rgba(0, 0, 0, 0.1)'  // Lighter grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[1],
                                    rotation: 0,
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { bottom: 10 }
                                },
                                ticks: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 0,
                                bottom: 10
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>

</html>

```

## Adding Gradient

```js
function createGradient(ctx, chartArea, value, max, min) {
            const { bottom, top } = chartArea;
            const chartHeight = bottom - top;

            // Calculate gradient position based on value
            const barHeight = chartHeight * (value / max);
            const gradient = ctx.createLinearGradient(0, bottom - barHeight, 0, bottom);

            // Adjust gradient colors based on value
            if (value === max) {
                gradient.addColorStop(0, 'rgba(75, 192, 75, 1)'); // Green (Max)
                gradient.addColorStop(1, 'rgba(75, 92, 75, 1)');
            } else if (value === min) {
                gradient.addColorStop(0, 'rgba(255, 99, 132, 1)'); // Red (Min)
                gradient.addColorStop(1, 'rgba(255, 9, 132, 1)');
            } else {
                gradient.addColorStop(0, 'rgba(54, 162, 235, 1)'); // Blue (Others)
                gradient.addColorStop(1, 'rgba(54, 162, 135, 1)');
            }

            return gradient;
        }
```


## After Integrating Gradient Code

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Improved Streaming Series Chart</title>
</head>

<body>
    <canvas id="myChart" width="600" height="400"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script> <!-- Added plugin -->

    <script>
        const filePath = './first_chart.csv';

        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
                const text = await response.text();
                return text.trim().split('\n').map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        fetchCSV(filePath)
            .then(data => {
                const labels = data[0];
                const rows = data.slice(1);
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));

                Chart.register(ChartDataLabels);
                function createGradient(ctx, chartArea, value, max, min) {
                    const { bottom, top } = chartArea;
                    const chartHeight = bottom - top;

                    // Calculate gradient position based on value
                    const barHeight = chartHeight * (value / max);
                    const gradient = ctx.createLinearGradient(0, bottom - barHeight, 0, bottom);

                    // Adjust gradient colors based on value
                    if (value === max) {
                        gradient.addColorStop(0, 'rgba(75, 192, 75, 1)'); // Green (Max)
                        gradient.addColorStop(1, 'rgba(75, 92, 75, 1)');
                    } else if (value === min) {
                        gradient.addColorStop(0, 'rgba(255, 99, 132, 1)'); // Red (Min)
                        gradient.addColorStop(1, 'rgba(255, 9, 132, 1)');
                    } else {
                        gradient.addColorStop(0, 'rgba(54, 162, 235, 1)'); // Blue (Others)
                        gradient.addColorStop(1, 'rgba(54, 162, 135, 1)');
                    }

                    return gradient;
                }

                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: labels[1],
                            data: values,
                            backgroundColor: function (context) {
                                const { chart, raw } = context;
                                const { chartArea, ctx } = chart;
                                if (!chartArea) return; // Wait for chart area to be available
                                const max = Math.max(...chart.data.datasets[0].data);
                                const min = Math.min(...chart.data.datasets[0].data);
                                return createGradient(ctx, chartArea, raw, max, min);
                            },  // Softer blue
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 2,
                            borderRadius: 6,  // Rounded corners
                            barThickness: 40  // Consistent bar width
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'How Long Should the Perfect Streaming Series Last?',
                                font: {
                                    size: 16,
                                    family: "'Helvetica Neue', 'Arial', sans-serif",
                                    weight: 'bold'
                                },
                                color: '#2c3e50',
                                padding: {
                                    top: 20,
                                    bottom: 20
                                }
                            },
                            legend: {
                                labels: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            },
                            datalabels: { // Enables datalabels
                                anchor: 'end',
                                align: 'top',
                                offset: 0,
                                clamp: true,
                                padding: {
                                    bottom: 0,
                                    top: 0,
                                    left: 0,
                                    right: 0
                                },
                                formatter: function (value) {
                                    return value; // Displays the value on top of the bar
                                },
                                font: {
                                    weight: 'normal',
                                    size: '12'
                                },
                                color: 'rgba(0, 0, 0, 1)'
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false  // Remove vertical grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[0],
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { top: 20 }
                                },
                                ticks: {
                                    minRotation: 0,
                                    autoSkip: false,
                                    padding: 10,

                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                    color: 'rgba(0, 0, 0, 0.1)'  // Lighter grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[1],
                                    rotation: 0,
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { bottom: 10 }
                                },
                                ticks: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 0,
                                bottom: 10
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>

</html>
```

## Adding Custom Background for Chart

### Color

```js
const customBackgroundColor = {
    id: 'customBackgroundColor',
    beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (chartArea) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';

            ctx.fillStyle = 'rgba(34, 233, 193, 0.8)';  // Light Blue
            ctx.fillRect(
                chartArea.left,
                chartArea.top,
                chartArea.width,
                chartArea.height
            );
            ctx.restore();
        }
    }
};

Chart.register(ChartDataLabels, customBackgroundColor);

```


### Gradient

```js
 const customBackgroundColor = {
    id: 'customBackgroundColor',
    beforeDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (chartArea) {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';

            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(173, 216, 230, 0.8)');  // Light Blue
            gradient.addColorStop(1, 'rgba(144, 238, 144, 0.8)');  // Light Green

            ctx.fillStyle = gradient;
            ctx.fillRect(
                chartArea.left,
                chartArea.top,
                chartArea.width,
                chartArea.height
            );
            ctx.restore();
        }
    }
};

Chart.register(ChartDataLabels, customBackgroundColor);
```

## After Integrating Custom Background

```js
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Improved Streaming Series Chart</title>
</head>

<body>
    <canvas id="myChart" width="600" height="400"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script> <!-- Added plugin -->

    <script>
        const filePath = './first_chart.csv';

        async function fetchCSV(filePath) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`Failed to fetch file: ${response.statusText}`);
                const text = await response.text();
                return text.trim().split('\n').map(row => row.split(',').map(cell => cell.trim()));
            } catch (error) {
                console.error('Error reading file:', error);
                throw error;
            }
        }

        fetchCSV(filePath)
            .then(data => {
                const labels = data[0];
                const rows = data.slice(1);
                const categories = rows.map(row => row[0]);
                const values = rows.map(row => parseFloat(row[1]));


                const customBackgroundColor = {
                    id: 'customBackgroundColor',
                    beforeDraw: (chart) => {
                        const { ctx, chartArea } = chart;
                        if (chartArea) {
                            ctx.save();
                            ctx.globalCompositeOperation = 'destination-over';

                            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                            gradient.addColorStop(0, 'rgba(173, 216, 230, 0.8)');  // Light Blue
                            gradient.addColorStop(1, 'rgba(144, 238, 144, 0.8)');  // Light Green

                            ctx.fillStyle = gradient;
                            ctx.fillRect(
                                chartArea.left,
                                chartArea.top,
                                chartArea.width,
                                chartArea.height
                            );
                            ctx.restore();
                        }
                    }
                };

                Chart.register(ChartDataLabels, customBackgroundColor);
                function createGradient(ctx, chartArea, value, max, min) {
                    const { bottom, top } = chartArea;
                    const chartHeight = bottom - top;

                    // Calculate gradient position based on value
                    const barHeight = chartHeight * (value / max);
                    const gradient = ctx.createLinearGradient(0, bottom - barHeight, 0, bottom);

                    // Adjust gradient colors based on value
                    if (value === max) {
                        gradient.addColorStop(0, 'rgba(75, 192, 75, 1)'); // Green (Max)
                        gradient.addColorStop(1, 'rgba(75, 92, 75, 1)');
                    } else if (value === min) {
                        gradient.addColorStop(0, 'rgba(255, 99, 132, 1)'); // Red (Min)
                        gradient.addColorStop(1, 'rgba(255, 9, 132, 1)');
                    } else {
                        gradient.addColorStop(0, 'rgba(54, 162, 235, 1)'); // Blue (Others)
                        gradient.addColorStop(1, 'rgba(54, 162, 135, 1)');
                    }

                    return gradient;
                }

                const ctx = document.getElementById('myChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categories,
                        datasets: [{
                            label: labels[1],
                            data: values,
                            backgroundColor: function (context) {
                                const { chart, raw } = context;
                                const { chartArea, ctx } = chart;
                                if (!chartArea) return; // Wait for chart area to be available
                                const max = Math.max(...chart.data.datasets[0].data);
                                const min = Math.min(...chart.data.datasets[0].data);
                                return createGradient(ctx, chartArea, raw, max, min);
                            },  // Softer blue
                            borderColor: 'rgba(41, 128, 185, 1)',
                            borderWidth: 2,
                            borderRadius: 6,  // Rounded corners
                            barThickness: 40  // Consistent bar width
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'How Long Should the Perfect Streaming Series Last?',
                                font: {
                                    size: 16,
                                    family: "'Helvetica Neue', 'Arial', sans-serif",
                                    weight: 'bold'
                                },
                                color: '#2c3e50',
                                padding: {
                                    top: 20,
                                    bottom: 20
                                }
                            },
                            legend: {
                                labels: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            },
                            datalabels: { // Enables datalabels
                                anchor: 'end',
                                align: 'top',
                                offset: 0,
                                clamp: true,
                                padding: {
                                    bottom: 0,
                                    top: 0,
                                    left: 0,
                                    right: 0
                                },
                                formatter: function (value) {
                                    return value; // Displays the value on top of the bar
                                },
                                font: {
                                    weight: 'normal',
                                    size: '12'
                                },
                                color: 'rgba(0, 0, 0, 1)'
                            }
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false  // Remove vertical grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[0],
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { top: 20 }
                                },
                                ticks: {
                                    minRotation: 0,
                                    autoSkip: false,
                                    padding: 10,

                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                },
                            },
                            y: {
                                grid: {
                                    display: false,
                                    color: 'rgba(0, 0, 0, 0.1)'  // Lighter grid lines
                                },
                                title: {
                                    display: true,
                                    text: labels[1],
                                    rotation: 0,
                                    font: {
                                        size: 14,
                                        weight: 'bold',
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    },
                                    padding: { bottom: 10 }
                                },
                                ticks: {
                                    font: {
                                        family: "'Helvetica Neue', 'Arial', sans-serif"
                                    }
                                }
                            }
                        },
                        layout: {
                            padding: {
                                left: 20,
                                right: 20,
                                top: 0,
                                bottom: 10
                            }
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
    </script>
</body>

</html>
```

### Change to Horizontal Bar Chart

```js
indexAxis: 'y',
```

- But you have to change all things also! like axis title, gradients, etc.