<h3 align="center">Upload to Release</h3>
<p align="center">Это GitHub Action, который используется для загрузки файлов в свой релиз<p>
<img width="926" alt="image" src="https://user-images.githubusercontent.com/10660468/49449109-2d37d400-f7a8-11e8-8e59-607c91520c96.png">

## Пример:

```yaml
name: Build app

on:
  release:
    types: [published]

jobs:
  build:
    name: Build and upload docker image
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@master
      - uses: actions/setup-node@master

      - name: Install deps
      - run: npm i

      - name: Build application
      - run: npm run build

      - name: Upload release files
        uses: danyadev/upload-to-release@master
        with:
          files: |
            [./build/release-x64.zip, release-x64.zip, application/zip]
            [./build/release-ia64.zip, release-x32.zip, application/zip]
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
