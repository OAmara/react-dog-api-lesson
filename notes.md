REACT ENVIRONMENT VARIABLES:

https://create-react-app.dev/docs/adding-custom-environment-variables/

touch --> .env.development

note: you will need to stop and restart the 'npm start' create-react-app development environment/server to see this change.

The app now has a fetch call to get the dogs programmed, but it doesn't work
because of CORS!! 😡 

CORS (Cross-Origin Resource Sharing)
https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

BROWSERS implement this for security reasons

https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

To fix it you program your server to speak to certain clients that it recognizes

IOW: server uses HTTP headers and sometimes also a response to an OPTIONS request
to say who is allowed to connect and what they're allowed to do

install in flask server(NOT IN THE REACT APP): pip3 install flask_cors (dont forget to pip freeze > requirements.txt afterward)

SEMANTIC UI -- fun library of Graphical UI components that are very easy to use and customize...fun stuff
	-	https://react.semantic-ui.com/views/card/

To install it, 

`npm install semantic-ui-css semantic-ui-react`

Then `index.js`
Add this line
```js
import 'semantic-ui-css/semantic.min.css'
````
before this line
```js
import './index.css';
```