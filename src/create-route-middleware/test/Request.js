const Request = ({
  url = ''
}={}) => ({
  get url() { return url; }
});

export default Request;