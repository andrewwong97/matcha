import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/local/',  # end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-local.json'),
    }
}
