import * as tweetRepository from '../data/tweet.js';

//get
export async function getTweets(req, res) {
    // router.get('/', (req, res, next) => {
        const username = req.query.username;
        const data = await (username
            ? tweetRepository.getAllbyUsername(username)
            : tweetRepository.getAll());
    
            res.status(200).json(data);
    }

// GET
// /tweets/id=:id
export async function getTweetsById(req, res, next){
    // router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetRepository.getTweetsById(id)
        if  (tweet) {
            res.status(200).json(tweet);
        }else{
            res.status(404).json({ message: `Tweet id(${id}) not found` });
        }
    };

// POST
// id: Date.now().toString()
export async function postTweets(req, res, next){
    // router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = await tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
}
// const tweet = {
//     id: Date.now().toString(),
//     text,
//     createdAT: new Date(),
//     name,
//     username
// };

// PUT
// text만 수정
export async function putTweets(req, res, next){
        const id = req.params.id;
        const text = req.body.text;
        const tweet = await tweetRepository.update(id, text);
        if (tweet) {
            res.status(200).json(tweet);
        } else {
            res.status(400).json({message: `tweet id(${id}) is not found`});
        }
    }

// DELETE
export async function deleteTweets(req, res, next){
        const id = req.params.id;
        await tweetRepository.remove(id);
        res.sendStatus(204);
    };








