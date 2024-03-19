## What is an API

API stands for Application Programming Interface.
An interface is a communicating and interacting port. An API serves as an interface to interact with an application. Generally, when we enter a URL in the browser, we send a request to the server with the URL. The server then responds with the appropriate data that we requested.
The schemes, designs, and usage methods vary depending on the APIs.

<br/>

## What is REST API

Among various API styles, REST API is the most widely used one since it's intuitive and easy to use. This is because it has somewhat established conventions and relies on the HTTP method.


### simple conventions of url for REST API

- Versioning, Pluralization, Resource Naming, Hierarchy, etc.
- Verbs should not be used in the endpoints since the URL doesn't express the intention; it only indicates what resource it is for.
  - The intention of the behavior on the resource should be conveyed by the HTTP method.
  - POST, GET, PUT, DELETE .etc

<br/>

## Even though these advantages of REST API ..

- It poses some issues namely, over-fetching and under-fetching
- `over-fetching`
  -  when the response provides more data than needed. It's not only inefficient but it can also be slower
- `under-fetching`
  - when the response offers less data than needed. To solve this problem, multiples requests can be made simultaneously. However, it can be unstable due to the possibility of the failure of one of them, and it can rather result over-fetching again.
- so the concept of GraphQL emerges to solve the issues that REST API holds.
