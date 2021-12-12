# Eat & Share Frontend

The frontend consists of a simple CRA single page application. It uses React, Tailwindcss for the styling and other libraries (you can consult the `package.json` if you're interested).

## Running the app

To run this app you must install NodeJS on your computer and the *yarn* package manager. If you're lazy *npm* should suffice as well.

```sh
yarn install # Install the dependencies
yarn start # Run the app in dev mode
```

After this you should be able to go to `localhost:8080` and access the React app :)

## What's not done

Much of this app is just a mock... A very simple mock... Like so simple I've created 2 states to do the search, one for the country and another for the ingredient. 

Like, we are humans, we have lives besides the school, and we have other assignments as well. We can't be expected to produce something decent within the given timeframe, specially when only one member of the group is comfortable with the tech stack. So my apologies for the horrible code, and lack of functionality you may find while navigating through this app.

If we have time, we'll try to improve this app and take it to a semi-production level, with integration to the almost-completed backend we've developed.


### Some quirks:

- The search sorting (by most popular, etc...) is not done
- The image functionality is not working (no uploads, no galleries, no everything related to images :[ )