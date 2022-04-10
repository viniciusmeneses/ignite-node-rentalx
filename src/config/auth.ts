export default {
  secret_token: process.env.SECRET,
  expires_in_token: "15m",
  secret_refresh_token: process.env.SECRET_REFRESH,
  expires_in_refresh_token: "30d",
  expires_refresh_token_days: 30,
};
