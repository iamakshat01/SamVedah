module.exports = {
    ...require('./auth'),
    ...require('./subject'),
    ...require('./pool')
  };
  
module.exports.error = (err, req, res, next) => {
    return res.status(err.status || 500).json({
      success: false,
      error: {
        message: err.message || 'Something went wrong.',
      },
    });
  };
  