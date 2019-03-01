<template>
  <div>
      <div class="col-md-12 txtBox">
        <br>
          <h4>Cadastro de Clientes</h4>
          <div class="alert alert-danger" v-if="errors.length" role="alert">
            <h4 class="alert-heading">OPS!</h4>
            <p>Antes de salvar verifique o(s) seguinte(s) campo(s) .</p>
            <hr>
            <p class="mb-0" v-for="(error, index) in errors" :key="index">{{ error }} </p>
          </div>
          <br>
          <div class="alert" :class="cssClass" role="alert"  v-if="message && !errors.length">
            {{message}}
          </div>
          <form>
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="codigo">Nome</label>
                <input type="text" class="form-control uppercase" v-model="cliente.nome" maxlength="80">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="descricao">Email</label>
                <input type="text" class="form-control" v-model="cliente.email" maxlength="60">
              </div>
              <div class="form-group col-md-4">
                <label for="codigo">Telefone</label>
                <input type="text" class="form-control uppercase" v-mask="'(##) #####-####'" v-model="cliente.telefone" maxlength="15">
              </div>
              <div class="form-group col-md-4">
                <label for="descricao">Sexo</label>
                <select class="form-control" v-model="cliente.sexo">
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
            </div>
          </form>  
          <br>
          <div class="form-row">
            <button type="button" rel="tooltip" class="btn btn-primary"  v-if="!isEdicao" @click="checkForm()">Incluir</button>
            <button type="button" rel="tooltip" class="btn btn-success" v-if="isEdicao"  v-on:click="checkForm()">Atualizar</button>&nbsp;
            <button type="button" class="btn btn-secondary" v-on:click="cancelar()">Cancelar</button>&nbsp;
         </div> 
         <br>
         <div class="form-row">
            <div  v-if="totalElements">
              Total de {{totalElements}} registros encontrado(s) | Página {{number  + 1}} de {{totalPages}} 
            </div>
            <table id="gridCliente" class="table">
              <thead>
                  <tr v-if="loader.hasCliente">
                  <td class="text-center" colspan="3">Carregando <img src="../assets/loading.svg" alt="Carregando"></td>
                </tr>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Sexo</th>
                  <th width="140">Ação</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!totalElements">
                  <td colspan="5">Nenhum Cliente encontrado</td>
                </tr>
                <tr v-for="(cliente,index) in clientes" :key="index">
                  <td>{{ cliente.nome }}</td>
                  <td>{{ cliente.email }}</td>
                  <td>{{ cliente.telefone }}</td>
                  <td>{{ cliente.sexo == "M" ? "Masculino" : "Feminino" }}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button type="button" rel="tooltip" class="btn btn-primary" @click="getCliente(cliente)">Editar</button>&nbsp;&nbsp;
                      <button type="button" rel="tooltip" class="btn btn-danger"  @click="removeCliente(cliente)">Excluir</button>
                    </div>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
          <div id="paginacao"  v-if="totalElements">
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center pagination-sm">
                  <li class="page-item">
                    <a class="page-link" v-if="number > 0" v-on:click="changePage(number-1)">Anterior</a>
                  </li>
                  <li class="page-item" v-for="(totalPages, index) in totalPages" :key="index" :class="{active :index==number}">
                    <a class="page-link" v-on:click="changePage(index)">{{index + 1}}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" v-if="!last" v-on:click="changePage(number+1)">Proxima</a>
                  </li>
                </ul>
              </nav>
          </div>
      </div>
  </div>     
</template>

<script>
import ClienteService from '../services/ClienteService'
export default {
  data() {
    return {
      cssClass: "alert-success",
      isEdicao: false,
      errors: [],
      message: null,
      totalPages: null,
      totalElements: null,
      last: null,
      first: null,
      size: null,
      number: null,
      cliente: {id:null,nome:null,email:null,telefone:null,sexo:null},
      clientes: [],
      clienteSelecionado:{id:null,nome:null,email:null,telefone:null,sexo:null},
      loader: {
         hascliente: false
      }
    };
  },
  mounted() {
    this.getClientes();
  },
  methods: {
    async getClientes () {
      const response = await ClienteService.getClients()
      this.paginacao(response)
    },
    async changePage (number) {
      const response = await ClienteService.changePage(number)
      this.paginacao(response)
    },
    async addCliente () {
      const response = await ClienteService.addClient(this.cliente)
      this.reloadPage("Cliente incluido com sucesso","alert-success col-sm-12")
      this.limpar()
    },
    async updateCliente () {
      const response = await ClienteService.updateClient(this.clienteSelecionado)
      this.reloadPage("Cliente alterado com sucesso","alert-success col-sm-12")
      this.limpar()
    },
    async removeCliente (cliente) {
      const response = await ClienteService.removeClient(cliente.id)
      this.reloadPage("Cliente excluido com sucesso","alert-success col-sm-12")
    },
    async getCliente (cliente) {
      this.message = null
      const response = await ClienteService.getClient(cliente.id)
      this.cliente = response.data
      this.isEdicao = true
      this.montaPK(this.cliente)
    },
    reloadPage(msg,css){
      this.getClientes()
      this.message = msg
      this.cssClass = css
    },
    montaPK(cliente){
      this.clienteSelecionado = cliente; 
    },
    paginacao(response) {
      this.clientes = response.data.content
      this.totalPages = response.data.totalPages
      this.size = response.data.size
      this.number = response.data.number
      this.last = response.data.last
      this.first = response.data.first
      this.totalElements = response.data.totalElements
    },
    resetPaginacao(response) {
      this.clientes = []
      this.totalPages = null
      this.size = null
      this.number = null
      this.last = null
      this.first =null
      this.totalElements = null
    },
    cancelar() {
      this.message = null
      this.errors= []
      this.limpar()
      this.getClientes()
    },
    limpar() {
      this.isEdicao = false
      this.cliente.id = null
      this.cliente.nome = null
      this.cliente.email = null
      this.cliente.telefone = null
      this.cliente.sexo = null
    },
    checkForm() {
      if (this.cliente.nome && this.cliente.email && this.cliente.telefone && this.cliente.sexo) {
        if (!this.isEdicao) {
          this.addCliente();
        } else {
          this.updateCliente();
        }
      }
      this.errors = [];
      if (!this.cliente.nome) this.errors.push("Nome Obrigatorio");
      if (!this.cliente.email) this.errors.push("Email Obrigatorio");
      if (!this.cliente.telefone) this.errors.push("Telefone Obrigatorio");
      if (!this.cliente.sexo) this.errors.push("Sexo Obrigatorio");
    } 
  }
};
</script>

