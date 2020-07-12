<template>
  <section>
    <h1>Login</h1>
    <div v-if="loggingIn" class="text-center">
      <img src="../assets/doublering231px.svg" alt="loader-img">
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!loggingIn" @submit.prevent="login()">
      <div class="form-group">
        <label for="username">Username</label>
        <input
              v-model="user.username"
              type="text"
              class="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter a username" required>
          <h5 id="usernameHelp" class="form-text text-muted">
              Enter username to login.
          </h5>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            aria-describedby="passwordHelp"
            placeholder="Enter your password" required>
        <h5 id="passwordHelp" class="form-text text-muted">
            Enter password to login.
        </h5>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>

<script>
import Joi from 'joi';

const LOGIN_URL = 'http://localhost:5000/auth/login';

const schema = Joi.object().keys({ // validation schema
// eslint-disable-next-line
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
  password: Joi.string().trim().min(6).required(),
});

export default {
  data: () => ({
    loggingIn: false,
    errorMessage: '',
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    login() {
      this.errorMessage = '';
      if (this.validUser()) {
        // eslint-disable-next-line
        console.log('logginin');
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.loggingIn = true;
        fetch(LOGIN_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(body),
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((error) => {
            throw new Error(error.message);
          });
        }).then((result) => {
          localStorage.token = result.token;
          setTimeout(() => {
            // eslint-disable-next-line
            console.log(result);
            this.loggingIn = false;
            this.$router.push('/dashboard');
          }, 1000);
        }).catch((error) => {
          setTimeout(() => {
            // eslint-disable-next-line
            console.log(error);
            this.loggingIn = false;
            this.errorMessage = error;
          }, 1000);
        });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      if (result.error.message.includes('username')) {
        this.errorMessage = 'Username is invalid.';
      } else {
        this.errorMessage = 'Password is invalid.';
      }
      return false;
    },
  },
};
</script>
