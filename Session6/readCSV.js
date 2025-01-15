const fs = require('fs');

async function readCSV(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return data
            .split('\n')
            .map(row => row.split(',').map(cell => cell.trim()));
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

const filePath = './first_chart.csv';
readCSV(filePath)
    .then(data => {
        // Extract labels (first row)
        const labels = data[0];
        // Extract data rows
        const rows = data.slice(1);

        // Separate categories (X-axis) and values (Y-axis)
        const categories = rows.map(row => row[0]);
        const values = rows.map(row => parseFloat(row[1])); // Convert string to number for bar chart

        console.log('Data:', data);
        console.log('Labels:', labels);
        console.log('Categories:', categories);
        console.log('Values:', values);

        // You can pass categories and values to a chart library here
    })
    .catch(error => console.error('Error:', error));
