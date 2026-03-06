---
title: Developing Dependent Libraries
weight: 30
---
If you are creating a library or another package that uses `@ulu/frontend` as a dependency (e.g., a Vue component library based on ULU), it is **critical** to list `@ulu/frontend` as a `peerDependency` in your `package.json`.

```json
{
  "name": "my-ulu-based-library",
  "version": "1.0.0",
  "peerDependencies": {
    "@ulu/frontend": "^1.0.0"
  }
}
```

## Why is this important?

@ulu/frontend includes singleton modules (like `settings`) that manage global state. If multiple copies of the library are loaded into a single project, these singletons will not be shared, leading to unexpected behavior and bugs. By using `peerDependencies`, you ensure that the consuming project provides a single, shared instance of `@ulu/frontend`.
