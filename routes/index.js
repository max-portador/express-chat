var express = require('express');
var router = express.Router();
const {Configuration, OpenAIApi} = require("openai");

const dotenv = require('dotenv')

dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function chatWithGPT4(prompt) {
    try {

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo-16k-0613",
            messages: [{role: "user", content: prompt}],
        });
        return response.data.choices[0].message;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            return JSON.stringify(error.response.data)
        } else {
            return JSON.stringify(error.message)
        }
    }

}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({title: 'pong'});
});

router.post('/', async function (req, res, next) {
    const {text} = req.body
    if (text) {
        const message = await chatWithGPT4(text)
        res.send({message, empty: false});
    } else {
        res.send({empty: true})
    }
});


module.exports = router;
