# Game of Thrones map backend 

## Installation

```
$ npm install
```

## Start

```
$ npm run start
```

### Endpoints

#### /time
This endpoints returns a JSON with attribute `now` witch value is the database time.

#### /locations/:type
Returns the list of locations of type `:type`.

#### /locations/:id/summary
Returns the summary of location with id `:id`.

#### /kingdoms-boundaries
Returns the list of kingdoms with each of its boundaries.

#### /kingdoms/:id/size
Returns the size in Km<sup>2</sup> of kingdom with id `:id`.

#### /kingdoms/:id/summary
Returns the summary of kingdom with id `:id`.

#### /kingdoms/:id/castles
Returns the count of castles in kingdom with id `:id`.
