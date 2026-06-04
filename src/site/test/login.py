import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver import ActionChains
import time
import utils

address = 'https://www.yutovo.ru'

class TestLogin(unittest.TestCase):
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
        self.driver.add_cookie({'name' : 'app_initialized', 'value' : 'true', 'path' : '/'})
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
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'login')))
        self.assertTrue(c.text == 'test1')
        utils.logout(self.driver)
        time.sleep(1)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(c1 == None)
        c = self.driver.find_elements(By.ID, 'login')
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
        time.sleep(3)
        utils.logout(self.driver)
        WebDriverWait(self.driver, 10).until(EC.invisibility_of_element_located((By.ID, "logout")))        
        time.sleep(1)

        utils.login(self.driver, 'test2', '11')
        c = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(1)
        c.send_keys('document_test_2')
        time.sleep(2)
        utils.setLanguage(self.driver, 'English')
        time.sleep(2)
        ActionChains(self.driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(1)
        utils.save(self.driver)
        time.sleep(2)
        utils.logout(self.driver)
        time.sleep(1)

        utils.login(self.driver, 'test1', '11')
        time.sleep(3)
        utils.clickDocument(self.driver, 'document_1')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'document_test_1'))
        utils.logout(self.driver)

        utils.login(self.driver, 'test2', '11')
        time.sleep(3)
        utils.clickDocument(self.driver, 'document_1')
        time.sleep(2)
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
        time.sleep(4)
        self.assertTrue(utils.getLanguage(self.driver) == 'Русский')

if __name__ == '__main__':
    unittest.main()
