# expert-cart

> The best shopping cart

A React Hooks, Redux, TypeScript shopping cart implementation. Tested with Jest and React Testing Library.

## Runing

Install dependencies

```bash
$ yarn
```

Start application

```
$ yarn start
```

Test app

```
$ yarn test
```

## Architectural decisions

Though this application isn't using a backend. The redux store is designed
to be able to be able to load items into state. Prices are calculated
using the offers state, which could also be loaded in from a service side API too.

The cart uses a selector to perform the calculation, which allows the checkout to be component
agnostic.

I have used React Functional components and hooks exclusively throughout this application,
as I find they require less code, they are easy to read, and a pleasant experience to create with.

I used TypeScript because it allows for a better development experience and lets me work faster
because someone is instantly telling me where all the problems are :P

I didn't use RXJS in this application because I didn't see much of use case for it. I'm not reacting to any
asynchronous data here, but would be nice to work in as an added extra when retrieving the data
from backend.

I used jest for TDD while creating the store. This allowed for rock solid testing on the checkout and
cart portions of the store. For the components I added in tests on ensuring the correct state
went in the correct places. I used snapshot testing to keeping track of specific layouts for
the data in the document.

## Design

I didn't use a design library as I focused more on ensuring the data is correct over styling.
I used some very simple css to create a very simple but functional UI.


## Test results
```bash
 PASS  src/store/offers.spec.ts
 PASS  src/App.spec.tsx
 PASS  src/containers/BuyableItem.spec.tsx
 PASS  src/containers/Cart.spec.tsx
 PASS  src/containers/ItemList.spec.tsx
 PASS  src/store/cart.spec.ts
 PASS  src/store/checkout.spec.ts
 PASS  src/store/items.spec.ts
------------------|----------|----------|----------|----------|-------------------|
File              |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------------|----------|----------|----------|----------|-------------------|
All files         |     96.1 |    92.86 |       95 |    95.71 |                   |
 src              |       80 |      100 |      100 |       80 |                   |
  App.tsx         |      100 |      100 |      100 |      100 |                   |
  index.tsx       |        0 |      100 |      100 |        0 |                 8 |
  types.ts        |      100 |      100 |      100 |      100 |                   |
 src/containers   |    93.55 |    86.36 |    86.67 |     93.1 |                   |
  BuyableItem.tsx |       80 |      100 |    66.67 |       80 |             28,38 |
  Cart.tsx        |      100 |    78.57 |      100 |      100 |          12,33,39 |
  ItemList.tsx    |      100 |      100 |      100 |      100 |                   |
 src/store        |      100 |      100 |      100 |      100 |                   |
  cart.ts         |      100 |      100 |      100 |      100 |                   |
  checkout.ts     |      100 |      100 |      100 |      100 |                   |
  index.ts        |      100 |      100 |      100 |      100 |                   |
  items.ts        |      100 |      100 |      100 |      100 |                   |
  offers.ts       |      100 |      100 |      100 |      100 |                   |
------------------|----------|----------|----------|----------|-------------------|

Test Suites: 8 passed, 8 total
Tests:       21 passed, 21 total
Snapshots:   7 passed, 7 total
Time:        5.576s
```