
function errorWrapper(err){

        let error = {};
        err.map(x => {
            if(!error.hasOwnProperty(x.param)){
                error[x.param] = []
            }
            error[x.param].push(x.msg)
        })
        return error;
};

module.exports = {
    errorWrapper
};