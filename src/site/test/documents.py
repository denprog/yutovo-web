import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
import time
import utils

class TestDocuments(unittest.TestCase):
    def setUp(self):
        opts = ChromeOptions()
        opts.add_argument("--window-size=1100,900")
        self.driver = webdriver.Chrome(options = opts)
        self.driver.get('http://localhost:9001')
        self.conn = utils.getDbConnection()
        utils.clearTestUser(self.conn, self.driver)
        time.sleep(6)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
    
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
        self.assertTrue(utils.fileContains(self.conn, c['value'], "12345"))
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c['value'])
        time.sleep(1)

    #Check cookie after login
    def test_documents2(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.assertTrue(c != None)
    
    #Create new document
    def test_documents3(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(c1 != None)
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c1['value'])
        utils.new(self.driver)
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c2 != None)
        self.assertTrue(c2['value'] != c1['value'])
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c2['value'])
    
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
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c1['value'])
    
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
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c3['value'])

        utils.clickDocument(self.driver, 'document_3')
        time.sleep(1)
        c = self.driver.get_cookie('document_id')
        self.assertTrue(c['value'] == c3['value'])
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c3['value'])

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
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c3['value'])
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
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c1['value'])

    #Make documents, reload page, delete the last document
    def test_documents8(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        utils.new(self.driver)
        time.sleep(1)
        utils.new(self.driver)
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.driver.get('http://localhost:9001')
        time.sleep(2)
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c1['value'])

        utils.delete(self.driver)
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c1['value'] != c2['value'])
        self.assertTrue(self.driver.current_url != 'http://localhost:9001/document/' + c1['value'])

    #Check input text
    def test_documents9(self):
        c = WebDriverWait(self.driver, 2).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        c.send_keys('12345')
        t = self.driver.execute_script('return window.getText();')
        self.assertTrue(t == '12345')

    #Open a document by url at start
    def test_documents10(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)
        time.sleep(1)
        c = self.driver.get_cookie('document_id')

        self.driver.quit()
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:9001/document/' + c['value'])
        time.sleep(2)
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
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:9001')
        self.driver.add_cookie(c1)
        self.driver.refresh()
        time.sleep(1)
        self.driver.get('http://localhost:9001/')
        time.sleep(4)
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c1['value'])
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
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c2['value'])
        self.assertTrue(utils.documentContains(self.driver, '12345'))

    #Rename a document
    def test_documents13(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')

        utils.rename(self.driver, 'new_name')
        time.sleep(2)
        c2 = self.driver.get_cookie('document_id')
        self.assertTrue(c1['value'] == c2['value'])
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c2['value'])
        self.assertTrue(utils.documentContains(self.driver, '12345'))

    #Change language and add a variable
    def test_documents14(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        utils.writeText(self.driver, '12345')
        utils.insertCode(self.driver)
        time.sleep(1)
        utils.clickIdentifier(self.driver, 'Builtin functions', 'arccos')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'arccos'))

        utils.setLanguage(self.driver, 'Русский')
        time.sleep(2)
        utils.clickIdentifier(self.driver, 'Встроенные размерности', 'сек')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'сек'))

    #Check document not found
    def test_documents15(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        self.driver.get('http://localhost:9001/document/99999')
        time.sleep(2)
        alert = self.driver.switch_to.alert
        self.assertTrue(alert.text, 'Document not found')
        alert.accept()

if __name__ == '__main__':
    unittest.main()
