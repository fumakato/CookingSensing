from flask import Flask, jsonify, request
import external_code  # 別ファイルをインポート
import featureExtraction
import logging  # ロギングモジュールをインポート

app = Flask(__name__)

# ロギングの設定
logging.basicConfig(level=logging.ERROR)  # ロギングレベルを設定
logger = logging.getLogger(__name__)

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

@app.route('/feature_extraction', methods=['POST'])
def post_example1():
    data = request.get_json()
    url = data.get('url')
    response = featureExtraction.feature_extraction(url)
    # result = featureExtraction.feature_extraction()
    # response = {
    #     'result': result
    # }
    # return jsonify(response)
    return response

# カスタムエラーハンドラ
@app.errorhandler(Exception)
def handle_exception(e):
    # エラーログにエラーの詳細を記録
    logger.error(f"Unhandled Exception: {e}")
    return jsonify({'error': 'An unexpected error occurred'}), 500

# サーバを実行
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # ポートは適宜変更してください
