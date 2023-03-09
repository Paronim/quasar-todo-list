<template>
  <q-page class="bg-orange-3 column q-pa-lg">
    <div class="wrapper-content-todo">
    <h5>Todo</h5>
    <form @submit.prevent="addTusk()" class="flex q-mb-lg no-wrap items-center"> 
    <q-input standout="bg-orange-5 text-white" class="input-task" v-model="content" label="название задачи" />
    <q-btn type="submit" class="q-ma-sm image-button" round color="secondary" icon="navigation" :disabled="!content"/>
    </form>
    
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
  </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref } from "vue"


const content = ref() 

const tasks = ref([
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
      ])

    const addTusk = () => {
      console.log(tasks.value)
          tasks.value.push({
        title: content.value,
        done: false
      })
      content.value=""
    }
  
    const $q = useQuasar()

function deleteTask (index) {
  $q.dialog({
    title: 'Confirm',
    message: 'Вы действительно хотите удалить?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    tasks.value.splice(index, 1);
    $q.notify({
          message: 'Задача удалена',
          color: 'orange'
        })
  })
}

</script>

<style lang="scss">
.done{
  .q-item__label{
    text-decoration: line-through;
    color: rgb(53, 53, 53)
  }
}
.input-task{
  width: 95%;
}
.image-button{
  width: 56px;
  height: 56px;
}
.wrapper-content-todo{
  background: white;
  border-radius: 20px;
  padding: 25px;
}
</style>