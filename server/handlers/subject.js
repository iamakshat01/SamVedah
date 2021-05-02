const db = require('../models');

// Add A Subject For Admin
exports.addsubject = async (req, res, next) => {
  try {
    const sub = await db.Subject.create(req.body);
    return res.status(201).json({
     sub
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// get all the subjects in db
exports.getallsubject = async (req,res,next) => {
    try {
        const allsub= await db.Subject.find({});
        return res.status(200).json({
            allsub
        })
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}

//a user adds a subject of expertise in db
exports.addmysubject = async (req,res,next) => {
    try {
        const {id} = req.decoded;
        const user = await db.User.updateOne(
            { _id: id },
            { $addToSet: { subjects: req.body._id } }
        )
        return res.status(201).json({
            user
        });
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}

// a user to see all his subjects
exports.getmysubject = async (req,res,next) => {
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id).populate('subjects');
        return res.status(201).json(
            user.subjects
        );
    } catch(err) {
        return next({
            status: 400,
            message: err.message
        })
    }
}




