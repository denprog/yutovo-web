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
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'login')))
    b.click()
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

def open(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'open-button')))
    b.click()

def save(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'save-button')))
    b.click()

def saveAs(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'save-as-button')))
    b.click()

def delete(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'delete-button')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'OK\')]')))
    b.click()

def div(driver, text):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + text + '\')]')))
    b.click()

def writeText(driver, text):
    c = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
    c.send_keys(text)

def getDbConnection():
    return psycopg2.connect(dbname = "yutovo", host = "127.0.0.1", user = "yutovo", password = "11", port = 5432)

def deleteTestUser(conn):
    cursor = conn.cursor()
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from users where login=\'test1\'')
    conn.commit()

def clearTestUser(conn, driver):
    driver.delete_all_cookies()
    cursor = conn.cursor()
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test1\')')
    conn.commit()

def fileContains(conn, document_id, str):
    cursor = conn.cursor()
    cursor.execute('select 1 from user_documents where document_id = %s and jsonb_path_exists(document, \'$.** ? (@.type() == "string" && @ like_regex "%s")\')', 
        (document_id, AsIs(str)))
    return cursor.fetchone() is not None

def documentContains(driver, str):
    t = driver.execute_script('return window.getText();')
    return str in t
