from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/fraud-reports', methods=['GET'])
def get_fraud_reports():
    # Return mock fraud reports data
    fraud_reports = [
        {
            'id': '1',
            'type': 'Spam',
            'description': 'Multiple spam job postings detected',
            'reported_at': '2024-04-01T10:00:00Z'
        },
        {
            'id': '2',
            'type': 'Fraud',
            'description': 'Fake candidate profiles detected',
            'reported_at': '2024-04-02T15:30:00Z'
        }
    ]
    return jsonify(fraud_reports)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=7000, debug=True)
