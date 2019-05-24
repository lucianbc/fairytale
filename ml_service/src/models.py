import os

import ml_service.src.helpers as helpers

script_dir = os.path.dirname(__file__)


class Horror(helpers.Model):
    def __init__(self):
        self.name = 'Horror'
        self.id = 'horror'
        enc_file = os.path.join(script_dir, '../models/Horror/vocabulary.json')
        weights_file = os.path.join(script_dir, '../models/Horror/model')
        helpers.Model.__init__(self, enc_file, weights_file)

    def info(self):
        return {
            'name': self.name,
            'id': self.id
        }


class Adventure(helpers.Model):
    def __init__(self):
        self.name = 'Adventure'
        self.id = 'adventure'
        enc_file = os.path.join(script_dir, '../models/Adventure/vocabulary.json')
        weights_file = os.path.join(script_dir, '../models/Adventure/model')
        helpers.Model.__init__(self, enc_file, weights_file)

    def info(self):
        return {
            'name': self.name,
            'id': self.id
        }


class Mystery(helpers.Model):
    def __init__(self):
        self.name = 'Mystery'
        self.id = 'mystery'
        enc_file = os.path.join(script_dir, '../models/Mystery/vocabulary.json')
        weights_file = os.path.join(script_dir, '../models/Mystery/model')
        helpers.Model.__init__(self, enc_file, weights_file)

    def info(self):
        return {
            'name': self.name,
            'id': self.id
        }
