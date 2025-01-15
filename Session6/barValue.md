# Adding Bar Values

```javascript
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data.map(row => row.label),
        datasets: [{
            label: 'Your Dataset',
            data: data.map(row => row.value),
            backgroundColor: createGradientColors(ctx, data),
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            datalabels: {
                anchor: 'end',  // Options: 'start', 'center', 'end'
                align: 'top',   // Options: 'top', 'bottom', 'middle', 'left', 'right'
                formatter: function(value) {
                    return value.toFixed(2);
                },
                font: {
                    weight: 'bold',
                    size: 14
                },
                color: '#000'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
```
![alt text](anchor.af396841.png)

# Further Chart Modifications

Here are some additional modifications you can make to your chart:


1. **Adding Grid Lines Customization**:
```javascript
scales: {
    max: function (context) {
        return Math.max(...context.chart.data.datasets[0].data) + 5;}}
```

### Second way to do it:
```javascript
chart.config.options.scales.y.max=function(context){
        return Math.max(...context.chart.data.datasets[0].data) + 10;
        }
```

2. **Custom Tooltips**:
```javascript
options: {
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context) {
                    return `Value: ${context.parsed.y}`;
                }
            }
        }
    }
}
```



3. **Custom Bar Width**:
```javascript
options: {
    barThickness: 30,  // Fixed width in pixels
    // OR
    barPercentage: 0.8 // Relative width
}
```

4. **Legend Customization**:
```javascript
options: {
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 14,
                    family: 'Arial'
                },
                color: '#666'
            }
        }
    }
}
```

