export const EndPoints = {
  V1: "/api/v1",
  User: {
    Path: "user",
    Get: {
      Logout: "logout",
      Profile: "me",
      All: "all",
    },
    Post: {
      Register: "register",
      Login: "login",
      ForgotPassword: "forgot-password",
      ResetPassword: "reset-password",
      ChangePassword: "change-password",
      UpdateProfile: "update-me",
    },
  },
  Message: {
    Path: "message",
    Get: {
      All: "all",
    },
    Post: {
      Send: "send",
    },
  },
};
