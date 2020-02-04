from flask import Flask
from flask_restful import Api, Resource, request
from wordsearch.wordsearch_generator import WordSearchGenerator
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)


class WordsearchApi(Resource):
    def get(self):
        ws = WordSearchGenerator(**dict(request.args))
        ws.make_wordsearch()

        return (
            {
                "grid": ws.grid,
                "wordBank": list(ws.bank),
                "gridWordsOnly": ws.grid_words_only,
                "wordConfigurationData": ws.ws_data,
            },
            {r"/*": {"origins": "*"}},
        )


api.add_resource(WordsearchApi, "/")

if __name__ == "__main__":
    app.run(debug=True)
