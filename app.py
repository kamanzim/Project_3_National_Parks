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
database = "postgresql://" + username + ":" +password+ "@localhost:5432/national_parks_db"
engine = create_engine(database)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys)
# Save reference to the table
Parks = Base.classes.national_parks
Visitation = Base.classes.parks_visitation
Species = Base.classes.species
Trails = Base.classes.parks_trails
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
        f"/api/v1.0/Parks"
        f"/api/v1.0/Visitation"
        f"/api/v1.0/Species"
        f"/api/v1.0/Trails"
        f"/api/v1.0/<start>/<end>"
     )

def parks():
# Create session 
    session = Session(engine)

# Query precipitation amounts
    results = session.query(Parks.park_code).all()

    session.close()


    return jsonify(results)