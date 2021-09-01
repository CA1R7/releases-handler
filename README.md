# Releases handler

A simple releases handler built with expressjs

#### What about the releases ?

On `common` folder there `updates.json` which contains a latest update details and `releases` folder contains releases binary files.

### Features

Costimizing the versions and platforms by params `{endpoint}/{version}/{platform}?arch={...}`.

### Map

|  Params  |      Type      |         Contains         | Required |
| :------: | :------------: | :----------------------: | :------: |
| version  | `param:string` |  `["latest", version]`   |   true   |
| platform | `param:string` | `[win32, darwin, linux]` |  false   |
|   arch   | `query:string` |     `[x64,x32,x86]`      |  false   |

# License

Copyright (c) 2021 CA1R71 Licensed under the MIT license.
