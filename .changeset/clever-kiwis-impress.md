---
'@keystonejs/app-admin-ui': minor
---

Enable use of ui hooks for specific List page. To use list specific hooks, create them in the list name key

```js
module.exports = {
    // hooks for all lists
    itemHeaderActions: ActionsForAllPage,
    listHeaderActions: ActionsForAllPage,
    Post: {
        itemHeaderActions: ActionsForPostListPageOnly,
        listHeaderActions: ActionsForPostPageOnly,
    },
}
```
