const keys = require("../keys");

module.exports = function (email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: "The account was creating!",
    html: `
    <h1>Welcome!</h1>
    <p>Your account was creating success.</p>
    <p>Your email: ${email}</p>
    <hr />
    <a href="${keys.BASE_URL}">Store of courses</a>
    `,
  };
};
