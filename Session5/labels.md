# Chart.js Bar Chart Customization Guide

## Basic Structure
The foundation of any Chart.js chart consists of three main components: type, data, and options. Here's a breakdown:

```javascript
const chart = new Chart(ctx, {
    type: 'bar',                // Defines the chart type
    data: {
        labels: ['Jan', 'Feb', 'Mar'],     // X-axis labels
        datasets: [{
            label: 'Sales',                 // Dataset name in legend
            data: [12, 19, 3],             // Actual values to plot
            backgroundColor: 'rgba(255, 99, 132, 0.5)',  // Bar fill color
            borderColor: 'rgba(0, 0, 0, 0.8)',          // Bar border color
            borderWidth: 1                               // Bar border width
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true  // Start y-axis from zero
            }
        }
    }
});
```

## Key Customization Areas

### 1. Grid Configuration
Grid lines help in reading values but can sometimes make the chart look cluttered. You can control their visibility:

```javascript
options: {
    scales: {
        x: {
            grid: {
                display: false  // Removes horizontal grid lines
            }
        },
        y: {
            grid: {
                display: false,  // Removes vertical grid lines
                // Additional grid customizations:
                color: 'rgba(0, 0, 0, 0.1)',  // Grid line color
                borderDash: [5, 5]            // Creates dashed lines
            }
        }
    }
}
```

### 2. Label Customization

#### Legend Labels
The legend helps identify different datasets. Here's how to style it:

```javascript
options: {
    plugins: {
        legend: {
            labels: {
                color: '#333333',          // Text color
                font: {
                    size: 14,              // Font size in pixels
                    family: 'Arial',       // Font family
                    weight: 'bold'         // Font weight
                },
                padding: 10                // Spacing between legend items
            },
            position: 'top',              // Legend position
            align: 'start'                // Alignment within position
        }
    }
}
```

### How to Add more legends to the chart?

```js
options: {
    plugins: {
        legend: {
            labels: {
                generateLabels: function(chart) {
                    return [{
                        text: 'Max',
                        fillStyle: 'green',
                        strokeStyle: 'darkgreen',
                        lineWidth: 1,
                        hidden: false
                    },
                    {
                        text: 'Min',
                        fillStyle: 'red',
                        strokeStyle: 'darkred',
                        lineWidth: 1,
                        hidden: false
                    }];
                }
            }
        }
    }
}

```

#### Axis Labels
Axis labels provide context for your data. Configure them like this:

```javascript
options: {
    scales: {
        x: {
            title: {
                display: true,           // Show axis title
                text: 'Months',          // Title text
                color: '#333333',        // Title color
                font: {
                    size: 16,            // Title font size
                    weight: 'bold'       // Title font weight
                }
            },
            ticks: {
                color: '#666666',        // Tick label color
                font: {
                    size: 12             // Tick label size
                },
                maxRotation: 45,         // Maximum rotation angle for labels
                autoSkip: true           // Automatically skip labels if too crowded
            }
        }
    }
}
```

### 3. Multiple Datasets
Compare different sets of data by adding multiple datasets:

```javascript
data: {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
        {
            label: 'Sales 2023',              // First dataset label
            data: [10, 20, 30],              // First dataset values
            backgroundColor: 'rgba(255, 99, 132, 0.5)',  // Red bars
            order: 2                          // Drawing order (higher = on top)
        },
        {
            label: 'Sales 2024',              // Second dataset label
            data: [15, 25, 35],              // Second dataset values
            backgroundColor: 'rgba(54, 162, 235, 0.5)',  // Blue bars
            order: 1                          // Will be drawn first
        }
    ]
}
```

### 4. Tooltip Customization
Tooltips appear when hovering over data points. Here's how to customize them:

```javascript
options: {
    plugins: {
        tooltip: {
            callbacks: {
                // Customize tooltip text
                label: (context) => `${context.dataset.label}: $${context.raw}`,
                // Add a title callback
                title: (tooltipItems) => `Period: ${tooltipItems[0].label}`
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Tooltip background
            titleColor: 'white',                    // Title text color
            bodyColor: 'white',                     // Body text color
            titleFont: {
                size: 14,
                weight: 'bold'
            },
            padding: 10,                           // Internal padding
            displayColors: true                    // Show colored boxes
        }
    }
}
```

## Complete Example
This example combines all the customizations with explanations:

```javascript
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March'],
        datasets: [{
            label: 'Sales 2024',
            data: [10, 20, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,           // Chart resizes with container
        maintainAspectRatio: false, // Allow custom dimensions
        
        // Legend configuration
        plugins: {
        legend: {
            labels: {
                generateLabels: function(chart) {
                    return [{
                        text: 'Max',
                        fillStyle: 'green',
                        strokeStyle: 'darkgreen',
                        lineWidth: 1,
                        hidden: false
                    },
                    {
                        text: 'Min',
                        fillStyle: 'red',
                        strokeStyle: 'darkred',
                        lineWidth: 1,
                        hidden: false
                    }];
                }
            }
        }
    }
        
        // Axes configuration
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                    color: '#333333',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                grid: {
                    display: false    // Hide x-axis gridlines
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales Amount ($)',
                    color: '#333333',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                beginAtZero: true,    // Start y-axis from zero
                ticks: {
                    callback: (value) => `$${value}`  // Add dollar sign to y-axis values
                }
            }
        }
    }
});
```

Each configuration option serves a specific purpose:
- `responsive` and `maintainAspectRatio` control chart sizing
- Font configurations ensure consistent typography
- Color settings maintain visual hierarchy
- Callback functions format data display
- Grid and axis settings improve readability
- Tooltip configurations enhance user interaction
