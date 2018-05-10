[![Build Status](https://travis-ci.org/thadeu/logger-storage.svg?branch=master)](https://travis-ci.org/thadeu/logger-storage)

# Logger to localStorage

Console.log out of the box.

## how to use?

```js
import * as loggerStorage from '@thadeu/logger-storage'
```

## Methods available

* sync -> start process
* logger -> save to localStorage
* all -> get all logs
* filter -> filter logs
* logs -> filter only logs
* errors -> filter only errors
* warns -> filter only warns
* infos -> filter only infos
* clear -> clear storage

## .sync({ ...options })

#### auto_start

Type: `Boolean`

Default: true

#### reloadClear

Type: `Boolean`

Default: true

#### only

Type: `Array`

Default: ['error', 'info', 'log', 'warn']

## Example used sync

```js
loggerStorage.sync({
  only: ['error']
})
```

## Get all logs

```js
loggerStorage.all().then((items) => {
  console.log(items)
})
```

## Get only errors

```js
loggerStorage.errors().then((items) => {
  console.log(items)
})
```

## Get only warns

```js
loggerStorage.warns().then((items) => {
  console.log(items)
})
```

## Get only infos

```js
loggerStorage.infos().then((items) => {
  console.log(items)
})
```

## Logger manually

```js
loggerStorage.logger('testing with logger storage', {
  type: 'log', // 'error', 'info', 'log', 'warn'
  // others custom attributes
})
```

## Get only logs

```js
loggerStorage.logs().then((items) => {
  console.log(items)
})
```

## Do you developer?

**starting project**

```js
npm run start
```

**watching tests**

```js
npm run test:watch
```

We going to enjoy!!

# Contributing

Once you've made your great commits (include tests, please):

1. Fork this repository
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. Create a pull request

That's it!

Please respect the indentation rules and code style. And use 2 spaces, not tabs. And don't touch the version thing or distribution files; this will be made when a new version is going to be released.

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
