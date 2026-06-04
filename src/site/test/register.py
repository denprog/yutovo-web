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

class TestRegister(unittest.TestCase):
    def setUp(self):
        self.conn = utils.getDbConnection()
        utils.deleteTestUser(self.conn)
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

    def tearDown(self):
        self.driver.quit()
        self.conn.close()

    def test_register1(self):
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
        time.sleep(2)
        utils.setLanguage(self.driver, 'English')
        time.sleep(2)
        utils.registerUser(self.driver, 'test2', '11', 'test2@mail.ru')
        time.sleep(2)
        self.assertTrue(utils.loginCaption(self.driver) == 'test2')

if __name__ == '__main__':
    unittest.main()
