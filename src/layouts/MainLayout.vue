<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

      
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">     
        <div class="text-h3 my-font">My TodoList</div>
      <div class="text-subtitle">{{todayDate}}</div>
    </div>
    <q-img class="header-image absolute-top" src="../assets/641.svg"/>
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 172.5px); margin-top: 172.5px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple to="/" exact>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/help" exact>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/about" exact>
              <q-item-section avatar>
                <q-icon name="link" />
              </q-item-section>

              <q-item-section>
                About
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top image" style="height: 172.5px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="80px" class="q-mb-sm">
              <img src="../assets/sobaka-v-kostjume-adidas-1-768x711.jpeg">
            </q-avatar>
            <div class="text-weight-bold">Vlaaad</div>
            <div>@email</div>
          </div>
        </q-img>
      </q-drawer>


    <q-page-container class="bg-blue-3">
      
      <router-view v-slot="{ Component }">
        <transition appear @enter="enter" mode="out-in">
          <keep-alive>
          <component :is="Component"/>
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import gsap from 'gsap'
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { date } from 'quasar'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {

    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      enter(el) {
        gsap.fromTo(
          el,
          {
            y: -100,
            opacity: 0,
          },
          {
            delay: 0.5,
            duration: 1,
            y: 0,
            opacity: 1,
          }
        );
      },
    }
  },

  computed: {
    todayDate() {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  }
})
</script>

<style lang="scss">

 .header-image{
  height: 100%;
  z-index: -1;
 }

.image{
  background-color: $primary;
}

</style>
