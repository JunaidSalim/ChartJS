# Adding Gradient Colors Based on Values

Gradients can be used to add visual effects to chart elements, such as bars in a bar chart. In this example, we'll create a gradient color scheme for the bars in a bar chart based on the values of the data points.

```javascript
backgroundColor: function(context) {
    const { chart, raw } = context;
    const { chartArea, ctx } = chart;
    if (!chartArea) return; // Wait for chart area to be available
    const max = Math.max(...chart.data.datasets[0].data);
    const min = Math.min(...chart.data.datasets[0].data);
    return createGradient(ctx, chartArea, raw, max, min);
    }


    function createGradient(ctx, chartArea, value, max, min) {
        const { bottom, top } = chartArea;
        const chartHeight = bottom - top;

        // Calculate gradient position based on value
        const barHeight = chartHeight * (value / max);            const gradient = ctx.createLinearGradient(0, bottom - barHeight, 0, bottom);

        // Adjust gradient colors based on value
        if (value === max) {
            gradient.addColorStop(0, 'rgba(75, 192, 75, 1)'); // Green (Max)                gradient.addColorStop(1, 'rgba(75, 92, 75, 1)');
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
