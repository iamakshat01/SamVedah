const db = require('../models');

// this is for mentor to become mentor of a child
exports.bementor = async (req,res,next) => {
    try {
        const {id}=req.decoded;
        const mentor= await db.User.findById(id);
        
        const mentee= await db.User.findById(req.body._id);
        
        const request= await db.Pool.create({
            "mentor": mentor._id,
            "mentee": mentee._id,
            "subject": req.body.subject
        })

        

        mentor.pools.push(request._id);
        await mentor.save();

        mentee.pools.push(request._id);
        await mentee.save();

       
        return res.status(200).json({"message":"Successfully Accepted"})

    } catch(err) {
        return next({
            status: 400,
            message: err.message,
        });
    }
}

// this is for mentor to see his mentees
exports.mymentees = async (req,res,next) => {
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id).populate({ 
                path: 'pools',
                populate: [{
                    path: 'mentee',
                    model: 'User',
                    select:['name','email','phone','class']
                },
                {
                    path: 'subject',
                    model: 'Subject',
                    select:['name']
                }]

        })    
        return res.status(200).json(
            user.pools
        );
    } catch( err ) {
        return next({
            status: 400,
            message: err.message,
        });
    }
}

// this is for mentee to see his mentors
exports.mymentors = async (req,res,next) => {
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id).populate({ 
                path: 'pools',
                populate: [{
                    path: 'mentor',
                    model: 'User',
                    select:['name','email','phone']
                },
                {
                    path: 'subject',
                    model: 'Subject',
                    select:['name']
                }
            ]
        })    
        return res.status(200).json(
            user.pools
        );
    } catch( err ) {
        return next({
            status: 400,
            message: err.message,
        });
    }
}


// this is for mentors to display mentees who need mentorship related to their subject interest
exports.serachmentees = (req,res,next) => {

        const {id} = req.decoded;
        let ment =[];
        db.User.findById(id).exec(function(err,docs) {

            if(err) {
                return next({
                    status: 400,
                    message: err.message,
                });
            }
            docs.subjects.forEach(function(x)
            {
                ment.push(x._id)
            }) 
            
        })
        db.User.find({"type":"mentee"}).populate("subjects").populate({ 
                path: 'pools',
                populate: {
                path: 'subjects',
                model: 'Subject'
            } 
        }).exec(function (err, docs) {
            
            if(err) {
                return next({
                    status: 400,
                    message: err.message,
                });
            }
            let ans=[];
            docs.forEach(function(x)
            {
                
                for(let j=0;j<x.subjects.length;j++)
                {
                    
                    {
                        let flag=0;
                        
                        for(let k=0;k<x.pools.length;k++)
                        {
                            // console.log(x.subjects[j]._id,x.pools[k].subject._id);
                            if(x.subjects[j]._id.toString()===x.pools[k].subject._id.toString())
                            {
                                flag=1;
                                break;
                            }
                        }
                        
                        if(flag===0)
                        {
                            
                            for(let z=0;z<ment.length;z++)
                            {
                                if(ment[z].toString()===x.subjects[j]._id.toString())
                                {
                                    ans.push({"x":{
                                        "_id":x._id,
                                        "name":x.name,
                                        "class":x.class
                                    },"subject":x.subjects[j]});
                                    break;
                                }
                            }
                            
                        }
                    }
                }
            }) 
            return res.status(200).json(
                ans
            );

        })   
}
