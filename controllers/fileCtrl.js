const User = require('../models/user');
const Gym = require('../models/gym');
const cloudinary = require('cloudinary');

cloudinary.config({
  //cloud_name:'apprating',
  //api_key: '443273869594613',
  //api_secret: 'uFGtvWhDjpCHWBcCvXlc18SsPbQ'
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

exports.addImage = async (req, res) => {
  cloudinary.v2.uploader.upload(req.body.image, (result) => {
    console.log(result);

    cloudinary.v2.uploader.upload(req.body.image,
      function (error, result) {
        const savedData = async () => {
          if (req.body.image) {
            await User.updateMany({
              '_id': req.body.user._id
            }, {
              'imageId': result.public_id,
              'imageVersion': result.version
            });
          }
        }

        savedData()
          .then(result =>{
            return res.status(200).json({message: 'Profile image uploaded'});
          })

      });
  })
}

exports.addLogo = async (req, res) => {
  cloudinary.v2.uploader.upload(req.body.image, (result) => {
    console.log(result);

    cloudinary.v2.uploader.upload(req.body.image,
      function (error, result) {
        const savedData = async () => {
          if (req.body.image) {
            await Gym.updateMany({
              '_id': req.body.gym
            }, {
              'imageId': result.public_id,
              'imageVersion': result.version
            });
          }
        }

        savedData()
          .then(result =>{
            return res.status(200).json({message: 'Gym logo uploaded'});
          })

      });
  })
}