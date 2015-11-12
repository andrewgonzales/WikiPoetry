# WikiPoetry

> With over 5 million poems, WikiPoetry is your number one source of computer-generated poetry.


## Team

  - __Product Owner__: Tim Scheys
  - __Scrum Master__: Tomio Mizoroki
  - __Development Team Members__: Andrew Gonzales, Ryan Chen

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> WikiPoetry was designed to be familiar to users of WikiPedia. From the home page, click on a link to go down the WikiPoetry rabbit hole, or use the search feature to create custom poetry on your desired topic.

On each page, you can regenerate the poetry or select a poet from the navigation menu to re-render the poems in a different style. In true wiki fashion, users can also edit and save poems. These poems will become available under the 'User' style for any visitor to see.

## Requirements

- Node
- Express
- Flux
- React
- MongoDB

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
### Running

From within the root directory:

```sh
gulp
```

If for some reason the gulp fails, the JavaScript and CSS can be compiled individually with 'gulp JS' and 'gulp CSS'. Then run a server with 'node server/server.js'.


### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
