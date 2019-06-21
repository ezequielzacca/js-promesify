# JS Promesify

With promesify you can easily convert any Node callback based function to a promise

### Example

Given any callback based function, e.g.:
```typescript
export const asyncRandom = (min: number, max: number, cb: (err, res) => any) => {
  setTimeout(() => {
    if (Math.random() > 0.7) {
      return cb("A rare exception ocurred", null);
    }
    return cb(null, Math.floor(Math.random() * (max - min) + min))
  }, 1000);
}
  ```

Let's say i want to consume the `asyncRandom` function to generate a *min random value*, a *max random value*, and then a *value between those min and max*.
It could look like this:

```typescript
app.get('/cb', (req, res) => {
  asyncRandom(1, 10, (err, min) => {
    if (err) {
      return res.status(500).json({ err: err })
    }
    asyncRandom(80, 90, (err, max) => {
      if (err) {
        return res.status(500).json({ err: err })
      }
      asyncRandom(min, max, (err, num) => {
        if (err) {
          return res.status(500).json({ err: err })
        }
        return res.json({
          number: num
        })
      })
    })
  })
});
  ```

  With `promesifyjs` that code would be much more cleaner.

  ```typescript
app.get('/promise', async (req, res) => {
    try {
        let min = await Promisefy<number>(asyncRandom, 1, 10);
        let max = await Promisefy<number>(asyncRandom, 80, 90);
        let num = await Promisefy<number>(asyncRandom, min, max);
        return res.json({
            number: num
        });
    } catch (ex) {
        return res.status(500).json({
            err: ex
        });
    }
});
  ```

  ## Installation

  `npm i -s promesify-js`
  
  ## Usage

```typescript
import { Promesify } from "js-promesify";
```