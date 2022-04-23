const PostModel = require('../models/post-model')
const ApiError = require('../exceptions/api-error')

class PostService {
  async addPost (name, title) {
    const post = await PostModel.findOne({name})
    if (post) {
      throw ApiError.BadRequest(`Пост ${name} уже создан`)
    }
    const postData = await PostModel.create({name, title})
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
