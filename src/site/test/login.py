import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
import time
import utils

address = 'https://yutovo.ru'

class TestLogin(unittest.TestCase):
    def setUp(self):
        opts = ChromeOptions()
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        self.driver = webdriver.Chrome(options = opts)
        self.driver.get(address)
        self.conn = utils.getDbConnection()
        utils.clearTestUser(self.conn)
        time.sleep(6)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))

    def tearDown(self):
        self.driver.quit()

    #login and logout
    def test_login1(self):
        time.sleep(1)
        utils.login(self.driver, 'test1', '11')
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'login_caption')))
        self.assertTrue(c.text == 'test1')
        utils.logout(self.driver)
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(c1 == None)
        c = self.driver.find_elements(By.ID, 'login_caption')
        self.assertTrue(len(c) == 0)

    #login and logout two users
    def test_login2(self):
        time.sleep(1)

        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(1)
        c.send_keys('document_test_1')
        time.sleep(1)
        utils.save(self.driver)
        utils.logout(self.driver)
        time.sleep(1)

        utils.login(self.driver, 'test2', '22')
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(1)
        c.send_keys('document_test_2')
        time.sleep(1)
        utils.save(self.driver)
        utils.logout(self.driver)
        time.sleep(1)

        utils.login(self.driver, 'test1', '11')
        utils.clickDocument(self.driver, 'document_1')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))
        utils.logout(self.driver)

        utils.login(self.driver, 'test2', '22')
        utils.clickDocument(self.driver, 'document_1')
        time.sleep(1)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_2'))
        utils.logout(self.driver)

    #set language
    def test_login3(self):
        time.sleep(1)

        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        utils.setLanguage(self.driver, 'Русский')
        utils.logout(self.driver)
        time.sleep(1)

        utils.login(self.driver, 'test1', '11')
        time.sleep(1)
        self.assertTrue(utils.getLanguage(self.driver) == 'Русский')

        self.driver.get(address)
        time.sleep(2)
        self.assertTrue(utils.getLanguage(self.driver) == 'Русский')

if __name__ == '__main__':
    unittest.main()
