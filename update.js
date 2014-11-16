var fs      = require('fs')
  , objcio  = require('./objcio.js');

function update (callback) {
  objcio(function (error, issues) {
    if (error) {
      console.log(error);
      callback();
    }
    else {
      serialize(issues, function (error) {
        if (error) {
          console.log(error);
        }

        callback();
      })
    }
  });
}

function serialize (object, callback) {
  fs.writeFile('data.json', JSON.stringify(object, null, 2), function (error) {
    if (error) {
      console.log(error);
    }

    callback();
  });
}

update(function () {
  process.exit();
});
