const postService = require('../service/post-service')
const ApiError = require('../exceptions/api-error')

class PostController {
  async add(req, res, next) {
    try {
      const {title, description, folder, show, showAll} = req.body;
      const {refreshToken} = req.cookies;
      const postData = await postService.addPost(refreshToken, title, description, folder, show, showAll);
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
      const {_id, title, description, folder, show, showAll} = req.body;
      const postData = await postService.setPost(_id, title, description, folder, show, showAll);
      return res.json(postData)
    } catch (e) {
      next(e)
    }
  }

  async edit(req, res, next) {
    try {
      const {_id} = req.body;
      const postData = await postService.editPost(_id);
      return res.json(postData)
    } catch (e) {
      next(e)
    }
  }

  async getPosts(req, res, next) {
    try {
      const {folder} = req.body;
      const posts = await postService.getPosts(folder);
      return res.json(posts)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PostController();
