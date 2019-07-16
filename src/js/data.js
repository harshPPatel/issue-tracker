const IDENTIFIER = 'issues';

module.exports.getJSONData = () => {
  return JSON.parse(localStorage.getItem(IDENTIFIER));
};

module.exports.getData = () => {
  return localStorage.getItem(IDENTIFIER);
};

module.exports.setJSONData = (data) => {
  localStorage.setItem('issues', JSON.stringify(data));
}