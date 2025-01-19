from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

def clean_numeric_columns(df):
    # Function to clean numeric columns by removing commas
    numeric_columns = ['delivered_impressions','budgeted_impressions']
    
    for col in numeric_columns:
        if col in df.columns:
            df[col] = df[col].astype(str).str.replace(',', '').astype(float)
    
    return df

def load_and_process_data():
    # Read the CSV file
    df = pd.read_csv('raw_data.csv',encoding='latin1',low_memory=False)    
    
    # Clean numeric columns
    df = clean_numeric_columns(df)
    
    # Get top 5 by budgeted impressions
    top_budgeted = df.groupby('client')['ad_spend'].sum()\
        .sort_values(ascending=False).head(5)
    
    chart1_data = {
        'labels': top_budgeted.index.tolist(),
        'values': top_budgeted.values.tolist()
    }
    
    # Get top 5 by delivered impressions
    top_delivered = df.groupby('client')['delivered_impressions'].sum()\
        .sort_values(ascending=False).head(5)
    
    chart2_data = {
        'labels': top_delivered.index.tolist(),
        'values': top_delivered.values.tolist()
    }
    
    
    return chart1_data, chart2_data

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chart-data')
def get_chart_data():
    chart1_data, chart2_data= load_and_process_data()
    return jsonify({
        'chart1': chart1_data,
        'chart2': chart2_data
    })

if __name__ == '__main__':
    app.run(debug=True)