
### What's this about?

This is a simple little project for React 16.8.3,
with the new React hooks API's.
You can see it running here: [https://bazzer588.github.io/hooky/](https://bazzer588.github.io/hooky/)

Hooks allow functional components to have state - this is very different to
the old class based model.
There are no classes in this project!
All the code is in functional components.

### What's the problem?

A common problem with React apps is that too much redrawing goes on, which slows down the
user experience.

Have a look at the demo with ReactDevTools and "Highlight updates" switched on, or
run it with the console open - when you edit a field you should see that only the
affected field and the address it belongs to are re-rendered.

An issue was raised concerning callback handling using the hooks API

See the discussion here:
https://github.com/facebook/react/issues/14099

And the documentation here:
https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback

### The gory details

  props flow down the tree, events trickle up 
  
*App* is the component in charge of state, it sends props down to...

*Address* is a component that accepts props, and renders a number of...

*InputField* components

There's a little bit of clever behavior in the *Address* component.
Different countries have slightly different behavior - try changing the country to see
 

### How do I run it myself?

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Full documentation here:
https://facebook.github.io/create-react-app/docs/available-scripts
