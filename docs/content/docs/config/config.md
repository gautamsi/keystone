---
title: "System Configuration"
description: "API reference for configuring your Keystone system: Lists, Database, Admin UI, Server, Sessions, GraphQl, Files, Images, and experimental options."
---

The `keystone` [CLI](../guides/cli) expects to find a module named `keystone.ts` with a default export of a Keystone system configuration returned from the function `config()`.

```typescript filename=keystone.ts
import { config } from '@keystone-6/core';

export default config({ /* ... */ });
```

The `config` function accepts an object representing all the configurable parts of the system:

```typescript
export default config({
  lists: { /* ... */ },
  db: { /* ... */ },
  ui: { /* ... */ },
  server: { /* ... */ },
  session: { /* ... */ },
  graphql: { /* ... */ },
  extendGraphqlSchema: { /* ... */ },
});
```

We will cover each of these options below.

The configuration object has a TypeScript type of `KeystoneConfig`, which can be imported from `@keystone-6/core/types`.
This type definition should be considered the source of truth for the available configuration options.

Note: It is important to pass a `TypeInfo` type argument to the config function as it ensures proper typing for the [Keystone Context](../context/overview). This type is automatically created in `.keystone/types`. You can customize the output path of the generated type by specifying it in the config object.

```typescript
import { TypeInfo } from ".keystone/types";

export default config<TypeInfo>({ /* ... */ });
```

## lists

The `lists` config option is where you define the data model, or schema, of the Keystone system.
This is where you define and configure the `lists` and their `fields` of the data model.
See the [Lists API](./lists) docs for details on how to use this function.

```typescript
import { config } from '@keystone-6/core';
import { TypeInfo } from ".keystone/types";

export default config<TypeInfo>({
  lists: { /* ... */ },
  /* ... */
});
```

## db

The `db` config option configures the database used to store data in your Keystone system.
Keystone supports the database types **PostgreSQL**, **MySQL** and **SQLite**.
These database types are powered by their corresponding Prisma database providers; `postgresql`, `mysql` and `sqlite`.

- `provider`: The database provider to use, it can be one of `postgresql`, `mysql` or `sqlite`.
- `url`: The connection URL for your database
- `onConnect`: which takes a [`KeystoneContext`](../context/overview) object, and lets perform any actions you might need at startup, such as data seeding
- `enableLogging` (default: `false`): Enable logging from the Prisma client.
- `idField` (default: `{ kind: "cuid" }`): The kind of id field to use, it can be one of: `cuid`, `uuid` or `autoincrement`.
  This can also be customised at the list level `db.idField`.
  If you are using `autoincrement`, you can also specify `type: 'BigInt'` on PostgreSQL and MySQL to use BigInts.
- `shadowDatabaseUrl` (default: `undefined`): Enable [shadow databases](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#cloud-hosted-shadow-databases-must-be-created-manually) for some cloud providers.

### postgresql

```typescript
export default config<TypeInfo>({
  db: {
    provider: 'postgresql',
    url: 'postgres://dbuser:dbpass@localhost:5432/keystone',
    onConnect: async context => { /* ... */ },
    // Optional advanced configuration
    enableLogging: true,
    idField: { kind: 'uuid' },
    shadowDatabaseUrl: 'postgres://dbuser:dbpass@localhost:5432/shadowdb'
  },
  /* ... */
});
```

### mysql

```typescript
export default config<TypeInfo>({
  db: {
    provider: 'mysql',
    url: 'mysql://dbuser:dbpass@localhost:3306/keystone',
    onConnect: async context => { /* ... */ },
    // Optional advanced configuration
    enableLogging: true,
    idField: { kind: 'uuid' },
  },
  /* ... */
});
```

### sqlite

```typescript
export default config<TypeInfo>({
  db: {
    provider: 'sqlite',
    url: 'file:./keystone.db',
    onConnect: async context => { /* ... */ },
    // Optional advanced configuration
    enableLogging: true,
    idField: { kind: 'uuid' },
  },
  /* ... */
});
```

#### Limitations

The `sqlite` provider is not intended to be used in production systems, and has certain limitations:

- `decimal`: The `decimal` field type is not supported.
- `timestamp`: The `timestamp` field type only supports times within the range `1970 - 2038`.
- `text`: The `text` field type does not support setting a filter as case sensitive or insensitive.
  Assuming default collation, all the filters except `contains`, `startsWith` and `endsWith` will be case sensitive
  and `contains`, `startsWith` and `endsWith` will be case insensitive but only for ASCII characters.
- `select`: Using the `type: 'enum'`, the value will be represented as a string in the database.

## ui

The `ui` config option configures the Admin UI which is provided by Keystone.
This config option is for top level configuration of the Admin UI.
Fine grained configuration of how lists and fields behave in the Admin UI is handled in the `lists` definition (see the [Lists API](./lists) for more details).

Options:

- `isDisabled` (default: `false`): If `isDisabled` is set to `true` then the Admin UI will be completely disabled.
- `isAccessAllowed` (default: `(context) => context.session !== undefined`): This function controls whether a user can view the Admin UI.
  It takes a [`KeystoneContext`](../context/overview) object as an argument.

Advanced configuration:

- `publicPages` (default: `[]`): An array of page routes that bypass the `isAccessAllowed` function.
- `pageMiddleware` (default: `undefined`): An async middleware function that can optionally return a redirect
- `getAdditionalFiles` (default: `[]`): An async function returns an array of `AdminFileToWrite` objects indicating files to be added to the system at `build` time.
  If the `mode` is `'write'`, then the code to be written to the file should be provided as the `src` argument.
  If the `mode` is `'copy'` then an `inputPath` value should be provided.
  The `outputPath` indicates where the file should be written or copied to
  **Note**: This API is designed for use by plugins, such as the [`@keystone-6/auth`](./auth) package.
  See the [Custom Admin UI Pages](../guides/custom-admin-ui-pages) guide for details on simpler ways to customise your Admin UI.

```typescript
export default config<TypeInfo>({
  ui: {
    isDisabled: false,
    isAccessAllowed: async (context) => context.session !== undefined,

    // advanced configuration
    publicPages: ['/welcome'],
    getAdditionalFiles: [
      async (config: KeystoneConfig) => [
        {
          mode: 'write',
          src: `
            import { jsx } from '@keystone-ui/core';
            export default function Welcome() {
              return (<h1>Welcome to my Keystone system</h1>);
            }`,
          outputPath: 'pages/welcome.js',
        },
        {
          mode: 'copy',
          inputPath: '...',
          outputPath: 'pages/farewell.js',
        }
      ],
    ],
  },
  /* ... */
});
```

## server

The `dev` and `start` commands from the Keystone [command line](../guides/cli) will start an Express web-server for you.
This server is configured via the `server` configuration option.

Options:

- `cors` (default: `undefined`): Allows you to configure the [cors middleware](https://www.npmjs.com/package/cors#configuration-options) for your Express server.
  If left undefined `cors` will not be used.
- `port` (default: `3000` ): The port your Express server will listen on.
- `options` (default: `undefined`): The [`http.createServer`](https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener) options used by Node.
- `maxFileSize` (default: `200 * 1024 * 1024`): The maximum file size allowed for uploads. If left undefined, defaults to `200 MiB`
- `extendExpressApp` (default: `undefined`): Allows you to extend the express app that Keystone creates.
- `extendHttpServer` (default: `undefined`): Allows you to extend the node `http` server that runs Keystone.

```typescript
export default config<TypeInfo>({
  server: {
    cors: { origin: ['http://localhost:7777'], credentials: true },
    port: 3000,
    maxFileSize: 200 * 1024 * 1024,
    extendExpressApp: async (app, commonContext) => { /* ... */ },
    extendHttpServer: async (httpServer, commonContext) => { /* ... */ },
  },
  /* ... */
});
```

### extendExpressApp

This lets you modify the express app that Keystone creates _before_ the Apollo Server and Admin UI Middleware are added to it (but after the `cors` and `healthcheck` options are applied).

The function is passed two arguments:

- `app`: The express app keystone has created
- `context`: A Keystone Context

For example, you could add your own request logging middleware:

```ts
export default config<TypeInfo>({
  server: {
    extendExpressApp: (app) => {
      app.use((req, res, next) => {
        console.log('A request!');
        next();
      });
    },
  },
});
```

Or add a custom route handler:

```ts
export default config<TypeInfo>({
  server: {
    extendExpressApp: (app) => {
      app.get('/_version', (req, res) => {
        res.send('v6.0.0-rc.2');
      });
    },
  },
});
```

You could also use it to add custom REST endpoints to your server, by creating a context for the request and using the Query API Keystone provides:

```ts
export default config<TypeInfo>({
  server: {
    extendExpressApp: (app, commonContext) => {
      app.get('/api/users', async (req, res) => {
        const context = await commonContext.withRequest(req, res);
        const users = await context.query.User.findMany();
        res.json(users);
      });
    },
  },
});
```

The created context will be bound to the request, including the current visitor's session, meaning access control will work the same as for GraphQL API requests.

_ProTip!_: `extendExpressApp` can be `async`

### extendHttpServer

This lets you interact with the node [http.Server](https://nodejs.org/api/http.html#class-httpserver) that Keystone uses.

The function is passed in 3 arguments:

- `server` - this is the HTTP server that you can then extend
- `context`: A Keystone Context

For example, this function could be used to listen for `'upgrade'` requests for a WebSocket server when adding support for GraphQL subscriptions

```ts
import { WebSocketServer } from 'ws';
import { useServer as wsUseServer } from 'graphql-ws/lib/use/ws';

export default config<TypeInfo>({
  server: {
    extendHttpServer: (httpServer, commonContext) => {
      const wss = new WebSocketServer({
        server: httpServer,
        path: '/api/graphql',
      });

      wsUseServer({ schema: commonContext.graphql.schema }, wss);
    },
  },
});
```

_Note_: when using `keystone dev`, `extendHttpServer` is only called once on startup - you will need to restart your process for any updates

## session

The `session` config option allows you to configure session management of your Keystone system.

In general you will use `SessionStrategy` objects from the `@keystone-6/core/session` package, rather than writing this yourself.


```typescript
import { statelessSessions } from '@keystone-6/core/session';

export default config<TypeInfo>({
  session: statelessSessions({ /* ... */ }),
  /* ... */
});
```

See the [Session API](./session) for more details on how to configure session management in Keystone.

## graphql

The `graphql` config option allows you to configure certain aspects of your GraphQL API.

Options:

- `debug` (default: `process.env.NODE_ENV !== 'production'`): If `true`, stacktraces from both Apollo errors and Keystone errors will be included in the errors returned from the GraphQL API.
  These can be filtered out with `apolloConfig.formatError` if you need to process them, but do not want them returned over the GraphQL API.
- `path` (default: `'/api/graphql'`): The path of the GraphQL API endpoint.
- `playground` (default: `process.env.NODE_ENV !== 'production'`)
  - `true` - Add `ApolloServerPluginLandingPageGraphQLPlayground` to the Apollo Server plugins
  - `false` - Add `ApolloServerPluginLandingPageDisabled` to the Apollo Server plugins
  - `'apollo'` - Do not add any plugins to the Apollo config, this will use [Apollo Sandbox](https://www.apollographql.com/docs/apollo-server/testing/build-run-queries/#apollo-sandbox)
- `apolloConfig` (default: `undefined`): Allows you to pass [extra options](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#constructor) into the `ApolloServer` constructor.
- `schemaPath` (default: `schema.graphql`): The path of the generated GraphQL API schema.

```typescript
export default config<TypeInfo>({
  graphql: {
    debug: process.env.NODE_ENV !== 'production',
    path: '/api/graphql',
    apolloConfig: {
      debug: true,
      /* ... */
    },
  },
  /* ... */
});
```

## extendGraphqlSchema

The `extendGraphqlSchema` config option allows you to extend the GraphQL API which is generated by Keystone based on your schema definition.
It has a TypeScript type of `(schema: import("graphql").GraphQLSchema) => import("graphql").GraphQLSchema`.

`extendGraphqlSchema` expects a function that takes the GraphQL Schema generated by Keystone and returns a valid GraphQL Schema

```typescript
import type { GraphQLSchema } from 'graphql'
import { config, graphql } from '@keystone-6/core'

export default config<TypeInfo>({
  extendGraphqlSchema: (keystoneSchema: GraphQLSchema) => {
    /* ... */
    return newExtendedSchema
  }
  /* ... */
})
```

See the [schema extension guide](../guides/schema-extension) for more details and tooling options on how to extend your GraphQL API.

## Related resources

{% related-content %}
{% well
heading="Lists API Reference"
href="/docs/config/lists" %}
The API to configure your options used with the `list` function.
{% /well %}
{% /related-content %}
