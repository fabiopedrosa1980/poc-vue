<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary"  v-if='this.$route.name!="Login"'>
      <a class="navbar-brand" href="#">POC VUE</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link tag="li" to="/cliente">
              <a class="nav-link" href="#">Cliente</a>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
          <router-link tag="li" to="/">
            <a class="nav-link" href="#">Logout</a>
          </router-link>
      </ul>
    </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/");
    }
  }
};
</script>

