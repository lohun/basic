export default () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt: process.env.JWTSECRET,
  };
};
