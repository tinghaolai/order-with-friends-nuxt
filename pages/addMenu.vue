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
                <input type="text" class="form-control" placeholder="Enter restaurant's name" required>
              </div>
              <div class="form-group">
                <label>Phone number</label>
                <input type="text" class="form-control" placeholder="Enter restaurant's phone number">
              </div>
              <div class="form-group">
                <label>Menu
                  <button type="button" class="btn btn-primary" @click="menuForm.items.push({})">Add item</button>
                </label>
                <div class="row mb-2" v-for="item in menuForm.items">
                  <div class="col">
                    <input type="text" class="form-control" placeholder="Item">
                  </div>
                  <div class="col">
                    <input type="number" class="form-control" placeholder="price">
                  </div>
                  <div class="col">
                    <input type="text" class="form-control" placeholder="comment">
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
<!--          <div class="font-weight-bold text-info h4">Restaurant Info</div>-->

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
          items: [{

          },{

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
        console.log('submitted');
        axios.get('http://127.0.0.1:8000/v1/line').then(response => {
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
