## Description

Backend-test is the command line node.js application, which watches with MongoDB collection and copies documents to another collection.
During copy, it should anonymize some sencitieve data.

## Requirements

- Node.js v18+.
- MongoDB v3.6.0 (Run in _replica sets_ or _sharded clusters_).

## Usage

### Build apps

```bash
npm run build
node parser.js --input ./app.log --output ./errors.json --parser info,error
```

### Run apps

To generate new customers, use the following command:

```bash
node ./dist/app.js
```

To watch and anonymize customers, use the following command:

```bash
node ./dist/sync.js
```

To run application in reindex mode, use the following command:

```bash
node ./dist/sync.js --full-reindex
```
