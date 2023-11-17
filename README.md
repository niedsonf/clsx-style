# CLSX Style (LIB UNDER CONSTRUCTION)

A utility function built on top of [clsx](https://www.npmjs.com/package/clsx) to avoid repeating prefixes on tailwind styling

Support string, object, array, and conditional syntax

## Installation

```bash
npm install clsx-style
```

## Usage

The API is similar with `clsx`
To use the prefix feature, pass as argument to 'cs' function an object with 2 specific properties:
    'prefix': <your-className-prefix> (String only),
    'style': <your-classNames> (String/Numbers/Object/Array)
If an object passed has a prefix string property and style property, the API will ignore the rest of object's properties

```ts
import { cs } from 'clsx-style';

cs({ prefix: 'hover:', style: 'bg-green-700 text-white' });
// => 'hover:bg-green-700 hover:text-white'

cs({ prefix: 'hover:', style: ['bg-green-700', 'text-white'] });
// => 'hover:bg-green-700 hover:text-white'

cs(
    { prefix: 'hover:', style: [true && 'bg-green-700', { 'text-white': false }] },
    { prefix: 'hover:', style: { 'text-black': true } }
),
// => 'hover:bg-green-700 hover:text-black'

cs([{ prefix: 'hover:', style: 'bg-green-700' }, 'a'], { prefix: 'hover:', style: 'text-white', props: ['s', {}, []] })
// => 'hover:bg-green-700 a hover:text-white'

```

```jsx
import { cs } from 'clsx-style';

function MyComponent() {
  return (
    <>
      <button className={cs(
        'bg-green-500 text-white',
        {prefix: 'hover:',
            style: 'bg-green-700 transition-colors'},
        {prefix: 'disabled:',
            style:'opacity-80 cursor-not-allowed'}
      )}>
        Submit
      </button>
    </>
  );
}
```