from flask_frozen import Freezer
from app import app
import json

freezer = Freezer(app)

# Register a generator for the /item/<int:item_id> route
@freezer.register_generator
def item_nr():
    with open("static/db.json", "r", encoding="utf-8") as f:
        collection = json.load(f)
        for item in collection:
            yield {'item_id': item['id']}  # Properly indented

if __name__ == '__main__':
    freezer.freeze()