const PostModel = require('../models/post-model')
const FolderModel = require('../models/folder-model')
const ApiError = require('../exceptions/api-error')
const tokenService = require('./token-service.js')

class PostService {
  async addPost (refreshToken, title, description, folder) {
    const post = await PostModel.findOne({title})
    if (post) {
      throw ApiError.BadRequest(`Пост ${title} уже создан`)
    }
    const folderName = await FolderModel.findOne({name: folder})
    if (!folderName) {
      throw ApiError.BadRequest(`Категории ${folder} нет`)
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const postData = await PostModel.create({user: userData.id, title, description, folder})
    return { postData }
  }

  async setPost(name, title) {
    const Post = await PostModel.findOne({name})
    if (!Post) {
      throw ApiError.BadRequest(`Поста ${name} нет в списке`)
    }
    const PostData = await Post.updateOne({name, title})
    return { PostData }
  }

  async removePost(name) {
    const Post = await PostModel.findOne({name})
    if (!Post) {
      throw ApiError.BadRequest(`Поста ${name} нет в списке`)
    }
    const PostData = await PostModel.deleteOne({name});
    return PostData;
  }

  async getPosts() {
    const Post = PostModel.find();
    return Post;
  }
}

module.exports = new PostService()
