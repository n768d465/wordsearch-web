from flask import Flask
from flask_restful import Api, Resource, request
from wordsearch.wordsearch_generator import WordSearchGenerator
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

ws_gen = WordSearchGenerator("Animals")


class WordsearchApi(Resource):
    def get(self):
        ws_gen.dim = request.args.get("dim", type=int)
        ws_gen.min_word_length = request.args.get("min_word_length", type=int)
        ws_gen.max_word_length = request.args.get("max_word_length", type=int)
        ws_gen.category = request.args.get("category", type=str)
        ws_gen.make_wordsearch()

        return (
            {
                "grid": ws_gen.grid,
                "wordBank": list(ws_gen.bank),
                "gridWordsOnly": ws_gen.grid_words_only,
                "wordConfigurationData": ws_gen.ws_data,
            },
            {r"/*": {"origins": "*"}},
        )


class WordsearchCategories(Resource):
    def get(self):
        return sorted(list(ws_gen.sample_placeable_word.word_list.keys()))


api.add_resource(WordsearchApi, "/")
api.add_resource(WordsearchCategories, "/categories")

if __name__ == "__main__":
    app.run(debug=True)
