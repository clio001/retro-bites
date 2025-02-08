from flask import Flask, request, render_template
import json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    with open("static/db.json", "r") as f:
        COLLECTION = json.load(f)
    
    return render_template("index.html", menucards=COLLECTION)

@app.route("/ueber")
def ueber():
    return render_template("ueber.html")