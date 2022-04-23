const folderService = require('../service/folder-service')
const ApiError = require('../exceptions/api-error')

class FolderController {
  async add(req, res) {
    try {
      const {name, title} = req.body;
      const folderData = await folderService.addFolder(name, title);
      return res.json(folderData)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Add folder error'})
    }
  }

  async remove(req, res) {
    try {
      const {name} = req.body;
      const folderData = await folderService.removeFolder(name)
      return res.json(folderData)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Remove folder error'})
    }
  }

  async set(req, res) {
    try {
      const {name, title} = req.body;
      const folderData = await folderService.setFolder(name, title);
      return res.json(folderData)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'Set folder error'})
    }
  }

  async getFolders(req, res) {
    try {
      const folders = await folderService.getFolders();
      return res.json(folders)
    } catch (e) {
      console.log(e)
      res.status(400).json({message: 'GetFolders folder error'})
    }
  }
}

module.exports = new FolderController();
