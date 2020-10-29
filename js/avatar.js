function changeAvatar() {
  const avatar = document.getElementById("avatar");
  avatar.src = `https://www.gravatar.com/avatar/${getRandomInt(
    1,
    100
  )}?d=robohash`;
}

setInterval(() => {
  changeAvatar();
}, 5000);
