import psycopg2
import pandas as pd

import numpy as np
from numpy.core.fromnumeric import ravel
from config import password
from config import username

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
password = password
username = username
connection = psycopg2.connect(user=username,
                              password=password,
                              host="localhost",
                              port="5432",
                              database="national_parks_db")

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def home():
     return (
        f"Welcome to the National Park Dashboard API<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/Parks<br/>"
        f"/api/v1.0/Visitation<br/>"
        f"/api/v1.0/Species<br/>"
        f"/api/v1.0/Trails<br/>"
        f"/api/v1.0/Trail_Features</br>"
        f"/api/v1.0/Trail_Activities</br>"
        f"/api/v1.0/<start>/<end>"
     )

@app.route("/api/v1.0/Parks")
def parks():

    query = "select park_code, park_name, state, acres from national_parks;"
    parks_df = pd.read_sql(query, con = connection)

    parks_list = list(np.ravel(parks_df))

    return jsonify(parks_list)



@app.route("/api/v1.0/Visitation")
def visitation():

    query = "select np.park_code, pv.park_name, sum(pv.visitors) from parks_visitation pv \
	        inner join national_parks np \
	        on pv.park_name = np.park_name \
	        group by np.park_code, pv.park_name \
	        order by 3 desc LIMIT 10;"
    parks_v_df = pd.read_sql(query, con = connection)
    parks_vis_list = list(np.ravel(parks_v_df))

    return jsonify(parks_vis_list)

@app.route("/api/v1.0/Species")
def species():

    query = "select park_name, species_id, category, scientific_name, common_names, occurrence, abundance from species;"

    species_df = pd.read_sql(query, con = connection)
    species_list = list(np.ravel(species_df))

    return jsonify(species_list)


@app.route("/api/v1.0/Trails")
def trails():
    
    query = "select park_name, trail_id, trail_name, city, state, popularity, length, elevation_gain, difficulty_rating, route_type, visitor_usage, units from park_trails;"

    park_trails_df = pd.read_sql(query, con = connection)
    park_trails_list = list(np.ravel(park_trails_df))

    return jsonify(park_trails_list)


@app.route("/api/v1.0/Trail_Features")
def trail_feats():
    
    query = "select park_name, trail_id, features from trail_features;"
    
    trail_feat_df = pd.read_sql(query, con = connection)
    trail_feat_list = list(np.ravel(trail_feat_df))

    return jsonify(trail_feat_list)


@app.route("/api/v1.0/Trail_Activities")
def trail_acts():
    
    query = "select park_name, trail_id, activities from trail_activities;"

    trail_act_df = pd.read_sql(query, con = connection)
    trail_act_list = list(np.ravel(trail_act_df))

    return jsonify(trail_act_list)

if __name__ == '__main__':
    app.run(debug=True)