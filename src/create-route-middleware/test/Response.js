const Response = ({
  statusCode
} = {}) => ({
  status: (n) => statusCode = n,
  get statusCode() { return statusCode; }
});

export default Response;