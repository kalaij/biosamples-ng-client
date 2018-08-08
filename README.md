# BioSamples API client

This repository contains [Angular](https://angular.io/) based Web client to the [BioSamples API](https://www.ebi.ac.uk/biosamples/docs/references/api/search).
 
## Getting Started
Follow the below instructions to get a copy of the project up and running on your local machine for development and testing purposes.
This project was generated with [Node](https://nodejs.org/en/about/) version 10.0.0
and [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

### Prerequisites
To run this project you'll need to have [Node.js](https://nodejs.org/en/about/), [npm](https://www.npmjs.com/) and [angular-cli](https://angular.io/guide/quickstart) installed on your machine.
npm is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer.

Check out the [Angular Quick Start Guide](https://angular.io/guide/quickstart) to install the above packages from scratch. Alternatively if you have [Homebrew](https://brew.sh/) installed on your machine you can 
be up and running in no time with the following installation instructions. 
 
### Dependency Installation

#### Node.js / npm
- Get latest version of [Node.js](https://nodejs.org/en/)

- If you use [Homebrew](https://brew.sh/) you can install node by doing:
```
brew install node
```

After installation check that everything is correctly installed and which versions you are running:
```
node -v
npm -v
```
#### angular-cli
- When node and npm have successfully installed you can then install angular-cli globally by doing:
```
npm install -g @angular/cli
```

After installation check that angular-cli is correctly installed and which version you are running:
```
ng -v
```

### Setting up the Project
Git Clone project and install dependencies:
```
git clone https://github.com/kalaij/biosamples-ng-client.git
cd biosamples-ng-client
npm install
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Usage 

From the browser you can access the following functionalities of the [BioSamples API](https://www.ebi.ac.uk/biosamples/docs/references/api/search)

- Get total number of samples currently available in BioSamples
- Given the accession of a sample, retrieve the name of the sample
- Given an attribute and value pair, retrieve the accessions of samples with that specific
  attribute:value pair
  
Sample search queries are provided in the web interface.   

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

If you want to report a bug or request a feature please open an issue ticket. 

## License
 For information about the licensing refer to our [LICENSE](LICENSE.md) 
