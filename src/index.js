import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

// This is a bit lame, but the kroger website must have some background loaders
// that stall the DOM event listener. So we'll just wait a couple seconds for
// the ProductDetails class before appending to hit.

setTimeout(() => {


    // Create a div to render the App component to.
    const app = document.createElement('div');

    // Set the app element's id to `root`. 
    // This name is the same as the element that create-react-app renders to by default 
    // so it will work on the development server too.
    app.id = 'custom-app-wrapper';

    // Get the element to prepend our app to from https://www.google.com. 
    // This could be a specific element on a website or something more general like `document.body`.
    const productDetails = document.querySelector('.ProductDetails');

    // Prepend the App to the viewport element in production if it exists on the page. 
    // You could also use `appendChild` depending on your needs.
    if (productDetails) {

        /** 
         * This is what we're building:
         * <div className="TabableContent-container">
                <ul className="TabableContent-tabs Tabs">
                    <li className="Tab is-selected">
                        <button type="button" className="Tab-button">
                            <span className="Tab-buttonText">Nutrition Info</span>
                        </button>
                    </li>
                </ul>
                <div className="TabableContent-content">
                  // content
                ...
            ...
        */
       
        var li = document.createElement('li');
        var button = document.createElement('button');
        var span = document.createElement('span');
        span.classList.add('Tab-buttonText');
        span.textContent = 'Nutrition Info';
        button.appendChild(span);
        button.classList.add('Tab-button');
        button.setAttribute('type', 'button');
        li.appendChild(button);
        li.classList.add('Tab');

        
        var container = document.querySelector('.TabableContent-container')
        
        // If there is already a tabbed content container
        if(container) {

            // TODO: Add nutrition info tab to already rendered tabbed content
            return;

            var ul = document.querySelector('.TabableContent-tabs');
            var content = document.querySelector('TabableContent-content');
            
        } else {

            container = document.createElement('div');
            container.classList.add('TabableContent-container');

            var ul = document.createElement('ul');
            ul.classList.add('TabableContent-tabs', 'Tabs');

            var content = document.createElement('div');
            content.classList.add('TabableContent-content');

            li.classList.add('is-selected');
            container.appendChild(ul);
            container.appendChild(content);
            productDetails.appendChild(container);
        }

        ul.appendChild(li);
        content.appendChild(app);

    }

    ReactDOM.render(<App />, app);
    //registerServiceWorker();

}, 2000);
