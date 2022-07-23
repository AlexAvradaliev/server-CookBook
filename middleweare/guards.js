function isAuth(){
    
    return (req,res,next) =>{
        if(req.users){
            next();
        } else {
            res.status(403).json({message: 'Please login!'});
        };
    };
};

function isGuest(){
    return (req,res,next) =>{
        
        if(!req.users){
            next();
        } else {
            res.status(400).json({message: 'You are already login!'});
        };
    };
};



module.exports = {
    isAuth,
    isGuest,
};