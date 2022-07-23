
function errorWrapper(err) {
    
    let errors = {};
    let status;
    if(err.name == 'ValidationError'){

        err = Object.values(err.errors).map(x => {
            if (! errors.hasOwnProperty(x.path)){
                errors[x.path] = [];
            }
            errors[x.path].push(x.message);
        });
    }else {
        err.map(x => {
            if (! errors.hasOwnProperty(x.param)) {
                errors[x.param] = [];
            }
            errors[x.param].push(x.msg);
            status = x.status
        });
    };
    return {status, errors};
};

function mapperStatus (err, status) {
   let result =  err.map(err => ({ ...err, status }));
    return result;
};

    module.exports = {
        errorWrapper,
        mapperStatus
    };