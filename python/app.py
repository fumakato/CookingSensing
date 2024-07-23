# from flask import Flask, request, jsonify

# app = Flask(__name__)

# # GETリクエスト用のルート
# @app.route('/api/get_example', methods=['GET'])
# def get_example():
#     response = {
#         'message': 'This is a GET request example.'
#     }
#     return jsonify(response)

# # POSTリクエスト用のルート
# @app.route('/api/post_example', methods=['POST'])
# def post_example():
#     data = request.json
#     response = {
#         'message': 'This is a POST request example.',
#         'data_received': data
#     }
#     return jsonify(response)

# # サーバを実行
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, jsonify
import external_code  # 別ファイルをインポート
import featureExtraction

app = Flask(__name__)

# GETリクエスト用のルート
@app.route('/get', methods=['GET'])
def get_example():
    # 別ファイルの関数を呼び出す
    result = external_code.run_external_code()
    response = {
        'message': 'GET request received and external code executed.',
        'result': result
    }
    return jsonify(response)

@app.route('/get2', methods=['GET'])
def get_example2():
    response = {
        'message': 'This is a GET request example.'
    }
    return jsonify(response)

@app.route('/feature_extraction', methods=['GET'])
def get_example3():
    result = featureExtraction.feature_extraction()
    response = {
        'result': result
    }
    return jsonify(response)

# サーバを実行
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # ポートは適宜変更してください
