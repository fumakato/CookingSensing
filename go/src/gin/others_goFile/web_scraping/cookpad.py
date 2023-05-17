import time
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def scraping(arg):#argはURL
    # Chromeのオプションを設定する
    print("🟡2🟡")
    response=[]
    checkwords_recipe = "https://cookpad.com/recipe/"
    checkwords_kitchen = "https://cookpad.com/kitchen/"
    if arg[:len(checkwords_recipe)] == checkwords_recipe:
        print("🟡3🟡")
        print("recipe")
        options = Options()
        # ヘッドレスモード（no gui）を有効にする（次の行をコメントアウトすると画面が表示される）。
        options.add_argument('--headless')
        # ChromeのWebDriverオブジェクトを作成する。
        with webdriver.Chrome(chrome_options=options) as driver:
            print("🟡4🟡")
            # driver.get('https://cookpad.com/recipe/1438866/tsukurepos')
            driver.get(arg+"/tsukurepos")
            elems = driver.find_elements(By.CLASS_NAME,'tsukurepo-wrapper')
            for index, elem in enumerate(elems):
                tsukurepo_id = elem.get_attribute('data-tsukurepo-id')  #idの取得
                name = elem.find_element(By.CLASS_NAME,'tsukurepo_item_author_name').text   #nameの取得
                img = elem.find_element(By.CLASS_NAME,'image') 
                img2 = img.find_element(By.TAG_NAME,'img') 
                imgurl = img2.get_attribute('src')   #画像の取得
                mes = elem.find_element(By.CLASS_NAME,'message').text   #メッセージの取得
                response.append(tsukurepo_id)
                response.append(name)
                response.append(imgurl)
                response.append(mes)
            print("🟡5🟡")
            elems = driver.find_elements(By.CLASS_NAME,'tsukurepo-wrapper-last')
            for index, elem in enumerate(elems):
                tsukurepo_id = elem.get_attribute('data-tsukurepo-id')  #idの取得
                name = elem.find_element(By.CLASS_NAME,'tsukurepo_item_author_name').text   #nameの取得
                img = elem.find_element(By.CLASS_NAME,'image') 
                img2 = img.find_element(By.TAG_NAME,'img') 
                imgurl = img2.get_attribute('src')   #画像の取得
                mes = elem.find_element(By.CLASS_NAME,'message').text   #メッセージの取得
                response.append(tsukurepo_id)
                response.append(name)
                response.append(imgurl)
                response.append(mes)

    elif arg[:len(checkwords_kitchen)] == checkwords_kitchen:
        print("🟡3🟡")
        options = Options()
        # ヘッドレスモード（no gui）を有効にする（次の行をコメントアウトすると画面が表示される）。
        options.add_argument('--headless')
        # ChromeのWebDriverオブジェクトを作成する。
        with webdriver.Chrome(chrome_options=options) as driver:
            print("🟡4🟡")
            response=[]
            print("kitchen")
            # driver.get('https://cookpad.com/tsukurepo/list/7498218')
            driver.get("https://cookpad.com/tsukurepo/list/"+arg.split("/")[4])
            print("🟡4.0🟡")
            img_name = driver.find_element(By.ID,"user-icon")
            print("🟡4.1🟡")
            username = img_name.get_attribute('alt')
            print("🟡4.2🟡")
            elems = driver.find_elements(By.CLASS_NAME,'tsukurepo-wrapper')
            print("🟡4.3🟡")
            for index, elem in enumerate(elems):
                tsukurepo_id = elem.get_attribute('data-tsukurepo-id')  #idの取得
                print("🟡4.4🟡")
                # name = elem.find_element(By.CLASS_NAME,'tsukurepo_item_author_name').text   #nameの取得
                # img = elem.find_element(By.CLASS_NAME,'tsukurepo-image large_photo_clickable') 
                # img = elem.find_element_by_xpath('//img[@class="your_class_name"]')
                # img = elem.find_element_by_xpath(By.XPATH,'//img[@class="tsukurepo-image large_photo_clickable"]')
                img = elem.find_element(By.CLASS_NAME,'tsukurepo-card').find_element(By.TAG_NAME,'img').get_attribute('src')
                print("🟡4.7🟡")
                mes = elem.find_element(By.CLASS_NAME,'message').text   #メッセージの取得
                print("🟡4.8🟡")
                response.append(tsukurepo_id)
                response.append(username)
                response.append(img)
                response.append(mes)
            print("🟡5🟡")
            elems = driver.find_elements(By.CLASS_NAME,'tsukurepo-wrapper-last')
            for index, elem in enumerate(elems):
                tsukurepo_id = elem.get_attribute('data-tsukurepo-id')  #idの取得
                # name = elem.find_element(By.CLASS_NAME,'tsukurepo_item_author_name').text   #nameの取得
                img = elem.find_element(By.CLASS_NAME,'tsukurepo-card') 
                img2 = img.find_element(By.TAG_NAME,'img') 
                imgurl = img2.get_attribute('src')   #画像の取得
                mes = elem.find_element(By.CLASS_NAME,'message').text   #メッセージの取得
                response.append(tsukurepo_id)
                response.append(username)
                response.append(imgurl)
                response.append(mes)
    else:
        response.append("not supported")


    return response

# コマンドライン引数を受け取る
# arg = sys.argv[1]  # arg を文字列として取得

# 引数を処理して結果を取得
# results = scraping(arg)
print("🟡1🟡")
results = scraping("https://cookpad.com/kitchen/37779795")

# 結果を出力
for result in results:
    print(result)