from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Hello, from FLASK!!!"})

@app.route('/api', methods=['GET'])
def api():
    return jsonify({"message": "Hello, this is a test API!"})

if __name__ == '__main__':
    app.run(debug=True)