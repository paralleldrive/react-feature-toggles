const Response = ({
  statusCode
} = {}) => ({
  status: (n) => Response({ statusCode: n }),
  statusCode: statusCode
});

export default Response;