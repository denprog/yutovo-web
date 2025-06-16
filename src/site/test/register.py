import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
from selenium.webdriver.chrome.service import Service
import time
import utils

address = 'https://yutovo.ru'

class TestRegister(unittest.TestCase):
    def setUp(self):
        self.conn = utils.getDbConnection()
        utils.deleteTestUser(self.conn)
        opts = ChromeOptions()
        opts.add_argument("--ignore-certificate-errors")
        opts.add_argument("--disable-web-security")
        service = Service(executable_path='/opt/selenium/chromedriver')
        self.driver = webdriver.Chrome(service = service, options = opts)
        self.driver.get(address)
        self.conn = utils.getDbConnection()

    def tearDown(self):
        self.driver.quit()
        self.conn.close()

    def test_register1(self):
        time.sleep(2)
        utils.registerUser(self.driver, 'test1', '11', 'test1@mail.ru')
        time.sleep(4)
        self.assertTrue(utils.loginCaption(self.driver) == 'test1')

if __name__ == '__main__':
    unittest.main()
