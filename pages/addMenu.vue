<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="card mt-5 rounded">
            <div class="position-relative bg-dark rounded border-0">
              <img src="~assets/images/res1.jpg" class="card-img-top fitImage" alt="..." style="height: 30vmin">
              <div class="position-absolute abs-center text-center w-100">
                <div class="font-weight-bold text-white h2">Add Menu For Ordering</div>
                <p class="text-white">Fill up info and menu for the restaurant you visit a lot!</p>
              </div>
            </div>
            <form class="p-3" @submit.prevent="submitForm">
              <div class="form-group">
                <label>Restaurant Name</label>
                <input v-model="menuForm.title" type="text" class="form-control" placeholder="Enter restaurant's name" required>
              </div>
              <div class="form-group">
                <label>Phone number</label>
                <input v-model="menuForm.phone" type="text" class="form-control" placeholder="Enter restaurant's phone number">
              </div>
              <div class="form-group">
                <label>Remarks about this restaurant</label>
                <textarea v-model="menuForm.remark" class="form-control" rows="3"/>
              </div>
              <div class="form-group">
                <label>Menu
                  <button type="button"
                          class="btn btn-primary"
                          @click="menuForm.items.push({
                            name: null,
                            price: null,
                            remark: null,
                          })">
                    Add item
                  </button>
                </label>
                <div class="row mb-2" v-for="item in menuForm.items">
                  <div class="col">
                    <input v-model="item.name" type="text" class="form-control" placeholder="Item">
                  </div>
                  <div class="col">
                    <input v-model.number="item.price" type="number" class="form-control" placeholder="price">
                  </div>
                  <div class="col">
                    <input v-model="item.remark" type="text" class="form-control" placeholder="remark">
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  import { mapState } from 'vuex'
  import axios from "axios";

  export default {
    data() {
      return {
        menuForm: {
          title: null,
          phone: null,
          remark: null,
          itemSize: 0,
          items: [{
            name: null,
            price: null,
            remark: null,
          },{
            name: null,
            price: null,
            remark: null,
          }],
        },
      }
    },
    computed: {
      ...mapState([
        'test1',
        'test2'
      ]),
      gt() {
        return this.$store.getters.getProductById();
      }
    },
    methods: {
      submitForm() {
        this.menuForm.items = this.menuForm.items.filter(item => (item.name) || (item.name === 0));
        this.menuForm.itemSize = this.menuForm.items.length;
        axios.defaults.headers.token = 'testToken';
        axios.post('http://127.0.0.1:8000/v1/menu', this.menuForm
        ).then(response => {
          console.log('response');
          console.log(response.data);
        }).catch(error => {
          console.log('error');
          console.log(error);
        });

        return false;
      }
    }
  }
</script>

<style scoped>
  .fitImage {
    object-fit: cover;
    height: 15vmin;
    opacity: 20%;
  }

  .abs-center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
