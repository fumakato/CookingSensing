import pandas as pd
import statistics
import heapq
import requests
import os
import logging
from flask import jsonify
from app import app  # メインアプリケーションからインポート

def feature_extraction(url):
    try:
        urldata = url
        # print(urldata)
        try:
            response = requests.get(url)
            response.raise_for_status()  # HTTPエラーが発生した場合は例外を送出
            temp_filename = "temp_acc.csv"
            with open(temp_filename, 'wb') as file:
                file.write(response.content)
        except requests.exceptions.RequestException as e:
            logging.error(f"Failed to download the file: {e}")

        # CSVファイルを読み込む
        wAcc = pd.read_csv(temp_filename, encoding='utf-8')

        # # fname = "kakumu"
        # # wAcc = pd.read_csv(f"cut/{fname}_acc.csv", encoding = 'utf-8')
        # wAcc = pd.read_csv(f"cut/fuma_evaluation/{fname}-acc.csv", encoding = 'utf-8')

        # ノルムの計算
        norm = ( wAcc["x"]**2 + wAcc["y"]**2+ wAcc["z"]**2 )**0.5

        data = norm
        cutList = []
        cutListTime = []
        cutListData = []

        cutNum = 0
        tmp = 0
        threshold = 10
        for j in range(2):
            print("threshold:"+str(threshold))
            timeFlg = True
            timeDeff = -3000
            thFlg = True
            for i in range(len(data)):
                if (wAcc["time"][i] - timeDeff)/1000 > 0.2: timeFlg = True
                if data[i] > threshold:
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

            #ここから新しく入れたところ 
            # 一番目と二番目に大きいデータを取得
            top_2 = heapq.nlargest(2, cutListData)
            # 一番目と二番目に大きいデータのインデックスを取得
            top_1_index = cutListData.index(top_2[0])
            top_2_index = cutListData.index(top_2[1])
            # 切ってない部分を削除
            cutList = cutList[top_1_index+1:top_2_index]
            cutListTime = cutListTime[top_1_index+1:top_2_index]
            cutListData = cutListData[top_1_index+1:top_2_index]
            # 切ってない部分を削除
            # cutList = cutList[top_1_index+1:]
            # cutListTime = cutListTime[top_1_index+1:]
            # cutListData = cutListData[top_1_index+1:]
            if j==0:
                # 上から5つの大きいデータを取得
                average = sum(heapq.nlargest(5, cutListData)) / 5
                threshold = average * 0.8
                print("cut:"+str(len(cutList)))
                # fuseya 0.77
                # ao 0.83
                # 

        # cutNum = 0
        # tmp = 0
        # while cutNum<35: # 極度に回数が少ないときは閾値を下げる
        #     threshold = 13.5 - ( tmp * 0.55 )
        #     timeFlg = True
        #     timeDeff = -3000
        #     thFlg = True
        #     for i in range(len(data)):
        #         if (wAcc["time"][i] - timeDeff)/1000 > 0.2: timeFlg = True
        #         if data[i] > threshold:
        #             if timeFlg and thFlg:
        #                 timeFlg = False
        #                 timeDeff = wAcc["time"][i]
        #                 cutList.append([wAcc["time"][i], data[i]])
        #                 cutListTime.append(wAcc["time"][i])
        #                 cutListData.append(data[i])
        #             elif cutList[len(cutList)-1][1] < data[i]: 
        #                 cutList[len(cutList)-1] = [wAcc["time"][i], data[i]]
        #                 cutListTime[len(cutList)-1] = wAcc["time"][i]
        #                 cutListData[len(cutList)-1] = data[i]
        #             thFlg = False
        #         else: thFlg = True
        #     # 一番目と二番目に大きいデータを取得
        #     top_2 = heapq.nlargest(2, cutListData)
        #     # 一番目と二番目に大きいデータのインデックスを取得
        #     top_1_index = cutListData.index(top_2[0])
        #     top_2_index = cutListData.index(top_2[1])
        #     # 切ってない部分を削除
        #     # cutList = cutList[top_1_index+1:top_2_index]
        #     # cutListTime = cutListTime[top_1_index+1:top_2_index]
        #     # cutListData = cutListData[top_1_index+1:top_2_index]
        #     cutList = cutList[top_1_index+1:]
        #     cutListTime = cutListTime[top_1_index+1:]
        #     cutListData = cutListData[top_1_index+1:]
        #     cutNum = len(cutList)
        #     print(tmp, threshold, cutNum)
        #     tmp = tmp + 1
            

        print("cut:"+str(len(cutList)))
        # print(cutList)


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
        # tempo/1000 1回切るのに必要な時間
        pace = 1/tempo*1000

        

        # 'aveTempo': str(tempo/1000),
        return_dict = {
            'avePace': pace,
            'aveAcc': statistics.mean(cutListData),
            'stdev': statistics.pstdev(cutListData)
        }
        
        os.remove(temp_filename)
        return jsonify(return_dict)
    
    except Exception as e:
        app.logger.error(f"Unhandled Exception: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500

        