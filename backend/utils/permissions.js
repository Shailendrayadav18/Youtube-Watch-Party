const canControl = (role) => {
  return role === "host" || role === "moderator";
};

const isHost = (role) => role === "host";

module.exports = { canControl, isHost };