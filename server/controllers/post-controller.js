const postService = require('../service/post-service')
const ApiError = require('../exceptions/api-error')

class PostController {
  async add(req, res) {
    try {
      const {name, title} = req.body;
      const postData = await postService.addPost(name, title);
      return res.json(postData)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Add post error'})
    }
  }

  async remove(req, res) {
    try {
      const {name} = req.body;
      const postData = await postService.removePost(name)
      return res.json(postData)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Remove post error'})
    }
  }

  async set(req, res) {
    try {
      const {name, title} = req.body;
      const postData = await postService.setPost(name, title);
      return res.json(postData)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Set post error'})
    }
  }

  async getPosts(req, res) {
    try {
      const posts = await postService.getPosts();
      return res.json(posts)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'GetPost post error'})
    }
  }
}

module.exports = new PostController();
