<template>
  <div>
    <div class="container py-5">
      <div class="row">
        <div class="col-md-12">
          <h2 class="text-center text-white mb-4">Bootstrap 4 Login Form</h2>
          <div class="row">
            <div class="col-md-6 mx-auto">
              <!-- form card login -->
              <div class="card rounded-0">
                <div class="card-header">
                  <h3 class="mb-0">Login</h3>
                </div>
                <div class="card-body">
                  <form class="form" role="form" autocomplete="off" id="formLogin">
                    <div class="form-group">
                      <label for="uname1">Usuário</label>
                      <input type="text" class="form-control form-control-lg rounded-0"  v-model="usuario">
                    </div>
                    <div class="form-group">
                      <label>Senha</label>
                      <input type="password" class="form-control form-control-lg rounded-0" v-model="senha">
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                      <label class="form-check-label" for="defaultCheck1"> Lembrar me </label>  
                    </div>
                    <button class="btn btn-success btn-lg float-right" id="btnLogin"  v-on:click="login()">Login</button>
                  </form>
                </div>
                <!--/card-block-->
              </div>
              <!-- /form card login -->
            </div>
          </div>
          <!--/row-->
        </div>
        <!--/col-->
      </div>
      <!--/row-->
    </div>
    <!--/container-->
  </div>
</template>

<script>
export default {
 data() {
    return {
      errors:[],
      usuario: null,
      senha: null,
      message: '',
      cssClass: ''
    }
  },
  methods: {
    login: function() {
      console.info("login");
      if(this.usuario == 'teste' && this.senha == '123'){
          this.$router.push('/cliente');
      }else{
       this.message = "Dados inválidos"; 
       this.cssClass = "alert-danger col-sm-12";
      }
    }
          
  }
};

</script>


