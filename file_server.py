from flask import Flask, request
from flask_cors import cross_origin

app = Flask(__name__, static_url_path='')


@app.route('/sound.mp3')
@cross_origin()
def root():
    """ Serve the static index.html """
    return app.send_static_file('gun.mp3')


@app.route('/status', methods=['GET', 'POST'])
def status():
    """ AP for the android application """

    if request.method == 'GET':
        print('GET')
        return "You really got me there!"

    if request.method == 'POST':
        print('POST')
        print(request.data)
        return "Hello Chris good to see you alive!"



if __name__ == '__main__':
    app.run()
