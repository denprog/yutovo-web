import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
from selenium.webdriver.chrome.service import Service
import time
import utils

address = 'https://www.yutovo.ru'

class TestLibrary(unittest.TestCase):
    def setUp(self):
        opts = ChromeOptions()
        opts.add_argument("--window-size=1100,900")
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        opts.add_argument("--unsafely-treat-insecure-origin-as-secure=https://www.yutovo.ru")
        opts.add_argument("--allow-insecure-localhost")
        opts.add_argument("--enable-features=SharedArrayBuffer")
        opts.add_argument("--host-resolver-rules=\"MAP yutovo.ru 127.0.0.1, MAP www.yutovo.ru 127.0.0.1\" https://www.yutovo.ru")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.delete_all_cookies()
        self.driver.get(address)
        self.conn = utils.getDbConnection()
        utils.clearTestUser(self.conn)
        time.sleep(6)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
    
    def tearDown(self):
        self.driver.quit()
        self.conn.close()
    
    #Load a library document and save as a user document
    def test_library1(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        utils.setLanguage(self.driver, 'English')
        time.sleep(1)
        utils.clickLibrary(self.driver, 'Physics', 'Dynamics', 'Moment of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Data'))
        self.assertTrue(self.driver.current_url == address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut')
        self.assertTrue(utils.getDocumentName(self.driver) == '/Physics/Dynamics/Moment of force.yut')
        utils.save(self.driver)
        time.sleep(2)
        utils.clickCategory(self.driver, 'Physics')
        time.sleep(2)
        utils.clickDocument(self.driver, 'Moment of force')
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(self.driver.current_url == address + '/document/' + c1['value'])
        self.assertTrue(utils.documentContains(self.driver, 'Data'))

    # #Load a damaged library document
    # def test_library2(self):
    #     utils.login(self.driver, 'test1', '11')
    #     utils.clickLibrary(self.driver, 'Physics', 'Dynamics', 'damaged')
    #     time.sleep(2)
    #     alert = self.driver.switch_to.alert
    #     self.assertTrue(alert.text, 'Error loading the document')
    #     alert.accept()

    #Click on a document, then on a library document, then on a user document
    def test_library3(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(4)
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        utils.setLanguage(self.driver, 'English')
        time.sleep(1)
        c.send_keys('document_test_1')
        time.sleep(1)
        utils.save(self.driver)

        utils.clickLibrary(self.driver, 'Physics', 'Dynamics', 'Moment of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Data'))

        utils.clickDocument(self.driver, 'document_1')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))

    #Open a library document by url at start
    def test_library4(self):
        opts = ChromeOptions()
        opts.add_argument("--window-size=1100,900")
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        opts.add_argument("--unsafely-treat-insecure-origin-as-secure=https://www.yutovo.ru")
        opts.add_argument("--allow-insecure-localhost")
        opts.add_argument("--enable-features=SharedArrayBuffer")
        opts.add_argument("--host-resolver-rules=\"MAP yutovo.ru 127.0.0.1, MAP www.yutovo.ru 127.0.0.1\" https://www.yutovo.ru")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.get(address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut')
        time.sleep(4)
        self.assertTrue(self.driver.current_url == address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut')
        self.assertTrue(utils.getDocumentName(self.driver) == '/Physics/Dynamics/Moment of force.yut')

    #Load a library document, change it and save as a user document
    def test_library5(self):
        utils.login(self.driver, 'test1', '11')
        time.sleep(2)
        utils.setLanguage(self.driver, 'English')

        utils.writeText(self.driver, 'document')
        utils.save(self.driver)

        time.sleep(1)
        utils.clickLibrary(self.driver, 'Physics', 'Dynamics', 'Moment of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Data'))
        self.assertTrue(self.driver.current_url == address + '/library/en/Physics/Dynamics/Moment%20of%20force.yut')
        self.assertTrue(utils.getDocumentName(self.driver) == '/Physics/Dynamics/Moment of force.yut')
        utils.writeText(self.driver, '12345')
        utils.save(self.driver)

        utils.clickDocument(self.driver, 'document_1')

        time.sleep(2)
        utils.clickDocument(self.driver, 'Moment of force')
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(self.driver.current_url == address + '/document/' + c1['value'])
        self.assertTrue(utils.documentContains(self.driver, 'Data'))

if __name__ == '__main__':
    unittest.main()
