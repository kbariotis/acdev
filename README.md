# AssetzCapital Test Submission - Kostas Bariotis

### Brief
#### Backend
The backend API is running on `http://localhost:3000`. You can run
`http://localhost:3000/currencies/` to test it.

I've used Express.js and [Sequelize ORM](http://docs.sequelizejs.com/) as the ORM.

I have included pagination from the Coinmarketcap endpoints that the frontend
is also taking advantage of. Having a client requesting an endpoint
that can potentialy contains millions of results, could be dangerous.

#### Frontend
I have cloned [React/Async](https://github.com/reactjs/redux/tree/master/examples/async)
example into the `frontend` folder and changed it to my needs.

I've used [Semantic UI](https://react.semantic-ui.com/addons/pagination#pagination-example-options) for the styling and for ready UI React components.

### Test
In a real world scenario, I would have write enough tests for the
backend as for the frontend too. I have restructured backend's
folders and files in such way, that would be easier to test individual
files as units.

Sequelize will allow me to connect it to SQLight, in order to run
my integration tests for a faster integrations test suite.

### Run

To run my code:

Start docker-compose:

`> docker-compose build`
`> docker-compose up -d`
`> docker-compose run backend /init-db.sh`

After it, the web application will be available on
[`https://localhost:3001`](https://localhost:3001).
