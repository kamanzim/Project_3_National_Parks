import numpy as np
from config import password
from config import username
import psycopg2
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
username = username
password = password
database = "postgresql://" + username + ":" + password + "@localhost:5432/national_parks_db"
engine = create_engine(database)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)



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
    return render_template("index_map.html")

@app.route("/api/v1.0/routes")
def routes():
    return (
    f"Welcome to the National Park Dashboard API<br/>"
    f"Available Routes:<br/>"
    f"/api/v1.0/Parks<br/>"
    f"/api/v1.0/Visitation<br/>"
    f"/api/v1.0/Species<br/>"
    f"/api/v1.0/Trails<br/>"
    f"/api/v1.0/Trail_Features</br>"
    f"/api/v1.0/Trail_BY_ParkCode</br>"
    f"/api/v1.0/Trail_Activities</br>"
    f"/api/v1.0/Top 10 Parks visited</br>"
    f"/api/v1.0/<start>/<end>"
    )


@app.route("/api/v1.0/Parks")
def parks():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM national_parks order by park_name")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)



@app.route("/api/v1.0/Visitation")
def visitation():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM parks_visitation")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)

@app.route("/api/v1.0/Species")
def species():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM species")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)


@app.route("/api/v1.0/Trails")
def trails():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM park_trails")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)


@app.route("/api/v1.0/Trail_Features")
def trail_feats():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM trail_features")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)

@app.route("/api/v1.0/Trail_BY_ParkCode")
def trail_by_parkcode():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "select np.park_code,ta.activities from trail_activities ta \
	            inner join national_parks np \
	            on ta.park_name = np.park_name;"
    cursor.execute(query)
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)

@app.route("/api/v1.0/Trail_Activities")
def trail_acts():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM trail_activities")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)


@app.route("/api/v1.0/Top 10 Parks visited")
def top_parks():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "select np.park_code, pv.park_name, sum(pv.visitors) from parks_visitation pv \
	        inner join national_parks np \
	        on pv.park_name = np.park_name \
	        group by np.park_code, pv.park_name \
	        order by 3 desc LIMIT 10;"
    cursor.execute(query)
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)

@app.route("/api/v1.0/Bottom_10_Parks_visited")
def bottom_parks():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "select np.park_code, pv.park_name, sum(pv.visitors) from parks_visitation pv \
	        inner join national_parks np \
	        on pv.park_name = np.park_name \
	        group by np.park_code, pv.park_name \
	        order by 3 asc LIMIT 10;"
    cursor.execute(query)
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)

@app.route("/api/v1.0/Trail_Miles")
def trail_miles():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    cursor.execute("select np.park_code, pt.park_name, sum(pt.length) from park_trails pt \
	        inner join national_parks np \
	        on pt.park_name = np.park_name \
	        group by np.park_code, pt.park_name \
	        order by 3 desc LIMIT 10;")
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)

@app.route("/api/v1.0/top_10_size")
def top_10_size():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "select np.park_code, np.park_name, np.acres from national_parks np \
	         order by 3 desc LIMIT 10;"
    cursor.execute(query)
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)


@app.route("/api/v1.0/rare_species")
def rare_species():
    cursor = connection.cursor(cursor_factory = psycopg2.extras.DictCursor)
    query = "select np.park_code, sp.park_name, count(sp.common_names) from species sp \
            inner join national_parks np \
	        on sp.park_name = np.park_name \
			WHERE sp.abundance = 'Rare'\
	        group by np.park_code, sp.park_name \
            order by 3 desc LIMIT 10;"
    cursor.execute(query)
    columns = list(cursor.description)
    result = cursor.fetchall()
    results = []
    for row in result:
        row_dict = {}
        for i, col in enumerate(columns):
            row_dict[col.name] = row[i]
        results.append(row_dict)

    return jsonify(results)
@app.route("/api/v1.0/<start>/<end>")
def startend():
    return (

    )   

if __name__ == '__main__':
    app.run(debug=True)
