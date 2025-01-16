const filePath = './data.csv';

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

function processCSVData(rows, yearIndex, monthIndex, salesIndex) {
    // Extract unique years
    const years = [...new Set(rows.map(row => parseInt(row[yearIndex], 10)))];

    // Calculate yearly sales data
    const yearlyData = years.map(year => {
        const filteredRows = rows.filter(row => parseInt(row[yearIndex], 10) === year);
        const totalSales = filteredRows.reduce((sum, row) => sum + parseFloat(row[salesIndex]), 0);
        return { year, totalSales };
    });

    // Find the latest year
    const latestYear = Math.max(...years);

    // Filter rows for the latest year
    const filteredRows = rows.filter(row => parseInt(row[yearIndex], 10) === latestYear);

    // Extract months and sales for the latest year
    const months = filteredRows.map(row => row[monthIndex]);
    const monthlySales = filteredRows.map(row => parseFloat(row[salesIndex]));

    // Processed data for both monthly and yearly
    const processedData = {
        yearly: {
            labels: yearlyData.map(data => data.year),
            values: yearlyData.map(data => data.totalSales)
        },
        monthly: {
            labels: months,
            values: monthlySales
        }
    };

    return processedData;
}


fetchCSV(filePath)
    .then(data => {
        const labels = data[0]; // Assuming first row contains column headers
        const rows = data.slice(1);

        const yearIndex = labels.indexOf("Year");
        const monthIndex = labels.indexOf("Month");
        const salesIndex = labels.indexOf("Sales");

        const chartData = processCSVData(rows, yearIndex, monthIndex, salesIndex);

        console.log("Yearly Data:", chartData.yearly);
        console.log("Monthly Data:", chartData.monthly);

        function updateSummary(data, labels) {
            const total = data.reduce((sum, value) => sum + value, 0);
            const average = (total / data.length).toFixed(2);
            const highestIndex = data.indexOf(Math.max(...data));
        
            document.getElementById("total-sales").innerText = `$${total}`;
            document.getElementById("average-sales").innerText = `$${average}`;
            document.getElementById("highest-month").innerText = labels[highestIndex];
        }

        updateSummary(chartData.monthly.values, chartData.monthly.labels);

        function createGradient(ctx, chartArea, value, max, min) {
            const { bottom, top } = chartArea;
            const chartHeight = bottom - top;

            // Calculate gradient position based on value
            const barHeight = chartHeight * (value / max);
            const gradient = ctx.createLinearGradient(0, bottom - barHeight, 0, bottom);

            // Adjust gradient colors based on value
            if (value === max) {
                gradient.addColorStop(0, 'rgba(0, 255, 0, 0.1)');  // Light purple
                gradient.addColorStop(1, 'rgba(0, 255, 0, 1)');  // Dark purple
            } else if (value === min) {
                gradient.addColorStop(0, 'rgba(239, 68, 68, 0.1)');   // Light red
                gradient.addColorStop(1, 'rgba(239, 68, 68, 1)');   // Dark red
            } else {
                gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');  // Light blue
                gradient.addColorStop(1, 'rgba(59, 130, 246, 1)');  // Dark blue
            }

            return gradient;
        }

        Chart.register(ChartDataLabels)

        let config = {
            type: 'bar',
            data: {
                labels: chartData.monthly.labels,
                datasets: [{
                    label: 'Monthly Sales',
                    data: chartData.monthly.values,
                    backgroundColor: function (context) {
                        const { chart, raw } = context;
                        const { chartArea, ctx } = chart;
                        if (!chartArea) return; // Wait for chart area to be available
                        const max = Math.max(...chart.data.datasets[0].data);
                        const min = Math.min(...chart.data.datasets[0].data);
                        return createGradient(ctx, chartArea, raw, max, min);
                    },  // Softer blue
                    borderWidth: 0,
                    borderRadius: 8,  // Rounded corners
                    barThickness: 30  // Consistent bar width
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display:false,
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
                        color: function(context) {
                            const value = context.dataset.data[context.dataIndex];
                            return value === Math.max(...context.dataset.data) ? 'rgba(0, 255, 0, 1)' : value === Math.min(...context.dataset.data)?'rgba(255,0,0,1)' :'rgba(255, 255, 255, 1)';
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
                            text: labels[1],
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Helvetica Neue', 'Arial', sans-serif"
                            },
                            color:'rgba(255, 255, 255, 0.9)',
                            align:'center'
                        },
                        ticks: {
                            minRotation: 90,
                            autoSkip: false,
                            padding: 10,

                            font: {
                                family: "'Helvetica Neue', 'Arial', sans-serif"
                            },
                            color:'rgba(255, 255, 255, 0.7)'
                        },
                    },
                    y: {
                        grid: {
                            display: false,
                            color: 'rgba(0, 0, 0, 0.1)'  // Lighter grid lines
                        },
                        title: {
                            display: true,
                            text: labels[2],
                            rotation: 0,
                            font: {
                                size: 14,
                                weight: 'bold',
                                family: "'Helvetica Neue', 'Arial', sans-serif"
                            },
                            color:'rgba(255, 255, 255, 0.9)',
                            align:'center'
                        },
                        ticks: {
                            font: {
                                family: "'Helvetica Neue', 'Arial', sans-serif"
                            },
                            color:'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
            }
        }
        
        let ctx = document.getElementById('chart').getContext('2d');
        let chart = new Chart(ctx, config);

        document.getElementById("btn-monthly").addEventListener("click", () => {
            chart.data.labels = chartData.monthly.labels;
            chart.data.datasets[0].data = chartData.monthly.values;  // changed from .data to .values
            chart.data.datasets[0].label = "Monthly Sales";
            chart.config.options.scales.x.title.text = labels[1];
            chart.update();
            updateSummary(chartData.monthly.values, chartData.monthly.labels);
        
            document.getElementById("btn-monthly").classList.add("active");
            document.getElementById("btn-yearly").classList.remove("active");
            document.getElementById('top-month-title').innerText = 'Top Month';
        });
        
        document.getElementById("btn-yearly").addEventListener("click", () => {
            chart.data.labels = chartData.yearly.labels;
            chart.data.datasets[0].data = chartData.yearly.values;  // changed from .data to .values
            chart.data.datasets[0].label = "Yearly Sales";
            chart.config.options.scales.x.title.text = labels[0];
            chart.update();
            updateSummary(chartData.yearly.values, chartData.yearly.labels);  // changed from yearlyData to chartData.yearly
        
            document.getElementById("btn-monthly").classList.remove("active");
            document.getElementById("btn-yearly").classList.add("active");
            document.getElementById('top-month-title').innerText = 'Top Year';
        });

    }).catch(error => console.error('Error:', error));

