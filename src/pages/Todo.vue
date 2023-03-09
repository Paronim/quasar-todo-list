<template>
  <q-page class="bg-orange-3 column q-pa-lg">
    <h5>Todo</h5>

    <q-list>
      <q-item tag="label"
      v-for="task in tasks"
      :key="task.title"
      v-ripple
      >
        <q-item-section avatar>
          <q-checkbox v-model="color" val="orange" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Orange</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>

export default{
  data() {
    return {
      tasks: [
        {
        title: "hi",
        done: false
        },
        {
        title: "h1",
        done: false
        },
        {
        title: "h2",
        done: false
        },
      ]
      
    }
  }

}

</script>
