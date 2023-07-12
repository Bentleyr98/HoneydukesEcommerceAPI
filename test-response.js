module.exports = class TestResponse {
  statusCode = 0;
  status(code) {
    this.statusCode = code;
    return this;
  }

  data = {};
  json(data) {
    this.data = data;
  }
};
