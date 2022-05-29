# from calendar import c
# from crypt import methods
from flask import *
import pandas as pd
import plotly.express as px
from plotly.offline import plot
import io
import statsmodels.api as sm
import json
import plotly
# from flask_cors import CORS, cross_origin
# from flask_restful import Api, Resource
import time
import os
# import logging
# 

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
app = Flask(__name__,template_folder='template')

# cors = CORS(app)
# CORS(app)
# app.config['CORS_HEADERS'] = 'application/json'
# api =   Api(app)
df = pd.read_csv (r'cleaned.csv')
df['price'] = df['price']*71.4
# app = Flask(__name__)

from tensorflow import keras

model = keras.models.load_model(r"model.h5")
testing = pd.DataFrame({
  "displacement":[4999]		,"torque":[310]	,"fuel_tank":[76.0]	,"doors":[5]	,"seats":[10]	,"airbags":[4]	,"Mileage_bin":[7.0]	,"EV_bin":[1.0],"keyless_entry":[1],	"start/stop" : [0] ,	"12Vpower" :[1],	"Aux":[1],	"enginemalf_alarm":[0], 	"highspeed_alert" : [0.0] ,	"tripmeter":[0]
})  

# print(model.predict(testing)[0][0])
def showb(id):
    df2 = df[df['cluster'] == int(id)].groupby(by = 'make').count()['model'].to_numpy()
    arr = df[df['cluster'] == int(id)].groupby(by = 'make').count()['model'].keys()
    # df2.multiply(71.42)
    fig = px.bar(x=arr,y=df2, width=800,height=400)
    fig.update_layout(
    title="Number of cars vs. brand",
    xaxis_title="Brand",
    yaxis_title="Number of cars",
    font=dict(
        size=16,
       )
    )
    return json.dumps(fig,cls = plotly.utils.PlotlyJSONEncoder)


def showt():
    arr = df['cluster'].unique()
    df['price'] = df['price'].astype(int)
    df2 =  df.groupby(['cluster'])['price'].mean().sort_values()
    df2.multiply(71.42)
    fig = px.bar(x=arr,y=df2, width=800,height=400)
    fig.update_layout(
    title="Car price(Rupees) vs. Segments",
    xaxis_title="Segment Number",
    yaxis_title="Average Price",
    paper_bgcolor = 'hsla(255,255,255,0)',
    font=dict(
        size=16,
       )
    )
    return json.dumps(fig,cls = plotly.utils.PlotlyJSONEncoder)


def showScatter():
    fig = px.scatter(df, x="power", y="price", color="cluster", marginal_y="violin",
           marginal_x="box", trendline="ols", template="simple_white",title = "power vs. price(rupees) with different clusters",)
    fig.update_layout(paper_bgcolor = 'hsla(255,255,255,0)')       

    return json.dumps(fig,cls = plotly.utils.PlotlyJSONEncoder)
    



@app.route('/callback',methods = ['POST','GET'])
def cb():
    return 

def draw(p1,p2):
 arr  = df.groupby(['cluster']).count()['make'].sort_values().keys()
 df7 = df.groupby(['cluster']).count()['make'].sort_values().to_numpy()

 

 

 fig = px.bar(x=arr,y=df7, width=800,height=400)
 fig.update_layout(
    title="Cars Count vs. Segments",
    xaxis_title="Segments",
    yaxis_title="Number of Cars",
    paper_bgcolor = 'hsla(255,255,255,0)',
    font=dict(
        size=16,
    )
 )


#  fig.show()
#  img =  px.io.to_image(fig, format='png')
#  img.seek(0)
 return json.dumps(fig,cls = plotly.utils.PlotlyJSONEncoder)

@app.route("/")
def hello_worl():
    return render_template('home.html')

@app.route("/segments")
def segments():
    return render_template('segments.html',graphJSON = showt(),graphJSON2 = draw(str("cluster"),"price"),graphJSON3 = showScatter())


def total_cars(x):
    return df[df.cluster == int(x)].count()['make']

def getavgmileage(x):
    return df[df.cluster == int(x)]['mileage'].mean()

def getavgprice(x):
    return df[df.cluster == int(x)]['price'].mean()
    
def showp(x,y):
    df2 = df[df['cluster'] == int(x)].groupby(by=y).count()
    fig = px.pie(df2, values='variant', names=df2.index,title =y.replace("_",' ').capitalize())

    return json.dumps(fig,cls = plotly.utils.PlotlyJSONEncoder)    


 


@app.route("/dat", methods=['GET','POST'])
# @cross_origin()
def dat():
       
       print(request.form['fname'])
    #    print(first_name , last_name)
    #    print("Your name is ", first_name, last_name)
       response = jsonify(message= "response")

    # Enable Access-Control-Allow-Origin
       response.headers.add("Access-Control-Allow-Origin", "*")
    #    return jsonify("Your name is ",first_name , last_name)
       return response
    #    return "asd"
    # return "hello"

def maxfreq(x):
    d = []
    bools= ["No","Yes"]
    qualities = ['body_type','fuel_type','fuel_system','type','drivetrain','cylinders','fuel_tank','seats','airbags','odometer','speedometer','keyless_entry','Aux']
    for quality in qualities:
        if quality in ['keyless_entry','Aux']:
           d.append([quality , bools[df[df['cluster'] == int(x)][quality].value_counts().keys()[0]]] )
        else:
           d.append([quality , df[df['cluster'] == int(x)][quality].value_counts().keys()[0]] )
    return d
@app.route("/segments/<x>/<y>")
def sgmntx(x,y):
    return render_template('sgmntx.html',x = total_cars(x),avgprice = "{:,}".format(int(getavgprice(x)))  ,avgmileage = int(getavgmileage(x)),graphJSON = showb(x),graphJSON2 = showp(x,y),mx = maxfreq(x),sgmnt = x)

def predictCost(p):
      displacement = int(p.form['displacement'])
      torque = int(p.form['torque'])
      fuel_tank = float(p.form['fuel_tank'])
      doors = int(p.form['doors'])
      seats = int(4)
      airbags = int(p.form['airbags'])
      Mileage_bin = (float(p.form['mileage'])*9)//26
      EV_bin = (float(p.form['power'])*4)//800
 
      feature_list = []    
    #   print(p.args)
      k = p.form.to_dict(flat = False)
      for feature in ['keyless_entry','start/stop','12Vpower',"Aux",'enginemalf_alarm','highspeed_alert','tripmeter']:
        if feature in p.form:
          feature_list.append(1)
        else:
          feature_list.append(0)   
      
      len(feature_list)    
    #   testing = pd.DataFrame({
    #    "displacement":[4999],"torque":[310]	,"fuel_tank":[76.0]	,"doors":[5]	,"seats":[10]	,"airbags":[4]	,"Mileage_bin":[7.0]	,"EV_bin":[1.0],
    #    "keyless_entry":[1],	"start/stop" : [0] ,	"12Vpower" :[1],	"Aux":[1],	"enginemalf_alarm":[0], 	"highspeed_alert" : [0.0] ,	"tripmeter":[0]
    #    }) 
      testing = pd.DataFrame({
       "displacement":[displacement],"torque":[torque]	,"fuel_tank":[float(fuel_tank)]	,"doors":[doors]	,"seats":[seats]	,"airbags":[airbags]	,"Mileage_bin":[float(Mileage_bin)]	,"EV_bin":[float(EV_bin)],
       "keyless_entry":[feature_list[0]],	"start/stop" : [feature_list[1]] ,	"12Vpower" :[feature_list[2]],	"Aux":[feature_list[3]],	"enginemalf_alarm":[feature_list[4]], 	"highspeed_alert" : [float(feature_list[5])] ,	"tripmeter":[feature_list[6]]
       })  

      return model.predict(testing)[0][0]*445


@app.route("/predict",methods = ['GET','POST'])
def predictnplay():
    if request.method == "POST":
        return render_template('predictnplay.html',torque = request.form['torque'],tfuel = request.form['fuel_tank'],cost = "{:,}".format(int(predictCost(request))),gmode = 1)
    else:
        return render_template('predict.html')
@app.route("/game")
def game():
    return render_template('game.html',gmode = 0)

@app.route("/data")
def data():
    return render_template("dump.html")
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/show/<param1>")
# @cross_origin()
def hello_world(param1):
       return send_file(io.BytesIO(draw(str(param1),"Doors").make_image(),
                 attachment_filename='logo.png',
                 mimetype='image/png'))

if __name__ == "__main__":
    app.run(debug=True)    