<template>
  <q-page class="column q-pa-lg main-todo">
    <div class="wrapper-content-todo">
    <h5>Todo</h5>
    <form @submit.prevent="addTusk()" class="flex q-mb-lg no-wrap items-center"> 
    <q-input standout="bg-blue-5 text-white" class="input-task" v-model="newTodoContent" label="Task name" />
    <q-btn type="submit" class="q-ma-sm image-button" round color="secondary" icon="navigation" :disabled="!newTodoContent"/>
    </form>
    
    <div class="no-task flex column items-center" v-if="noTask">
      <q-icon name="check" size="100px" color="primary"/>
      <div class="text-h4 text-weight-bold text-primary font-style">No Tasks!</div>
    </div>

    <div class="flex justify-center" v-if="noTaskForLoad">
      <img src="../assets/load.gif">
    </div>

    <q-list 
    separator
    bordered
    >

    <transition-group name="list">
      <q-item 
      @click="toggleDone(task.id)"
      clickable
      :class="{'done bg-green-4': task.done}"
      v-for="task in tasks"
      :key="task.id"
      v-ripple
      >
      
        <q-item-section avatar>
          <q-checkbox
          class="no-pointer-events"
          v-model="task.done" 
          val="blue" 
          color="primary" 
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.content }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.date }}</q-item-label>
        </q-item-section>
        <q-item-section
        v-if="task.done"
        side
        >
        <q-btn 
        @click.stop="deleteTask(task)"
        outline round color="red" icon="delete" />
        </q-item-section>
      </q-item>
    </transition-group> 
    </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, onMounted } from "vue"
import { db } from '../firebase'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";

// fb ref
const tasksCollectionsRef = collection(db, "todos-quasar")
const tasksCollectionsQuery = query(tasksCollectionsRef, orderBy("date", "desc"));

// todo
const tasks = ref([]);
const noTask = ref(false)
const noTaskForLoad = ref(true)
// get todo 
onMounted( () => {
onSnapshot(tasksCollectionsQuery, (querySnapshot) => {
  const fbtasks = [];
  
  querySnapshot.forEach((doc) => {
    let date = new Date(doc.data().date)
      const task = {
    id: doc.id,
    content: doc.data().content,
    date: date.toDateString(),
    done: doc.data().done
    };
    fbtasks.push(task)
    });
    tasks.value = fbtasks
    if(tasks.value.length === 0){
      noTask.value = true
      noTaskForLoad.value = false
    } else {
      noTask.value = false
      noTaskForLoad.value = false
    }
    });
  })

  // add todo 
  const newTodoContent = ref("") 

  const addTusk = () => {
    if(newTodoContent.value.trim() === ""){
      $q.notify({
          message: `Enter the name of the task`,
          color: 'red'
        })
  } else 
    if(tasks.value.some(el => el.content.toLowerCase().trim() === newTodoContent.value.toLowerCase().trim())){
      $q.notify({
          message: `The task with the title \"${newTodoContent.value}\" already exists`,
          color: 'red'
        })
    } else
     {
      addDoc(tasksCollectionsRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now() 
    });
    newTodoContent.value = "";
    }
  }
  
    const $q = useQuasar()

// delete todo
function deleteTask (task) {
  $q.dialog({
    content: 'Confirm',
    message: 'Do you really want to delete?',
    ok: {
      push: true
    },
    cancel: {
      push: true,
      color: 'negative'
    },
    persistent: true
  }).onOk(() => {
    deleteDoc(doc(tasksCollectionsRef, task.id));
    $q.notify({
          message: `The task with the header \"${task.content}\" has been deleted`,
          color: 'blue'
        })
  })
}

// toggle todo 
const toggleDone = (id) => {
  const index = tasks.value.findIndex(task => task.id === id);

  updateDoc(doc(tasksCollectionsRef, id), {
  done: !tasks.value[index].done
});
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
  width: 100%;
}
.image-button{
  width: auto;
  height: auto;
}
.wrapper-content-todo{
  background: white;
  border-radius: 20px;
  padding: 25px;
}
.main-todo{
  background: rgba(255, 0, 0, 0);
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
.no-task{
  opacity: 0.2;

}
</style>