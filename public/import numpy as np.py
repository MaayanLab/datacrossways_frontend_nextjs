import numpy as np
import pandas as pd
import time

df = pd.DataFrame(np.random.randn(1000, 3000))

s1 = 3000**2
s2 = 140000**2
factor = s2/s1

t1 = time.time()
cc = df.corr()

print("time estimate: ~"+str(round(factor*(time.time()-t1)/(60*60)))+" hours")

