import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time
import utils

class TestRegister(unittest.TestCase):
    def setUp(self):
        self.conn = utils.getDbConnection()
        utils.deleteTestUser(self.conn)
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:9001')
        self.conn = utils.getDbConnection()

    def tearDown(self):
        self.driver.quit()
        self.conn.close()

    def test_register1(self):
        time.sleep(1)
        utils.registerUser(self.driver, 'test1', '11', 'test1@mail.ru')
        time.sleep(1)
        self.assertTrue(utils.loginCaption(self.driver) == 'test1')

if __name__ == '__main__':
    unittest.main()
