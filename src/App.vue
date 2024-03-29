<template>
  <NavigaTion/> <router-view/>

   <!--  <router-link to="/">FileDownload</router-link> |
    <router-link to="/ProgressBar">ProgressBar</router-link> |
    <router-link to="/NewBar">NewBar</router-link> |
    <router-link to="/FileDrop">FileDrop</router-link> -->

  
</template>
<script>
import NavigaTion from "./components/NavigaTion";
export default{
  name: 'App',
  components:{
    NavigaTion,
  }
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
