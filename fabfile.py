from fabric.api import local


def webpack():
    """
    Clears the /static/bundles folders and re-creates the bundles.

    This should be run every time we made changes to ReactJS before we commit
    and push our code.

    """
    local('rm -rf matcha/static/bundles/local/*')
    local('webpack --config webpack.local.config.js --progress --colors')