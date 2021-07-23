import numpy as np
from config import password
from config import username

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
password = password
database = "postgresql://" + username + ":" + password + "@localhost:5432/national_parks_db"
engine = create_engine(database)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
# print(Base.classes.keys)
# Save reference to the table
Parks = Base.classes.national_parks
Visitation = Base.classes.parks_visitation
Species = Base.classes.species
Trails = Base.classes.park_trails
Trailfeats = Base.classes.trail_features
Trailacts = Base.classes.trail_activities

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
# Create session 
    session = Session(engine)

    results = session.query(Parks.park_code, Parks.park_name, Parks.state, Parks.acres).all()

    session.close()

    allresults = list(np.ravel(results))

    return jsonify(allresults)



@app.route("/api/v1.0/Visitation")
def visitation():
    session = Session(engine)

    results = session.query(Visitation.park_name, Visitation.state, Visitation.visitors, Visitation.year).all()

    session.close()

    allresults = list(np.ravel(results))

    return jsonify(allresults)

@app.route("/api/v1.0/Species")
def species():
    session = Session(engine)

    results = session.query(Species.park_name, Species.species_id, Species.category, Species.scientific_name, Species.common_names, Species.occurrence, Species.abundance).all()

    session.close()

    allresults = list(np.ravel(results))

    return jsonify(allresults)


@app.route("/api/v1.0/Trails")
def trails():
    session = Session(engine)

    results = session.query(Trails.trail_id, Trails.trail_name, Trails.park_name, Trails.city, Trails.state, Trails.popularity, Trails.length, Trails.elevation_gain, Trails.difficulty_rating, Trails.route_type, Trails.visitor_usage, Trails.units).all()

    session.close()

    allresults = list(np.ravel(results))

    return jsonify(allresults)


@app.route("/api/v1.0/Trail_Features")
def trail_feats():
    session = Session(engine)

    results = session.query(Trailfeats.park_name, Trailfeats.features, Trailfeats.id, Trailfeats.trail_id).all()

    session.close()

    allresults = list(np.ravel(results))

    return jsonify(allresults)


@app.route("/api/v1.0/Trail_Activities")
def trail_acts():
    session = Session(engine)

    results = session.query(Trailacts.trail_id, Trailacts.activities, Trailacts.park_name, Trailacts.id).all()

    session.close()

    allresults = list(np.ravel(results))

    return jsonify(allresults)
      


@app.route("/api/v1.0/<start>/<end>")
def startend():
    return (

    )   

if __name__ == '__main__':
    app.run(debug=True)
