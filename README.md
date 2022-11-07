# Welcome to Patient Zero's Cheeseria Coding Challenge (For Juniors)

## Overview

This is a basic website of Cheese shopping cart.<br />
We can start selling cheese to the delight of our customers with a few more desired features. 
The backend server is using NodeJS and the frontend client is using ReactJS.<br />

Following are the features that have been added:

1. When clicking on a Cheese card, open a [Dialog](https://material-ui.com/components/dialogs/#dialog) that contains all the details of the card, including the item's **description**.

2. Add a **Purchase** button to the Cart (In the sliding view that opens when you click the 'Cart' button). Clicking on the **Purchase** button will send all items in the cart to the server (backend) and store them for later use.

3. Show all recently purchased items when clicking on the "Recent Purchases" button on the top left of the page. The recent purchases list is displayer in a Drawer. All the recent purchased items are retrieved from the server.

4. Add a UI automation test that performs the Purchase action you implemented as part of Feature #2. This test case is about adding two separate items to the cart and clicking on the **Purchase** button which is added as part of Feature #2. The automation test is performed by using Cypress.io tool-set.

5. Add a Dockerfile to create a Docker image for the project.

## Important Scripts

This project was tested with node v16.15.0 and npm v8.5.5.

In the project directory, you can run:

### `npm install`

To installs package dependencies (node v16.15.0). Then run:

### `npm start`

To build and run the app in the development mode.\
The browser will be automatically launched under [http://localhost:9000](http://localhost:9000).
The server backend will start listening on [http://localhost:3000](http://localhost:3000)

### Cypress.io

To run the test, you will open the e2e folder, then run following commands to get started

```bash
npm install
npm test
```

### Docker image

Before running the following commands, you need to have [Docker](https://docs.docker.com/get-docker/) installed if necessary.

To build the Docker image, you can run:

```bash
docker build -t pz-cheeseria .
```

Then to run the image, you can run:

```bash
docker run -p 9000:9000 pz-cheeseria
```

The browser will also be automatically launched under [http://localhost:9000](http://localhost:9000).
