
from sklearn.cluster import KMeans
import numpy as np
import pandas as pd

df = pd.read_csv('carscleaned01.csv')
num_cols = [ i for i in df.columns if df[i].dtype != 'object']
  
km = KMeans(n_clusters=8, n_init=20, max_iter=400, random_state=0)
clusters = km.fit_predict(df[num_cols])
df['cluster'] = clusters
df.cluster = (df.cluster + 1).astype('object')
df.sample(5)
df.to_csv('cleaned.csv')



