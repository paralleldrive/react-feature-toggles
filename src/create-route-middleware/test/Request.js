const Request = ({
  url = '',
  method = 'GET'
}={}) => ({
  get url() { return url; },
  get method() { return method; }
});

export default Request;