<template>
  <div>
    <h1>Dashboard</h1>
    <h2 v-if="!user">Getting user info...</h2>
    <h2 v-if="user">Hello, {{ user.username }}!!!</h2>
    <button @click="showForm = !showForm" class="btn btn-info">Add Note</button>
    <button @click="logout()" class="btn btn-primary">Logout</button>
    <form v-if="showForm" @submit.prevent="addNote()">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          v-model="newNote.title"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="titleHelp"
          placeholder="Enter title" required>
        <small id="titleHelp" class="form-text text-muted">Your note title.</small>
      </div>
      <div class="form-group">
        <label for="description">Note</label>
        <textarea
          v-model="newNote.note"
          class="form-control"
          id="description"
          rows="3"
          placeholder="Enter your note" required>
        </textarea>
      </div>
      <button type="submit" class="btn btn-success">Add Note</button>
    </form>
    <section class="row mt-3">
      <div class="col-6"
        v-for="note in notes"
        :key="note._id">
        <div class="card border-info mb-3">
          <div class="card-header">
            <h4 class="card-title">{{ note.title }}</h4>
          </div>
          <div class="card-body">
            <p class="card-text" v-html="renderMarkdown(note.note)"></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import MDemoji from 'markdown-it-emoji';

const md = new MarkdownIt();
md.use(MDemoji);

const API_URL = 'http://localhost:5000/';

export default {
  data: () => ({
    showForm: false,
    user: {},
    newNote: {
      title: '',
      note: '',
    },
    notes: [],
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`,
      },
    }).then((res) => res.json()).then((result) => {
      console.log(result);
      if (result.user) {
        this.user = result.user;
        this.getNotes();
      } else {
        this.logout();
      }
    });
  },
  methods: {
    renderMarkdown(note) {
      return md.render(note);
    },
    getNotes() {
      fetch(`${API_URL}api/v1/notes`, {
        headers: {
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json()).then((notes) => {
        this.notes = notes;
      });
    },
    addNote() {
      fetch(`${API_URL}api/v1/notes`, {
        method: 'POST',
        body: JSON.stringify(this.newNote),
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.token}`,
        },
      }).then((res) => res.json())
        .then((note) => {
          this.notes.push(note);
          this.newNote = {
            title: '',
            note: '',
          };
          this.showForm = false;
        });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.card {
  height: 90%;
}
.card-text img{
  width: 100%;
  height: 90%;
}
</style>
