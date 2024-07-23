import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.patches import Patch
from matplotlib import patches
import matplotlib.animation as animation
import statistics
import math
from matplotlib.backends.backend_pdf import PdfPages

def feature_extraction():
    fname = "ayato2"

    wAcc = pd.read_csv(f"cut/{fname}_acc.csv", encoding = 'utf-8')

    # Hz = (wAcc["time"][len(wAcc)-1]-wAcc["time"][0])/(len(wAcc)-1)

    # ノルムの計算
    norm = ( wAcc["x"]**2 + wAcc["y"]**2+ wAcc["z"]**2 )**0.5

    ma = 0
    mi = 0
    if fname == "ayato2":
        ma = 116
        mi = 36
    elif fname == "ogane2":
        ma = 73
        mi = 22
    elif fname == "ohashi2":
        ma = 106
        mi = 26
    elif fname == "suzakiR":
        ma = 120
        mi = 34
    elif fname == "momR":
        ma = 80
        mi = 30

    data = norm
    cutList = []
    cutListTime = []
    cutListData = []


    timeFlg = True
    timeDeff = -3000
    thFlg = True
    for i in range(len(data)):
        if (wAcc["time"][i] - timeDeff)/1000 > 0.2: timeFlg = True
        if data[i] > 13.5 and mi<=(wAcc["time"][i]-wAcc["time"][0])/1000<=ma:
            if timeFlg and thFlg:
                timeFlg = False
                timeDeff = wAcc["time"][i]
                cutList.append([wAcc["time"][i], data[i]])
                cutListTime.append(wAcc["time"][i])
                cutListData.append(data[i])
            elif cutList[len(cutList)-1][1] < data[i]: 
                cutList[len(cutList)-1] = [wAcc["time"][i], data[i]]
                cutListTime[len(cutList)-1] = wAcc["time"][i]
                cutListData[len(cutList)-1] = data[i]
            thFlg = False
        else: thFlg = True

    print("cut:"+str(len(cutList)))

    tempo = -1
    tempoRap = []
    tempoRapCount = 0
    for i in range(len(cutList)):
        if i == 0: 
            tempoRapCount+=1
            continue
        if tempo == -1: tempo = cutList[i][0] - cutList[i-1][0]
        else: 
            timeDeff = cutList[i][0] - cutList[i-1][0]
            if timeDeff < 1500: 
                tempo = (tempo+timeDeff)/2
            else: 
                tempoRap.append(tempoRapCount)
                tempoRapCount = 0
        tempoRapCount+=1
    tempoRap.append(tempoRapCount)
    tempoRapCount = 0
    for data in tempoRap: tempoRapCount+=data
    tempoRapCount/=len(tempoRap)

    return_dict = {
        'aveTempo': str(tempo/1000),
        'aveAcc': str(statistics.mean(cutListData)),
        'stdev': str(statistics.pstdev(cutListData))
    }

    return return_dict