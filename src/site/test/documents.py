import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service
import time
import utils

address = 'https://yutovo.ru'

class TestDocuments(unittest.TestCase):
    def setUp(self):
        self.conn = utils.getDbConnection()
        utils.clearTestUser(self.conn)

        opts = ChromeOptions()
        opts.add_argument("--window-size=1100,900")
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        prefs = {
            'profile.content_settings.exceptions.clipboard': {'*': {'setting': 1}}
        }
        opts.add_experimental_option('prefs', prefs)

        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.delete_all_cookies()
        self.driver.get(address)
        self.driver.add_cookie({'name' : 'app_initialized', 'value' : 'true', 'path' : '/'})
        time.sleep(6)
    
    def tearDown(self):
        self.driver.quit()
        self.conn.close()
    
    #Write text, login, save the document, check the cookie
    def test_documents1(self):
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('12345')
        time.sleep(1)
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        utils.save(self.driver)
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.assertTrue(c != None)
        time.sleep(1)
        self.assertTrue(utils.fileContains(self.conn, c['value'], "12345"))
        self.assertTrue(self.driver.current_url == address + '/document/' + c['value'])
        time.sleep(1)

    #Check cookie after login
    def test_documents2(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        c = self.driver.get_cookie('document_id')
        self.assertTrue(c != None)
    
    #Create new document
    def test_documents3(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(c1 != None)
        utils.new(self.driver)
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c2 != None)
        self.assertTrue(c2['value'] != c1['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c2['value'])
    
    #Delete a document
    def test_documents4(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        utils.new(self.driver)
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        utils.delete(self.driver)
        time.sleep(4)
        c3 = self.driver.get_cookie('document_id')
        self.assertTrue(c3['value'] != c2['value'])
        self.assertTrue(c3['value'] == c1['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c1['value'])
    
    #Open documents from the list
    def test_documents5(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        utils.clickDocument(self.driver, 'document_1')
        c1 = self.driver.get_cookie('document_id')
        utils.new(self.driver)
        time.sleep(1)
        c2 = self.driver.get_cookie('document_id')
        utils.new(self.driver)
        time.sleep(1)
        c3 = self.driver.get_cookie('document_id')
        utils.clickDocument(self.driver, 'document_3')
        time.sleep(1)
        self.assertTrue(self.driver.current_url == address + '/document/' + c3['value'])

        utils.clickDocument(self.driver, 'document_3')
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.assertTrue(c['value'] == c3['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c3['value'])

    #Save a document from the list
    def test_documents6(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')
        utils.new(self.driver)
        time.sleep(1)
        c2 = self.driver.get_cookie('document_id')
        utils.new(self.driver)
        time.sleep(1)
        c3 = self.driver.get_cookie('document_id')

        c = WebDriverWait(self.driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
        c.send_keys('12345')
        time.sleep(1)
        utils.save(self.driver)
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.assertTrue(c['value'] == c3['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c3['value'])
        self.assertTrue(utils.fileContains(self.conn, c['value'], "12345"))
        self.assertTrue(utils.fileContains(self.conn, c2['value'], "12345") == False)
        self.assertTrue(utils.fileContains(self.conn, c1['value'], "12345") == False)

    #Save a document from the list and delete it
    def test_documents7(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')
        utils.new(self.driver)
        time.sleep(1)

        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        c.send_keys('12345')
        time.sleep(1)
        utils.save(self.driver)
        time.sleep(1)
        utils.delete(self.driver)
        time.sleep(2)
        self.assertTrue(self.driver.current_url == address + '/document/' + c1['value'])

    #Create documents, reload page, delete the last document
    def test_documents8(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.new(self.driver)
        time.sleep(1)
        utils.new(self.driver)
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.driver.get(address)
        time.sleep(2)
        self.assertTrue(self.driver.current_url == address + '/document/' + c1['value'])

        utils.delete(self.driver)
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c1['value'] != c2['value'])
        self.assertTrue(self.driver.current_url != address + '/document/' + c1['value'])

    #Check input text
    def test_documents9(self):
        c = WebDriverWait(self.driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('12345')
        time.sleep(1)
        t = self.driver.execute_script('return window.getText();')
        self.assertTrue(t == '12345')

    #Open a document by url at start
    def test_documents10(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(5)
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.driver.quit()
        time.sleep(1)

        opts = ChromeOptions()
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.get(address)
        self.driver.get(address + '/document/' + c['value'])
        time.sleep(4)
        self.assertTrue(utils.documentContains(self.driver, '12345'))

    #Open the last document at start
    def test_documents11(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.writeText(self.driver, '12345')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, '12345'))
        utils.save(self.driver)
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.driver.quit()

        opts = ChromeOptions()
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.get(address)
        time.sleep(1)
        self.driver.add_cookie(c1)
        self.driver.refresh()
        time.sleep(1)
        self.driver.get(address)
        time.sleep(4)
        self.assertTrue(self.driver.current_url == address + '/document/' + c1['value'])
        self.assertTrue(utils.documentContains(self.driver, '12345'))

    #Save a document with another name
    def test_documents12(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')

        utils.saveAs(self.driver, 'new_name')
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c1['value'] != c2['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c2['value'])
        self.assertTrue(utils.documentContains(self.driver, '12345'))

    #Rename a document
    def test_documents13(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(6)
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')

        utils.rename(self.driver, 'new_name')
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c1['value'] == c2['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c2['value'])
        self.assertTrue(utils.documentContains(self.driver, '12345'))

    #Change language and add a variable
    def test_documents14(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.writeText(self.driver, '12345')
        utils.insertCode(self.driver)
        time.sleep(1)
        utils.setLanguage(self.driver, 'English')
        time.sleep(1)
        utils.clickIdentifier(self.driver, 'Functions/arccos')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'arccos'))
        utils.clickIdentifier(self.driver, 'Functions')
        time.sleep(1)

        utils.setSettingsLanguage(self.driver, 'Русский')
        time.sleep(1)
        utils.setLanguage(self.driver, 'Русский')
        time.sleep(1)
        utils.clickIdentifier(self.driver, 'Размерности/СИ/время/с (секунда)')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'с'))

    #Check document not found
    def test_documents15(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        self.driver.get(address + '/document/99999')
        time.sleep(4)
        alert = self.driver.switch_to.alert
        self.assertTrue(alert.text, 'Document not found')
        alert.accept()

    #Save a document of another user as an own one
    def test_documents16(self):
        time.sleep(1)
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('document_test_1')
        time.sleep(1)
        utils.save(self.driver)
        utils.logout(self.driver)
        time.sleep(1)

        utils.login(self.driver, 'test2', '22')
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(1)
        utils.saveAs(self.driver, 'new_document')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))
        utils.clickDocument(self.driver, 'new_document')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))
        
    #Change language and add a variable
    def test_documents17(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.setLanguage(self.driver, 'Русский')
        utils.insertCode(self.driver)
        utils.writeText(self.driver, '1.23')
        utils.writeText(self.driver, '+')
        utils.writeText(self.driver, '3.5')
        utils.writeText(self.driver, '=')
        time.sleep(3)
        self.assertTrue(utils.documentContains(self.driver, '4.73'))

    #Add documents and remove them one by one
    def test_documents18(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)

        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('document_test_1')
        utils.save(self.driver)
        time.sleep(1)

        utils.new(self.driver)
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('document_test_2')
        utils.save(self.driver)
        time.sleep(1)

        utils.new(self.driver)
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('document_test_3')
        utils.save(self.driver)
        time.sleep(1)

        utils.delete(self.driver)
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_2'))
        utils.delete(self.driver)
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))

    #Copy-paste test
    def test_documents19(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)

        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('document_test_1')

        for i in range(6):
            ActionChains(self.driver).key_down(Keys.SHIFT).key_down(Keys.LEFT).perform()
        time.sleep(1)
        utils.copy(self.driver)
        time.sleep(1)
        ActionChains(self.driver).reset_actions()
        ActionChains(self.driver).key_down(Keys.RIGHT).perform()
        time.sleep(1)
        utils.paste(self.driver)
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1test_1'))

    #Cut-paste test
    def test_documents20(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)

        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('document_test_1')

        for i in range(6):
            ActionChains(self.driver).key_down(Keys.SHIFT).key_down(Keys.LEFT).perform()
        time.sleep(1)
        utils.cut(self.driver)
        time.sleep(1)
        ActionChains(self.driver).reset_actions()
        ActionChains(self.driver).key_down(Keys.HOME).perform()
        time.sleep(1)
        utils.paste(self.driver)
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'test_1document_'))

    #Open a document by url at start, save it and check it
    def test_documents21(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(5)
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        r = self.driver.get_cookie('refresh_token')
        self.driver.quit()

        opts = ChromeOptions()
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        time.sleep(1)
        self.driver.get(address)
        self.driver.get(address + '/document/' + c['value'])
        self.driver.add_cookie(r)
        self.driver.refresh()
        time.sleep(4)
        self.assertTrue(utils.documentContains(self.driver, '12345'))

        utils.writeText(self.driver, '555')
        utils.save(self.driver)
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.driver.quit()
        opts = ChromeOptions()
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.get(address)
        self.driver.get(address + '/document/' + c['value'])
        time.sleep(4)
        self.assertTrue(utils.documentContains(self.driver, '12345555'))

    #Create documents and save them
    def test_documents22(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)

        utils.new(self.driver)
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')
        c = WebDriverWait(self.driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
        c.send_keys('12345')
        time.sleep(1)
        utils.save(self.driver)
        time.sleep(1)

        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c1['value'] == c2['value'])
        self.assertTrue(self.driver.current_url == address + '/document/' + c2['value'])
        self.assertTrue(utils.fileContains(self.conn, c2['value'], "12345"))

    #Check the save dialog
    def test_documents23(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)

        utils.setLanguage(self.driver, 'English')
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')
        c.send_keys('document_test_1')
        time.sleep(1)
        utils.new(self.driver)
        time.sleep(1)
        utils.saveDialogClick(self.driver, 'Yes')
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.driver.get(address + '/document/' + c1['value'])
        time.sleep(2)
        self.assertTrue(utils.fileContains(self.conn, c1['value'], "document_test_1"))

        self.driver.get(address + '/document/' + c2['value'])
        time.sleep(4)
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        c.send_keys('document_test_2')
        time.sleep(1)
        utils.new(self.driver)
        time.sleep(1)
        utils.saveDialogClick(self.driver, 'No')
        self.driver.get(address + '/document/' + c2['value'])
        time.sleep(2)
        self.assertTrue(utils.fileNotContains(self.conn, c2['value'], "document_test_2"))

if __name__ == '__main__':
    unittest.main()
