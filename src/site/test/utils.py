import os
import psycopg2
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from psycopg2.extensions import AsIs
import time

def registerUser(driver, username, password, email):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'register')))
    b.click()
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'login\']')))
    e.send_keys(username)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'email\']')))
    e.send_keys(email)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'password\']')))
    e.send_keys(password)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'repeate password\']')))
    e.send_keys(password)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    b.click()

def login(driver, username, password):
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'Login\')] | //*[contains(text(), \'Войти\')] | '
        '//*[contains(text(), \'Acceder\')]')))
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
    clickOk(driver, 'q-dialog-plugin')

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

def clickLibrary(driver, category1, category2, name):
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
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'login')))
    return b.text

def writeText(driver, text):
    c = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
    c.send_keys(text)

def insertCode(driver):
    c = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'insert-calculator-button')))
    c.click()

def clickIdentifier(driver, category):
    arr = category.split('/')
    for i in range(len(arr)):
        b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[@id=\'identifiers-tree\']//*[contains(text(), \'' + arr[i] + '\')]')))
        time.sleep(1)
        b.click()

def getDocumentName(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'document-name')))
    return b.text

def setLanguage(driver, language):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'language')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + language + '\')]')))
    b.click()

def getLanguage(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'language')))
    return b.text

def clickOk(driver, id):
    wait = WebDriverWait(driver, 2)
    try:
        ok_xpath = (
            "//div[@id='" + id + "']"
            "//button"
            "[contains(., 'OK') or contains(., 'Применить') or contains(., 'Aceptar') or @aria-label='OK']"
        )    
        ok_button = wait.until(EC.element_to_be_clickable((By.XPATH, ok_xpath)))
        ok_button.click()
    except:
        ok_xpath = (
            "//div[contains(@class, '" + id + "')]"
            "//button"
            "["
            "  contains(., 'OK') or "
            "  contains(., 'Aceptar') or "
            "  .//span[contains(., 'OK') or contains(., 'Aceptar')] "
            "]"
            "[not(@disabled)]"
        )        
        ok_button = wait.until(EC.element_to_be_clickable((By.XPATH, ok_xpath)))
        ok_button.click()

def setSettingsLanguage(driver, language):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'settings-button')))
    b.click()
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='tab-document']")))
    b.click()
    time.sleep(1)

    wait = WebDriverWait(driver, 2)
    language_select = wait.until(EC.element_to_be_clickable((By.ID, "config-language")))
    language_select.click()
    time.sleep(2)

    menu_option_xpath = (
        "//div[contains(@class, 'q-menu')]//div[contains(@class, 'q-item')]"
        f"[contains(normalize-space(.), '{language}')]"
    )

    option = wait.until(EC.element_to_be_clickable((By.XPATH, menu_option_xpath)))
    option.click()
    time.sleep(1)
    clickOk(driver, 'config-dialog')

def saveDialogClick(driver, button):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + button + '\')]')))
    b.click()

def getDbConnection():
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME", "yutovo")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    return psycopg2.connect(dbname = db_name, host = db_host, user = db_user, password = db_password, port = db_port)

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

def fileNotContains(conn, document_id, str):
    cursor = conn.cursor()
    cursor.execute('select 1 from user_documents where document_id = %s and not jsonb_path_exists(document, \'$.** ? (@.type() == "string" && @ like_regex "%s")\')', 
        (document_id, AsIs(str)))
    return cursor.fetchone() is not None

def documentContains(driver, str):
    t = driver.execute_script('return window.getText();')
    return str in t
