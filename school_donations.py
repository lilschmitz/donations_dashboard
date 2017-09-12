from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json




import os

app = Flask(__name__)

# For Local configuration and will need to be commented out for live config
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017


# For DB live access if using Heroku
# MONGODB_URI = os.getenv('MONGODB_URI')
#
# DBS_NAME = os.getenv('MONGO_DB_NAME','donorsUSA')
# COLLECTION_NAME = os.getenv('MONGO_COLLECTION_NAME','projects')

# will need to revert to commented out os style if not local DBS_Name and Collection_Name
DBS_NAME = 'donorsUSA'
COLLECTION_NAME = 'projects'
FIELDS = {'funding_status': True, 'school_state': True, 'resource_type': True, 'poverty_level': True,
          'date_posted': True, 'total_donations': True, '_id': False, 'primary_focus_area': True}


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/donorsUS/projects")
def donor_projects():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    # connection = MongoClient(MONGODB_URI)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=55000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects



if __name__ == "__main__":
    app.run(debug=True)

