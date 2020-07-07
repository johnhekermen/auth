<template>
  <div>
    <h1>Signup</h1>
        <form @submit.prevent="signup">
        <div class="form-group">
            <label for="username">Username</label>
            <!-- eslint-disable-next-line max-len -->
            <input
                v-model="user.username"
                type="text"
                class="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter a username" required>
            <h5 id="usernameHelp" class="form-text text-muted">
                Username must be longer than 2 characters and shorter than 30.
            </h5>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="password">Password</label>
                <input
                    v-model="user.password"
                    type="password"
                    class="form-control"
                    id="password"
                    aria-describedby="passwordHelp"
                    placeholder="Password" required>
                <h5 id="passwordHelp" class="form-text text-muted">
                    Password must be longer than 10 characters.
                </h5>
            </div>
            <div class="form-group col-md-6">
                <label for="confirmPassword">Confirm</label>
                <input
                    v-model="user.confirmPassword"
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    aria-describedby="confirmPasswordHelp"
                    placeholder="Confirm password" required>
                <h5 id="confirmPasswordHelp" class="form-text text-muted">
                    Please confirm your password.
                </h5>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
       </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  }),
  methods: {
    signup() {
      // eslint-disable-next-line
      console.log('form submitted');
    },
  },
};
</script>
