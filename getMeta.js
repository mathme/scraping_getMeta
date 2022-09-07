//url_getmeta.txt に記載されたURLから特定の要素を取得
import cheerio from 'cheerio';
import axios from 'axios'; 
import fs from 'fs';
import readline from 'readline';

const asyncLineReader = async (iterater) => {
    const rl = readline.createInterface({
      input: fs.createReadStream('./url_getmeta.txt', { encoding: 'utf8' }),
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      await iterater(line);
    }
}
(async () => { 

    await asyncLineReader(async (lineString) => {   
        const lineText = lineString;

        const response = await axios.get(lineText)
          .then(function(response) {
            return response;
          })
          .catch(function(error) {
            if (error.response) {
            } else {
              error.response.status = 500; //何らかの理由でレスポンス自体が帰って来なかった時は無条件で500にする
            }
            return error.response;
          });

        const $ = await cheerio.load(response.data);
        let pageTitle;
        let redirectUrl;
        if (response.status === 200){
          if (response.request._redirectable._redirectCount === 0){
            pageTitle = $('title').text().replace(/\r?\n/g, '');
            redirectUrl = "";
          } else {
            response.status = 301; //リダイレクトは301に変換
            redirectUrl = response.request._redirectable._currentUrl;
            pageTitle = "";
          }
        } else {
          pageTitle = "";
          redirectUrl = "";
        }

        let filename = "data_getmeta.txt";
        fs.appendFileSync(filename,lineString + "," + response.status + "," + pageTitle + "," + redirectUrl + "\n");
    })
})();