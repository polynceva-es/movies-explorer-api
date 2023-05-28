const isUrlValid = (url) => {
  const urlRegex = /https?:\/\/(?:www\.)?[\w@:%.\-+~#=]{1,256}\.[a-zA-Z]{1,10}\b([\w\-.~:/?#[\]@!$&'()*+,;=]+#?)?/g;
  return urlRegex.test(url);
};

module.exports.isUrlValid = isUrlValid;

module.exports.joiIsUrlValid = (value, helper) => {
  if (isUrlValid(value)) {
    return value;
  }
  return helper.message('Передан не валидный url');
};
