## Running App Locally

```
pip install flask

```

- Move the raw-data.csv file in same directory


## Deployment (AI Generated)

1. First, let's restructure the application for better security and organization:

```plaintext
~/
├── data/                    # Private data directory (outside public_html)
│   └── raw_data.csv
├── logs/                    # Log directory
│   └── flask_app.log
├── venv/                    # Python virtual environment
└── public_html/
    └── flaskapp/           # Application directory
        ├── app.py
        ├── config.py       # Configuration file
        ├── passenger_wsgi.py
        ├── .htaccess
        └── templates/
            └── index.html

```

2. Let's modify the app.py to handle the secure data location:

```python
from flask import Flask, render_template, jsonify
import pandas as pd
import os
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)

# Setup logging
log_path = os.path.expanduser('~/logs/flask_app.log')
if not os.path.exists(os.path.dirname(log_path)):
    os.makedirs(os.path.dirname(log_path))

handler = RotatingFileHandler(log_path, maxBytes=10000000, backupCount=5)
handler.setLevel(logging.INFO)
app.logger.addHandler(handler)

def clean_numeric_columns(df):
    numeric_columns = ['delivered_impressions','budgeted_impressions']
    
    for col in numeric_columns:
        if col in df.columns:
            df[col] = df[col].astype(str).str.replace(',', '').astype(float)
    
    return df

def load_and_process_data():
    try:
        # Use absolute path to data file
        data_path = os.path.expanduser('~/data/raw_data.csv')
        app.logger.info(f"Loading data from {data_path}")
        
        df = pd.read_csv(data_path, encoding='latin1', low_memory=False)
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
        
    except Exception as e:
        app.logger.error(f"Error loading data: {str(e)}")
        return None, None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chart-data')
def get_chart_data():
    try:
        chart1_data, chart2_data = load_and_process_data()
        if chart1_data and chart2_data:
            return jsonify({
                'chart1': chart1_data,
                'chart2': chart2_data
            })
        else:
            return jsonify({'error': 'Unable to load data'}), 500
    except Exception as e:
        app.logger.error(f"API error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)

```

Now, let's go through the deployment steps:

1. **Domain Setup**:
   ```bash
   # Log into your Bluehost cPanel
   # Go to 'Domains' section
   # Click on 'Assign' or 'Manage' next to your domain
   # Point domain to: public_html/flaskapp
   ```

2. **SSH Access Setup**:
   ```bash
   # Replace with your details
   ssh username@yourdomain.com
   ```

3. **Create Directory Structure**:
   ```bash
   # Create directories
   mkdir ~/data
   mkdir ~/logs
   mkdir -p ~/public_html/flaskapp/templates
   
   # Set permissions
   chmod 750 ~/data
   chmod 750 ~/logs
   chmod 755 ~/public_html/flaskapp
   ```

4. **Setup Python Environment**:
   ```bash
   # Create virtual environment
   cd ~
   python3 -m venv venv
   source venv/bin/activate
   
   # Install required packages
   pip install flask pandas gunicorn logging
   ```

5. **Upload Files**:
   ```bash
   # Upload raw_data.csv to ~/data/
   # Upload app.py and other files to ~/public_html/flaskapp/
   # Make sure permissions are correct
   chmod 640 ~/data/raw_data.csv
   chmod 755 ~/public_html/flaskapp/*.py
   ```

6. **Create Passenger WSGI File**:



```python
import sys
import os

# Add virtual environment path
INTERP = os.path.expanduser("~/venv/bin/python3")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Add application directory to Python path
sys.path.append(os.path.expanduser("~/public_html/flaskapp"))

# Import the Flask application
from app import app as application

# Log startup
import logging
logging.basicConfig(
    filename=os.path.expanduser('~/logs/flask_app.log'),
    level=logging.INFO
)
logging.info('Application starting up')

```

7. **Create .htaccess File**:



```apache
# Enable WSGI
AddHandler wsgi-script .py
Options +ExecCGI

# URL Rewriting
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ passenger_wsgi.py/$1 [QSA,L]

# Security Headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Strict-Transport-Security "max-age=31536000; includeSubDomains"

# Prevent directory browsing
Options -Indexes

# Deny access to sensitive files
<FilesMatch "^\.">
    Order allow,deny
    Deny from all
</FilesMatch>

# Allow only web fonts and images
<FilesMatch "\.(gif|jpe?g|png|svg|woff|woff2|ttf|eot)$">
    Order allow,deny
    Allow from all
</FilesMatch>

```

8. **Configure in cPanel**:
   - Go to "Python" section
   - Create new application:
     - Application URL: / (root) or /flaskapp
     - Application startup file: passenger_wsgi.py
     - Application directory: /home/username/public_html/flaskapp
     - Python version: 3.x (latest stable)
     - App domain: Your domain name
     - Restart application: Yes

9. **Test Your Application**:
   - Visit: https://yourdomain.com or https://yourdomain.com/flaskapp
   - Check logs: `tail -f ~/logs/flask_app.log`

10. **Troubleshooting**:
    - If you get errors, check:
      ```bash
      # Check logs
      tail -f ~/logs/flask_app.log
      
      # Check permissions
      ls -la ~/public_html/flaskapp
      ls -la ~/data
      
      # Check Python processes
      ps aux | grep python
      
      # Restart application from cPanel
      ```

11. **SSL Setup**:
   - In cPanel, go to "SSL/TLS"
   - Install Let's Encrypt SSL certificate
   - Force HTTPS in .htaccess:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
