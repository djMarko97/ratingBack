const User = require('../models/user');
const Gym = require('../models/gym');

exports.createGym = async (req, res) => {

    if (req.body.name === undefined || req.body.address === undefined ||
        req.body.place === undefined || req.body.type === undefined || req.body.website === undefined) {
        return res.status(200).json({ error: 'You cannot create gym with empty fields' });
    }

    if (req.body.name === '' || req.body.address === '' ||
        req.body.place === '' || req.body.type === '' || req.body.website === '') {
        return res.status(200).json({ error: 'You cannot create gym with empty fields' });
    }

    const newGym = new Gym();
    newGym.gymname = req.body.name;
    newGym.address = req.body.address;
    newGym.place = req.body.place;
    newGym.type = req.body.type;
    newGym.website = req.body.website;
    newGym.admin = req.body.userId;

    const gymData = await newGym.save();

    await User.updateMany({
        '_id': req.body.userId
    },{
        $push:{gyms:{
            gym: gymData._id
        }}
    });

    return res.status(200).json({ message: 'Gym created successfully' });
}

exports.getAllGyms = async (req, res) => {
    const results = await Gym.find({})
        .populate("rating.user");


    return res.status(200).json({ result: results });
}

exports.addReview = async (req, res) => {

    if (req.body.service === '' || req.body.staff === '' || req.body.equipement === '' ||
        req.body.hygiene === '' || req.body.overall === '' || req.body.review === '') {
        return res.status(200).json({ error: 'No empty fields allowed' });
    }

    if (req.body.service === undefined || req.body.staff === undefined || req.body.equipement === undefined ||
        req.body.hygiene === undefined || req.body.overall === undefined || req.body.review === undefined) {
        return res.status(200).json({ error: 'No empty fields allowed' });
    }

    const gym = await Gym.updateMany({
        "_id": req.body.gymId
    }, {
        $push: {
            rating: {
                user: req.body.userId,
                service: req.body.service,
                staff: req.body.staff,
                equipement: req.body.equipement,
                hygiene: req.body.hygiene,
                review: req.body.review,
                overall: req.body.overall
            },

            ratingOverall: req.body.overall,
            serviceTotal: req.body.service,
            staffTotal: req.body.staff,
            equipementTotal: req.body.equipement,
            hygieneTotal: req.body.hygiene
        },
        $inc: { totalStars: req.body.overall }
    });

    return res.status(200).json({ message: 'Review added successfully' });

}

exports.addMember = async (req, res) => {
    await Gym.updateMany({
        '_id': req.body.gym._id,
        'members.member': { $ne: req.body.user._id }
    }, {
        $push: {
            members: {
                member: req.body.user._id
            }
        }

    });
    await User.updateMany({
        '_id':req.body.user._id,
        'members.member': { $ne: req.body.user._id }
    }, {
        role:req.body.role
    });

    return res.status(200).json({ message: 'Role added successfully' });
}

exports.search = async (req, res) =>{
     const searchName = req.body.gym;
     const regex = new RegExp(searchName, 'gi');//ignore case and global
     const gym = await Gym.find({"gymname": regex}).populate('rating.user');

     if(gym.length > 0){
         return res.status(200).json({message: "Search Results", results: gym});
     }else{
         return res.status(200).json({message: "Search Results", results: []});
     }
}

exports.leaderBoard = async (req, res) =>{
    const results = await Gym.find({})
                        .sort({"totalStars": -1}); //desc

     return res.status(200).json({result: results});                       
}
