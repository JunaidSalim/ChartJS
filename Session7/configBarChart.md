## Adding Background to whole chart

- We can add background to whole chart by using CSS.
- Enclose the chart under a div container
- Remove any other styling from Chart.js options
- Add CSS to style the container and chart

```js
body {
    background-color: #1a1d29;  /* Dark background color */
    padding: 20px;             /* Space around the entire page */
}

.charts-container {
    display: grid;                              /* Uses CSS Grid layout */
    grid-template-columns: repeat(2, 1fr);      /* Creates 2 equal columns */
    gap: 20px;                                  /* Space between charts */
    max-width: 1400px;                          /* Maximum width of container */
    margin: 0 auto;                             /* Centers container */
}

.chart-wrapper {
    background-color: #1e2233;   /* Dark background for each chart */
    border-radius: 12px;         /* Rounded corners */
    padding: 24px;               /* Inner spacing */
    height: 500px;               /* Fixed height */
}

<div class="charts-container">
    <div class="chart-wrapper">
        <canvas id="myChart"></canvas>
    </div>
</div>

```

## Remove Borders

- We can remove the borders from the chart by setting the border width to 0.

```js
datasets: {
    borderWidth: 0,
}
```

- If you want to remove other brder thing like radius so set that value to zero.

```js
datasets: {
    borderWidth: 0,
    borderRadius: 0,
}
```

## Gradient on Bars

- You can add gradient on bar by first defining the gradient and then adding on bars.
- Use function for dynamic gradient assignment.

```js
function createGradient(ctx, chartArea, value, max, min) {
  const { bottom, top } = chartArea;
  const chartHeight = bottom - top;

  // Calculate gradient position based on value
  const barHeight = chartHeight * (value / max);
  const gradient = ctx.createLinearGradient(0, bottom - barHeight, 0, bottom);

  // Adjust gradient colors based on value
  if (value === max) {
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)"); // Light purple
    gradient.addColorStop(1, "rgba(139, 92, 246, 1)"); // Dark purple
  } else if (value === min) {
    gradient.addColorStop(0, "rgba(239, 68, 68, 0.1)"); // Light red
    gradient.addColorStop(1, "rgba(239, 68, 68, 1)"); // Dark red
  } else {
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.1)"); // Light blue
    gradient.addColorStop(1, "rgba(59, 130, 246, 1)"); // Dark blue
  }

  return gradient;
}
```

## Removing Axes Lines

```js
scales: {
  x: {
    border: {
      display: false;
    }
  }
}
```

