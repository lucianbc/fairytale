import tensorflow as tf
import flask
import ml_service.src.models as model_defs

tf.enable_eager_execution()

model_classes = [
    model_defs.CharlesKingsley
]

models = dict()

app = flask.Flask(__name__)


def init():
    print("Initializing models")
    for c in model_classes:
        model = c()
        models[model.id] = model
        print("Instantiated model {}".format(model.name))
    print("All models initialized")


@app.route('/predict', methods=['POST'])
def predict():
    content = flask.request.json
    text = content['text']
    model_id = content['model']
    nr_sentences = content['sentences']
    model = models[model_id]
    result = model.generate_text(text, nr_sentences)
    return flask.jsonify({
        'result': result
    })


@app.route('/models', methods=['GET'])
def get_models():
    return flask.jsonify([m_info(m) for m in models.values()])


def m_info(model):
    return {
        'name': model.name,
        'id': model.id
    }


if __name__ == '__main__':
    init()
    print("Starting Flask server")
    app.run(threaded=True)
