import os

import ml_service.src.helpers as helpers

script_dir = os.path.dirname(__file__)


class CharlesKingsley(helpers.Model):
    def __init__(self):
        self.name = 'Charles Kingsley'
        self.id = 'charles_kingsley'
        enc_file = os.path.join(script_dir, '../models/Charles_Kingsley/encoding.json')
        weights_file = os.path.join(script_dir, '../models/Charles_Kingsley/model')
        helpers.Model.__init__(self, enc_file, weights_file)

    def info(self):
        return {
            'name': self.name,
            'id': self.id
        }
