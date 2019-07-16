const IDENTIFIER = 'issues';

module.exports.getJSONData = () => {
  return JSON.parse(localStorage.getItem(IDENTIFIER));
};

module.exports.getData = () => {
  return localStorage.getItem(IDENTIFIER);
};

module.exports.setJSONData = data => {
  localStorage.setItem('issues', JSON.stringify(data));
};

module.exports.fetchQuotes = () => {
  const URL = './json/quote.json';
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then(res => {
        return res.json();
      })
      .then(json => {
        resolve(json);
      })
      .catch(err => {
        reject(err);
      });
  });
};
