var request = require('request')
  , cheerio = require('cheerio');

module.exports = function (callback) {
  request('http://www.objc.io/', { gzip: true }, function (error, response, body) {
    if (error) {
      callback(error);
    }
    else {
      callback(null, scrape_issue_data(cheerio.load(body)));
    }
  });
};

function scrape_issue_data ($) {
  return $('.issue .issue-content').map(function () {
    var $issue = $(this);

    var articles = $issue.find('li').map(function () {
      var $article = $(this)
        , $link    = $article.find('a');

      var params = {
        'permalink': $link.attr('href'),
        'title': $link.text().trim(),
      };

      var author = $article.find('.author').text().trim()

      if (author) {
        params.author = author;
      }

      return params;
    }).get();

    var $title      = $issue.find('.title')
      , $title_link = $title.find('a');

    return {
      'title': $title_link.clone().children().remove().end().text().trim(),
      'number': $title.find('.issue-number').text().trim(),
      'permalink': $title_link.attr('href'),
      'articles': articles
    }
  }).get();
}