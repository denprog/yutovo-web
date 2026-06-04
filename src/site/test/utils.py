import os
import psycopg2
import hashlib
from psycopg2.extensions import AsIs
import secrets
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import time

def registerUser(driver, username, password, email):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'register')))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'login\']')))
    e.send_keys(username)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'email\']')))
    e.send_keys(email)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'password\']')))
    e.send_keys(password)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@aria-label=\'repeate password\']')))
    e.send_keys(password)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    driver.execute_script("arguments[0].click();", b)

def login(driver, username, password):
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'Login\')] | //*[contains(text(), \'Войти\')] | '
        '//*[contains(text(), \'Acceder\')]')))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[contains(@class, \'login-username\')]')))
    e.send_keys(username)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[contains(@class, \'login-password\')]')))
    e.send_keys(password)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    driver.execute_script("arguments[0].click();", b)

def logout(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, "logout")))
    driver.execute_script("arguments[0].scrollIntoView(true);", b)
    #use JS click to bypass any transient overlay (e.g., dialog transition backdrops)
    driver.execute_script("arguments[0].click();", b)
    #wait a moment for logout to process, then clear session cookies so the next
    #login gets a fresh session (prevents cross-user document_id contamination).
    time.sleep(1)
    driver.delete_cookie('session_id')
    driver.delete_cookie('JSESSIONID')
    driver.delete_cookie('document_id')

def new(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'new-button')))
    driver.execute_script("arguments[0].click();", b)

def save(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'save-button')))
    driver.execute_script("arguments[0].click();", b)

def saveAs(driver, filename):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'save-as-button')))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    e = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//input[@type=\'filename\']')))
    e.send_keys(filename)
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'submit')))
    driver.execute_script("arguments[0].click();", b)

def rename(driver, filename):
    WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.ID, "rename-button"))).click()
    dialog = WebDriverWait(driver, 2).until(EC.visibility_of_element_located((By.CSS_SELECTOR, ".q-dialog")))
    e = WebDriverWait(dialog, 2).until(EC.visibility_of_element_located((By.CSS_SELECTOR, "input[type='text']")))
    e.clear()
    e.send_keys(filename)
    WebDriverWait(dialog, 2).until(EC.element_to_be_clickable((By.ID, "submit"))).click()
    
def delete(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'delete-button')))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    clickOk(driver, 'q-dialog-plugin')

def copy(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'copy-button')))
    driver.execute_script("arguments[0].click();", b)

def paste(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'paste-button')))
    driver.execute_script("arguments[0].click();", b)

def cut(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'cut-button')))
    driver.execute_script("arguments[0].click();", b)

def clickCategory(driver, name):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + name + '\')]')))
    driver.execute_script("arguments[0].click();", b)

def clickLibrary(driver, category1, category2, name):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '" + category1 + "')]")))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '" + category2 + "')]")))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '" + name + "')]")))
    driver.execute_script("arguments[0].click();", b)

def clickDocument(driver, text):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), '" + text + "')]")))
    driver.execute_script("arguments[0].click();", b)

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
        driver.execute_script("arguments[0].click();", b)

def getDocumentName(driver):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'document-name')))
    return b.text

def setLanguage(driver, language):
    b = WebDriverWait(driver, 2).until(EC.presence_of_element_located((By.ID, 'language')))
    driver.execute_script("arguments[0].click();", b)
    time.sleep(2)
    b = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, '//*[contains(text(), \'' + language + '\')]')))
    driver.execute_script("arguments[0].click();", b)

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
    driver.execute_script("arguments[0].click();", b)
    time.sleep(1)
    b = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='tab-document']")))
    driver.execute_script("arguments[0].click();", b)
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
    xpath = f"//div[@role='dialog']//button[contains(., '{button}')]"
    b = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, xpath)))
    driver.execute_script("arguments[0].click();", b)

def closeDialogIfPresent(driver, button, timeout=2):
    try:
        xpath = f"//div[@role='dialog']//button[contains(., '{button}')]"
        b = WebDriverWait(driver, timeout).until(EC.element_to_be_clickable((By.XPATH, xpath)))
        driver.execute_script("arguments[0].click();", b)
        return True
    except:
        return False

def getDbConnection():
    db_host = os.getenv("DB_HOST")
    db_port = os.getenv("DB_PORT")
    db_name = os.getenv("DB_NAME", "yutovo")
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    return psycopg2.connect(dbname = db_name, host = db_host, user = db_user, password = db_password, port = db_port)

def deleteTestUser(conn):
    cursor = conn.cursor()
    for login in ['test1', 'test2']:
        cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=%s)', (login,))
        cursor.execute('delete from user_documents where user_id in (select user_id from users where login=%s)', (login,))
        cursor.execute('delete from users where login=%s', (login,))
    conn.commit()

def _hash_password(password):
    salt = secrets.token_hex(16)
    h = hashlib.md5((password + salt).encode()).hexdigest()
    return salt + h

def clearTestUser(conn):
    cursor = conn.cursor()
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test1\')')
    cursor.execute('delete from user_sessions where user_id in (select user_id from users where login=\'test2\')')
    cursor.execute('delete from user_documents where user_id in (select user_id from users where login=\'test2\')')
    cursor.execute('update users set language=\'\' where login=\'test1\'')
    cursor.execute('update users set language=\'\' where login=\'test2\'')
    for login, email, name, pwd in [
        ('test1', 'test1@mail.ru', 'test1', '11'),
        ('test2', 'test2@mail.ru', 'test2', '11')
    ]:
        cursor.execute('''
            INSERT INTO users (login, password, email, name, plan_id)
            SELECT %s, %s, %s, %s, 1
            WHERE NOT EXISTS (SELECT 1 FROM users WHERE login=%s)
        ''', (login, _hash_password(pwd), email, name, login))
        #always reset password so existing users match expected credentials
        cursor.execute('UPDATE users SET password=%s WHERE login=%s', (_hash_password(pwd), login))
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
