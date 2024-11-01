function OK(res, statusCode, data, message) {
  res.status(statusCode).json({ isFalse: false, data, message });
}

function ERR(res, statusCode, message) {
  res.status(statusCode).json({ isFalse: false, message });
}

module.exports = { OK, ERR };
