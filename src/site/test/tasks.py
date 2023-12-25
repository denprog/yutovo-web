import unittest
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ChromeOptions
import time
import utils

class TestTasks(unittest.TestCase):
    def setUp(self):
        opts = ChromeOptions()
        opts.add_argument("--window-size=1100,900")
        self.driver = webdriver.Chrome(options = opts)
        self.driver.delete_all_cookies()
        self.driver.get('http://localhost:9001')
        self.conn = utils.getDbConnection()
        utils.clearTestUser(self.conn)
        time.sleep(6)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'canvas')))
    
    def tearDown(self):
        self.driver.quit()
        self.conn.close()
    
    #Load a task and save as a document
    def test_tasks1(self):
        utils.login(self.driver, 'test1', '11')
        utils.clickTask(self.driver, 'Physics', 'Dynamics', 'Momentum of force')
        time.sleep(2)
        self.assertTrue(utils.documentContains(self.driver, 'Newton'))
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/task/en%5CPhysics%5CDynamics%5CMomentum%20of%20force')
        self.assertTrue(utils.getDocumentName(self.driver) == '/Physics/Dynamics/Momentum of force')
        utils.save(self.driver)
        time.sleep(2)
        utils.clickCategory(self.driver, 'Physics')
        time.sleep(1)
        utils.clickDocument(self.driver, 'Momentum of force')
        time.sleep(2)
        c1 = self.driver.get_cookie('document_id')
        self.assertTrue(self.driver.current_url == 'http://localhost:9001/document/' + c1['value'])
        self.assertTrue(utils.documentContains(self.driver, 'Newton'))

if __name__ == '__main__':
    unittest.main()
