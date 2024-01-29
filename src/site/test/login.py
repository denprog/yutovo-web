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

if __name__ == '__main__':
    unittest.main()
