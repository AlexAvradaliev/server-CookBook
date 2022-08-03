const { isAuth } = require('../middleweare/guards');
const uploadService = require('../services/userService');
const userService = require('../services/userService');
const cloudinary = require('../config/cloudinary');
const recipe = require('../services/recipeService');

const {errorWrapper} = require('../utils/errorWrapper');

const router = require('express').Router();

const mimeType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif' ];
const isValid = (type) => !!mimeType.find(x => x == type);

router.post('/avatar', isAuth(), async(req, res, next) => {
let dataImg = req.body.data;
const userId = req.users._id;

    try {

        if(!dataImg){
            const err = {
                status: 400,
                msg: `Please import an image`,
                param: 'images'
            };
            throw errorWrapper([err]);
        } else if (isValid(dataImg)){
           
                const err = {
                    status: 400,
                    msg: `File does not support`,
                    param: 'images'
                };
                throw errorWrapper([err]);

        };

        const data = await cloudinary.v2.uploader.upload(dataImg.url, {
            folder: "Recipes/avatars",
          });
       
          const avatarId = await uploadService.getAvatarId(userId);
          if(avatarId){
            const removeImg = await cloudinary.uploader.destroy(avatarId);
            if(removeImg.result != 'ok'){
                throw new Error ('Something wrong');
            };
          };
          const userUpdate = await userService.modifyAvatar(userId, data.secure_url, data.public_id);

          res.json(userUpdate);
    
    } catch (err) {
        next(err)
    }
    
    
});

router.delete('/:recipeId',isAuth(), async(req, res) => {
  
try {
    const userId = req.users._id;
   const recipeId = req.params.recipeId;
   const image = req.body.image;

    const result = await recipe.removeImage(recipeId, image, userId);
    
      res.json(result);

} catch (err) {
    
}
   
});

module.exports = router;