<h3>Basic Nest API</h3>
<p>A basic nest api with authetication</p>


<p>To run the app</p>
<p>Clone the repo and run</p>
<code>npm install</code>
Move the content of env.example to a .env file

update the mongo url with your own mongodb url

<p>To run the container</p>
<code>docker build -t app</code>

update the information in the compose.yaml file and also the .env file
<code>docker compose up</code>


<code>docker run app</code>


<ol>
  <li>
POST /auth/register: Register a new user.
  </li>
  <li>
POST /auth/login: Authenticate a user and return a JWT.
  </li>
  <li>
GET /users: Get all users (protected).
  </li>
  <li>
GET /users/:id: Get user by ID (protected).
  </li>
  <li>
PUT /users/:id: Update user by ID (protected).
  </li>
  <li>
DELETE /users/:id: Delete user by ID (protected).
  </li>
</ol>