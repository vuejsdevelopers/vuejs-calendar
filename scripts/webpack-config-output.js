var fs = require('fs');
var pretty = require('js-object-pretty-print').pretty;

require('../webpack.config.js').forEach(target => {
  let fileName = `./tmp/${target.target}.${process.env.NODE_ENV === 'production' ? 'prod' : 'dev' }.js`;
  fs.writeFile(
    fileName,
    `module.export = ${pretty(target)};`,
    function(err) {
      if(err) {
        return console.log(err);
      }
      console.log(`${fileName} successfully saved.`);
    }
  );
});

