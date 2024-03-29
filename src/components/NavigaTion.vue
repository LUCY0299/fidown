<template>
  <header :class="{'scrolled-nav': scrollPosition }">
    <nav>
      <div class="branding">
        <img src="@/assets/stand.png" alt="">
      </div>
      <ul v-show="!mobile" class="navigation">
        <li :class="{ active: currentRouteName === 'FileDownload'}">
          <router-link class="link" :to="{ name: 'FileDownload' }">
            <i class="fa-solid fa-download fa-fade"></i>FileDownload
          </router-link>
        </li>
        <li :class="{ active: currentRouteName === 'ProgressBar'}">
          <router-link class="link" :to="{ name: 'ProgressBar' }">
            <i class="fa-solid fa-tags fa-fade"></i>ProgressBar
          </router-link>
        </li>
        <li :class="{ active: currentRouteName === 'NewBar'}">
          <router-link class="link" :to="{ name: 'NewBar' }">
            <i class="fa-solid fa-right-to-bracket fa-fade"></i>NewBar
          </router-link>
        </li>
        <li :class="{ active: currentRouteName === 'FileDrop'}">
          <router-link class="link" :to="{ name: 'FileDrop' }">
            <i class="fa-solid fa-arrow-up-from-bracket fa-fade"></i>FileDrop
          </router-link>
        </li>
      </ul>


      <div class="icon" v-if="mobile" @click="toggleMobileNav">
        <i class="fa-solid fa-bars" style="color: #000000;" :class="{ 'icon-active': mobileNav }"></i>
      </div>


      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li :class="{ active: currentRouteName === 'FileDownload'}">
          <router-link class="link" :to="{ name: 'FileDownload' }" @click="toggleMobileNav">
            <i class="fa-solid fa-download fa-fade"></i>FileDownload
          </router-link>
        </li>
        <li :class="{ active: currentRouteName === 'ProgressBar'}">
          <router-link class="link" :to="{ name: 'ProgressBar' }" @click="toggleMobileNav">
            <i class="fa-solid fa-tags fa-fade"></i>ProgressBar
          </router-link>
        </li>
        <li :class="{ active: currentRouteName === 'NewBar'}">
          <router-link class="link" :to="{ name: 'NewBar' }" @click="toggleMobileNav">
            <i class="fa-solid fa-right-to-bracket fa-fade"></i>NewBar
          </router-link>
        </li>
        <li :class="{ active: currentRouteName === 'FileDrop'}">
          <router-link class="link" :to="{ name: 'FileDrop' }" @click="toggleMobileNav">
            <i class="fa-solid fa-arrow-up-from-bracket fa-fade"></i>FileDrop
          </router-link>
        </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted} from 'vue';
import { useRoute } from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.min.css';

const route = useRoute();
const mobileNav = ref(false);
const mobile = ref(window.innerWidth <= 750);
const scrollPosition = ref(0);

// 这里不再需要created生命周期，使用onMounted替代
onMounted(() => {
  window.addEventListener('resize', checkScreen);
  window.addEventListener('scroll', updateScroll);
});

// 使用onUnmounted来清理
onUnmounted(() => {
  window.removeEventListener('resize', checkScreen);
  window.removeEventListener('scroll', updateScroll);
});

const checkScreen = () => mobile.value = window.innerWidth <= 750;
const updateScroll = () => scrollPosition.value = window.scrollY;
const toggleMobileNav = () => mobileNav.value = !mobileNav.value;

const currentRouteName = computed(() => route.name);
</script>

<style lang="scss" scoped>

header{
  background-color: rgba(138, 168, 194, 0.685);
  z-index: 99;
  width: 100%;
  position: fixed;
  transition: 0.5 ease all;
  margin:0 auto;
  color: #fff;
  box-shadow: 10px 10px 10px rgba(0,0,0,0.1);

  nav{
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 0.5px 0;
    transition: 0.5s ease all;
    width: 90%;
    margin:0 auto;
    @media (min-width: 1140px){
      max-width: 1140px;
    }

    ul,
    .link{
      font-weight: 700;
      color: #fff;
      list-style: none;
      text-decoration: none;
    }

    li{
      padding: 16px;
      margin-left:16px;
    }

    .link{
      font-size: 16px;
      transition: .5s ease all;
      padding-bottom: 8px;
      border-bottom: 1px solid transparent;
      color: #2b2929;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 12px;
      margin: 0;


      i{
        margin-right: 10px;
      }

      
      transition: background-color 0.3s ease, color 0.3s ease;
      &:hover {
        background-color: #062a3f91;
        color: #fff; 
        border-radius: 8px;
        
        i {
          color: #b5e9f8; 
          border-color: #00afea;
        }
      }
    }
    .branding{
      display: flex;
      align-items: center;

      img{
        width: 50px;
        transition: .5s ease all;
      }
    }
    .navigation{
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
      li.active{
        .link{
          background-color: #06081d91;
          color: #fff; 
          border-radius: 8px;
          
          i {
            color: #b5e9f8; 
          }
        }
      } 
    }

    .icon{
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;

      i{
        cursor: pointer;
        font-size: 24px;
        transition: .8s ease all;
      }
    }

    .icon-active{
      transform: rotate(180deg);
    }

    .dropdown-nav{
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 190px;
      height: 100%;
      background-color: rgb(113, 137, 158 ,0.9);
      box-shadow: 10px 10px 10px rgba(0,0,0,0.1);
      
      top: 0;
      left: 0;

      li.active{
        .link{
          background-color: #06081d91;
          color: #fff; 
          border-radius: 8px;
          
          i {
            color: #b5e9f8; 
          }
        }
      } 
      li{
        margin-left: 0;
      

        .link{
          color: #fff;
          display: flex;
          align-items: center;
          text-align: left;
          i{
            margin-right: 10px;
          }

          padding: 14px;
          margin: 0;
          transition: background-color 0.3s ease, color 0.3s ease;
          &:hover {
            background-color: #06081d91;
            color: #fff; 
            border-radius: 8px;
            
            i {
              color: #b5e9f8; 
            }
          }
        }
      }
    }

    
    .mobile-nav-enter-active,
    .mobile-nav-leave-active{
      transition: 1s ease all;
    }

    .mobile-nav-enter-from,
    .mobile-nav-leave-to{
      transform: translateX(-250px);
    }

    .mobile-nav-enter-to{
      transform: translateX(0);
    }
  }

}


</style>