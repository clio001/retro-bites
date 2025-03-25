from flask import Flask, request, render_template, redirect, url_for, abort
import json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    with open("static/db.json", "r", encoding="utf-8") as f:
        COLLECTION = json.load(f)
    
    return render_template("index.html", menucards=COLLECTION)

@app.route("/item")
def empty_item_redirect():
    with open("static/db.json", "r", encoding="utf-8") as f:
        COLLECTION = json.load(f)
    # Redirect to the item with ID 1
    return redirect(url_for('item_nr', item_id=4))

@app.route("/item/<int:item_id>")
def item_nr(item_id):
    with open("static/db.json", "r", encoding="utf-8") as f:
        COLLECTION = json.load(f)

    # Find the item with the given ID
    item = next((item for item in COLLECTION if item["id"] == item_id), None)
    
    if item is None:
        abort(404)  # Item not found, return a 404 error

        
    return render_template("item.html", item=item)

@app.route("/sammlung")
def sammlung():
    return render_template("collection.html")

@app.route("/data")
def data():
    return render_template("data.html")

@app.route("/team")
def team():
    return render_template("team.html")