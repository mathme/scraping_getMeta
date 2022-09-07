# scraping_getMeta
指定したURLからtitleタグなど任意のmeta情報を取得するツール
サーバ内の静的HTMLリストをもらった時にそのページのmeta情報を一括で取得する用
サーバリダイレクトがかかっている場合にはステータスコードと転送先最終URLを記録

## Requirement
- node v15.14.0

## Usage
ページIDを記述したテキストファイルをlistディレクトリに設置して以下を実行
```
node getMeta.js
```
