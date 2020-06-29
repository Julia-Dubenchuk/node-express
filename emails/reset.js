const keys = require("../keys");

module.exports = function (email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "Access recovery",
    html: `
    <h1>Forgot password?</h1>
    <p>If you don't forget, please ignore this letter.</p>
    <p>Else click on the link below:</p>
    <p><a href="${keys.BASE_URL}/auth/password/${token}">Recovery</a></p>
    <hr />
    <a href="${keys.BASE_URL}">Store of courses</a>
    `,
  };
};
