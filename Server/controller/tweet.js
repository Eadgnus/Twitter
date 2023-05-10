import { getSocketIO } from '../connection/socket.js';
import * as tweetRepository from '../data/tweet.js';
// import { chat } from './socket.js'

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
export async function getTweetsById(req, res, next) {
    // router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const tweet = tweetRepository.getTweetsById(id)
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
};

// POST
// id: Date.now().toString()
export async function postTweets(req, res, next) {
    // router.post('/', (req, res, next) => {
    const { text } = req.body;
    const tweet = await tweetRepository.create(text, req.userId);
    getSocketIO().emit('tweets', tweet);
    res.status(201).json(tweet);
}
// // PUT
// // text만 수정
// export async function putTweets(req, res, next){
//         const id = req.params.id;
//         const text = req.body.text;
//         const tweet = await tweetRepository.update(id, text);
//         if (tweet) {
//             res.status(200).json(tweet);
//         } else {
//             res.status(400).json({message: `tweet id(${id}) is not found`});
//         }
//     }

// // DELETE
// export async function deleteTweets(req, res, next){
//         const id = req.params.id;
//         await tweetRepository.remove(id);
//         res.sendStatus(204);
//     };



// PUT
// text만 수정
export async function putTweets(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.getTweetsById(id);

    if (!tweet) {
        return res.status(404).json({ message: `tweet id(${id}) is not found` });
    }

    if (tweet.userId !== req.userId) {
        return res.status(403).json({ message: 'You are not authorized to update this tweet' });
    }

    const updatedTweet = await tweetRepository.update(id, text);
    res.status(200).json(updatedTweet);
}

// DELETE
export async function deleteTweets(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getTweetsById(id); // 객체를 알아냄

    if (!tweet) {
        return res.status(404).json({ message: `tweet id(${id}) is not found` });
    }

    if (tweet.userId !== req.userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this tweet' });
    }

    await tweetRepository.remove(id);
    res.sendStatus(204);
};





