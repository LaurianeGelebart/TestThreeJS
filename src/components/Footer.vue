<template>
  <footer id="Contacts" class="footer">
    <div class="itemsContainer">
    <p>&copy;Copyright 2024 | Lauriane Gélébart</p>
    <div class="linkBlock">
        <span title="Mon mail">
          <a target="_blank" href="mailto:laurianeglb@gmail.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" class="feather feather-mail">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        </span>
        <span title="Mon linkedin">
          <a target="_blank" href="https://fr.linkedin.com/in/lauriane-g%C3%A9l%C3%A9bart-b5893b1a2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-linkedin">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </span>
        <span title="Mon github">
          <a target="_blank" href="https://github.com/LaurianeGelebart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" class="feather feather-github">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </span>
      </div>
    </div>
  </footer>
</template>


<script>
export default {
  name: 'FooterPage'
}
</script>
  

<style scoped>
footer {
  margin: 0;
  background-color: var(--background-color-secondary);
  text-align: center;
  padding: 1rem 5rem;
  color: var(--text-secondary-color);
  font-size: 1rem;
  display: flex !important;
  justify-content: right;
}

.itemsContainer{
  width: 55%;
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.linkBlock {
  width: auto;
}

footer a {
  color: var(--text-secondary-color);
}

footer a:hover {
  color: var(--accent-color-hover);

}

.feather {
  width: 2rem;
  font-size: 5rem;
  padding: 0 1rem;
  transition: 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0);
}

.feather:hover svg {
  stroke: var(--accent-color-hover);
  fill: var(--accent-color-hover);
}


@media screen and (max-width: 1024px) {
  footer {
    padding: 2rem 1rem;
    flex-direction: column;
  }
}

@media screen and (max-width: 768px) {}
</style>