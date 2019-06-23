const imagesLinks = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

imagesLinks.forEach((imagesLink, i) => {
  setTimeout(() => {
    window.open(imagesLink);
  }, getRandomInt(i * 500, i * 500 + 1000))
});
