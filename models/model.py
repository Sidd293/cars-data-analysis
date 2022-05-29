



# app = Flask(__name__)
import pickle
from calendar import c
from flask import *
import pandas as pd
import plotly.express as px
from plotly.offline import plot
import io
import json
import plotly
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource
import time

df = pd.read_csv (r'cleaned.csv')

import os

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

pd.set_option('display.max_columns', 40)
import numpy as np
from sklearn.cluster import KMeans
import warnings

warnings.filterwarnings('ignore');
pd.set_option('display.max_columns', None)
labels=[0,1,2,3,4,5,6,7,8,9]
df['Mileage_bin']=pd.cut(df['mileage'],len(labels),labels=labels)
df['Mileage_bin']=df['Mileage_bin'].astype(float)
labels=[0,1,2,3,4]
df['EV_bin']=pd.cut(df['power'],len(labels),labels=labels)
df['EV_bin']=df['EV_bin'].astype(float)
df['price_log']=np.log(df['price'])
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
cols_drop=['make', 'model','car', 'variant', 'body_type', 'fuel_type', 'fuel_system','type', 'drivetrain','height', 'length', 'width', 'wheelbase', 'price','price_log','cylinders','speedometer','odometer','immobiliser','mileage','power','cluster']
X=df.drop(cols_drop,axis=1)
y=df['price']
X_train,X_test,y_train,y_test=train_test_split(X,y,test_size=0.2,random_state=25)
scaler=StandardScaler()
X_train_scaled=scaler.fit_transform(X_train)
X_test_scaled=scaler.transform(X_test)


from sklearn.model_selection import train_test_split




from sklearn.preprocessing import StandardScaler




from keras.models import Sequential

from keras.layers import Dense

model_dl_large=Sequential()


model_dl_large.add(Dense(64,input_dim=X_train_scaled.shape[1],activation='relu'))

model_dl_large.add(Dense(32,activation='relu'))

model_dl_large.add(Dense(16,activation='relu'))

model_dl_large.add(Dense(1,activation='linear'))

model_dl_large.compile(loss='mean_squared_error',optimizer='adam')

model_dl_large.summary()

epochs=20

batch_size=10

model_dl_large.fit(X_train_scaled,np.log(y_train),validation_data=(X_test_scaled,np.log(y_test)),epochs=epochs,batch_size=batch_size)

#exported as model.h5 
model_dl_large.save('model')
