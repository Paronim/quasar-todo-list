<template>
  <q-page class="bg-orange-3 column q-pa-lg">
    <h5>Todo</h5>

    <q-list 
    separator
    bordered
    >
      <q-item 
      @click="task.done = !task.done"
      clickable
      :class="{'done bg-green-4': task.done}"
      v-for="(task, index) in tasks"
      :key="task.title"
      v-ripple
      >
        <q-item-section avatar>
          <q-checkbox
          class="no-pointer-events"
          v-model="task.done" 
          val="orange" 
          color="primary" 
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section
        v-if="task.done"
        side
        >
        <q-btn 
        @click.stop="deleteTask(index)"
        outline round color="red" icon="delete" />
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
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1)
    }
  }

}

</script>

<style lang="scss">
.done{
  .q-item__label{
    text-decoration: line-through;
    color: rgb(53, 53, 53)
  }
}
</style>