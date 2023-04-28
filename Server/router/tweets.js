import express from 'express';
import * as tweetController from '../controller/tweet.js';


const router = express.Router();

//GET
// / tweets?username=:username
router.get('/', tweetController.getTweets);


//이따 나머지 부분 만들어봄

// GET
// /tweets/id=:id
router.get('/:id', tweetController.getTweetsById);

// POST
// id: Date.now().toString()
router.post('/', tweetController.postTweets);

// PUT
// text만 수정
router.put('/:id', tweetController.putTweets);

// DELETE
router.delete('/:id', tweetController.deleteTweets);


export default router;