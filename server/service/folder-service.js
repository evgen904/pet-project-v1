const FolderModel = require('../models/folder-model')
const ApiError = require('../exceptions/api-error')
const tokenService = require('./token-service.js')

class FolderService {
  async addFolder (refreshToken, name, title) {
    const folder = await FolderModel.findOne({title})
    if (folder) {
      throw ApiError.BadRequest(`Категория "${title}" уже создана`)
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const folderData = await FolderModel.create({user: userData.id, name, title})
    return { folderData }
  }

  async setFolder(name, title) {
    const folder = await FolderModel.findOne({name})
    if (!folder) {
      throw ApiError.BadRequest(`Категории ${name} нет в списке`)
    }
    const folderData = await folder.updateOne({name, title})
    return { folderData }
  }

  async removeFolder(name) {
    const folder = await FolderModel.findOne({name})
    if (!folder) {
      throw ApiError.BadRequest(`Категории ${name} нет в списке`)
    }
    const folderData = await FolderModel.deleteOne({name});
    return folderData;
  }

  async getFolders() {
    const folder = FolderModel.find();
    return folder;
  }
}

module.exports = new FolderService()
