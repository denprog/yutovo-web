import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
import time
import utils

address = 'https://yutovo.ru'

class TestLibrary(unittest.TestCase):
    def setUp(self):
        opts = ChromeOptions()
        opts.add_argument("--window-size=1100,900")
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        self.driver = webdriver.Chrome(options = opts)
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
        utils.clickLibrary(self.driver, 'Physics', 'Dynamics', 'Moment of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Data'))
        self.assertTrue(self.driver.current_url == address + '/library/en%5CPhysics%5CDynamics%5CMoment%20of%20force')
        self.assertTrue(utils.getDocumentName(self.driver) == '/Physics/Dynamics/Moment of force')
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
        c.send_keys('document_test_1')
        time.sleep(1)
        utils.save(self.driver)

        utils.clickLibrary(self.driver, 'Physics', 'Dynamics', 'Moment of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Data'))

        utils.clickDocument(self.driver, 'document_1')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))

        utils.clickCategory(self.driver, 'Moment of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Data'))

if __name__ == '__main__':
    unittest.main()
