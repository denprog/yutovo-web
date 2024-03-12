import psycopg2
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from psycopg2.extensions import AsIs
import time

def registerUser(driver, username, password, email):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'register')))
    b.click()
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'username\']')))
    e.send_keys(username)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'email\']')))
    e.send_keys(email)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'password\']')))
    e.send_keys(password)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'repeate password\']')))
    e.send_keys(password)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    b.click()

def login(driver, username, password):
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'login')))
    b.click()
    time.sleep(1)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'username\']')))
    e.send_keys(username)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'password\']')))
    e.send_keys(password)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    b.click()

def logout(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'logout')))
    b.click()

def new(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'new-button')))
    b.click()

def save(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'save-button')))
    b.click()

def saveAs(driver, filename):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'save-as-button')))
    b.click()
    time.sleep(1)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'filename\']')))
    e.send_keys(filename)
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    b.click()

def rename(driver, filename):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'rename-button')))
    b.click()
    time.sleep(1)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'filename\']')))
    e.send_keys(filename)
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    b.click()

def delete(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'delete-button')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'OK\')]')))
    b.click()

def copy(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'copy-button')))
    b.click()

def paste(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'paste-button')))
    b.click()

def cut(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'cut-button')))
    b.click()

def clickCategory(driver, name):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + name + '\')]')))
    b.click()

def clickTask(driver, category1, category2, name):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + category1 + '\')]')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + category2 + '\')]')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + name + '\')]')))
    b.click()

def clickDocument(driver, text):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + text + '\')]')))
    b.click()

def loginCaption(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'login_caption')))
    return b.text

def writeText(driver, text):
    c = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
    c.send_keys(text)

def insertCode(driver):
    c = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'code-button')))
    c.click()

def clickIdentifier(driver, category):
    arr = category.split('/')
    for i in range(len(arr)):
        print(arr[i])
        b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + arr[i] + '\')]')))
        b.click()
        time.sleep(1)

def getDocumentName(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'document-name')))
    return b.text

def setLanguage(driver, language):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'language-select')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + language + '\')]')))
    b.click()

def getLanguage(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'language-select')))
    return b.text

def getDbConnection():
    return psycopg2.connect(dbname = "yutovo", host = "127.0.0.1", user = "yutovo", password = "11", port = 5432)

def deleteTestUser(conn):
    cursor = conn.cursor()
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from users where login=\'test1\'')
    conn.commit()

def clearTestUser(conn):
    cursor = conn.cursor()
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test2\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test2\')')
    cursor.execute('update users set language=\'\' where login=\'test1\'')
    cursor.execute('update users set language=\'\' where login=\'test2\'')
    conn.commit()

def fileContains(conn, document_id, str):
    cursor = conn.cursor()
    cursor.execute('select 1 from user_documents where document_id = %s and jsonb_path_exists(document, \'$.** ? (@.type() == "string" && @ like_regex "%s")\')', 
        (document_id, AsIs(str)))
    return cursor.fetchone() is not None

def documentContains(driver, str):
    t = driver.execute_script('return window.getText();')
    return str in t
