from flask import Flask, request, jsonify
from flask_cors import CORS
from helpers import getTrafficData

app = Flask(__name__)
CORS(app)

@app.route("/")
@app.route("/visaogeral", methods=["GET"])
def visaogeral():
    year = request.args.get("year")
    region = request.args.get("region")
    state = request.args.get("state")
    if int(year) > 2006:
        data = getTrafficData(year, region, state)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)