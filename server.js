const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//pulling dummy data from local json files
const fs = require('fs');
const path = require('path');
const COMMENTS_FILE  = path.join(__dirname, 'comments.json');
const ARTICLES_FILE  = path.join(__dirname, 'articles.json');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    // Set permissive CORS header 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Get All The Comments
app.get('/blog-api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      	res.send(err);
    }
    res.json(JSON.parse(data));
  });
});

//Create A Comment
app.post('/blog-api/comments', function(req, res) {
	fs.readFile(COMMENTS_FILE, function(err, data) {
		if (err) {
			res.send(err);
		}

		let comments = JSON.parse(data);

		const newComment = {
			id: Date.now(),
			postId: req.body.postId,
			author: req.body.author,
			content: req.body.content,
			dateCreated: Date.now(),
		}

		comments.push(newComment);

		//update db (in this case local files)
		fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
			if (err) {
				res.send(err);
			}
			res.json(comments);
		})
	});
})

//Update A Comment
app.put('/blog-api/comments/:comment_id', function(req, res) {
	fs.readFile(COMMENTS_FILE, function(err, data) {
		if (err) {
			res.send(err);
		}

		let comments = JSON.parse(data);
		const currCommentId = req.params.comment_id;
		const commentIndex = comments.findIndex(comment => comment.id == currCommentId);

		comments[commentIndex].author = req.body.author;
		comments[commentIndex].content = req.body.content;

		//update db (in this case local files)
		fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
			if (err) {
				console.log(err);
				process.exit(1);
			}
			res.json(comments);
		})
	});
})

//Delete A Comment
app.delete('/blog-api/comments/:comment_id', function(req, res) {
	fs.readFile(COMMENTS_FILE, function(err, data) {
		if (err) {
			res.send(err);
		}

		const comments = JSON.parse(data);
		const currCommentId = req.params.comment_id;
		const commentIndex = comments.findIndex(comment => comment.id == currCommentId);
		const updatedComments = [...comments.slice(0, commentIndex), ...comments.slice(commentIndex + 1)]

		//update db (in this case local files)
		fs.writeFile(COMMENTS_FILE, JSON.stringify(updatedComments, null, 4), function(err) {
			if (err) {
				console.log(err);
				process.exit(1);
			}
			res.json(updatedComments);
		})
	});
})

//Get All The Articles
app.get('/blog-api/articles', function(req, res) {
  fs.readFile(ARTICLES_FILE, function(err, data) {
    if (err) {
      	res.send(err);
    }
    res.json(JSON.parse(data));
  });
});

app.listen(3000);
console.log('Listening on port 3000...');




