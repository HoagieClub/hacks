# Hoagie Hacks

## Frontend

### Prerequisites

Before you begin, ensure you have [Yarn](https://yarnpkg.com/getting-started/install) installed. Make sure you have [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed before runnning this command:

```bash
npm install -g corepack
```

### Installation

To install the necessary dependencies, run:

```bash
yarn
```

### Running the App

Once the dependencies are installed, you can start the development server by running:

```bash
yarn dev
```

The app will now be running locally, and you can view it in your browser at localhost:3000.

## Backend

### Prerequisites

Before you begin, ensure you have [uv](https://docs.astral.sh/uv/) installed. We will be using uv as our package manager for the backend. uv can be installed by running:

```bash
brew install uv
```

### Installation
Before beginning with the installation, make sure you are in the backend directory by running:

```bash
cd backend
```


After installing uv, create a virtual environment using the following command:

```bash
uv venv --prompt hoagie-hacks --python 3.12.12 .venv
```

This creates a virtual environment named `hoagie-hacks` contained within the `.venv` directory. Activate the virtual environment with:

```bash
source .venv/bin/activate
```

To install the relevant backend depedencies, run:
```bash
uv sync
```

This will install all required backend dependencies in the virtual environment.

#### Running the app
```bash
uv run manage.py runserver
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
