from flask import Flask
from flask_restful import Api, Resource, request
from wordsearch.wordsearch_generator import WordSearchGenerator
from flask_cors import CORS
import subprocess 

app = Flask(__name__)
api = Api(app)
CORS(app)

ws_gen = WordSearchGenerator()


class WordsearchApi(Resource):
    def get(self):
        category = request.args.get("category", type=str)
        dim = request.args.get("dim", type=int)
        min_word_length = request.args.get("min_word_length", type=int)
        max_word_length = request.args.get("max_word_length", type=int)
        ws_gen.make_wordsearch(category, dim, min_word_length, max_word_length)

        return (
            {
                "grid": ws_gen.grid,
                "wordConfigurationData": [
                    {"word": d.word2, "positions": d.positions} for d in ws_gen.ws_data
                ],
            },
            {r"/*": {"origins": "*"}},
        )


class WordsearchCategories(Resource):
    def get(self):
        return sorted(list(ws_gen.word_list.keys()))


api.add_resource(WordsearchApi, "/")
api.add_resource(WordsearchCategories, "/categories")

if __name__ == "__main__":
    app.run(debug=True)
