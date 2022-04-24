const postService = require('../service/post-service')
const ApiError = require('../exceptions/api-error')

class PostController {
  async add(req, res, next) {
    try {
      const {title, description, folder} = req.body;
      const {refreshToken} = req.cookies;
      const postData = await postService.addPost(refreshToken, title, description, folder);
      return res.json(postData)
    } catch (e) {
      next(e)
    }
  }

  async remove(req, res, next) {
    try {
      const {name} = req.body;
      const postData = await postService.removePost(name)
      return res.json(postData)
    } catch (e) {
      next(e)
    }
  }

  async set(req, res, next) {
    try {
      const {name, title} = req.body;
      const postData = await postService.setPost(name, title);
      return res.json(postData)
    } catch (e) {
      next(e)
    }
  }

  async getPosts(req, res, next) {
    try {
      const posts = await postService.getPosts();
      return res.json(posts)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PostController();
