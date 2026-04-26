const Alpha = window.Alpha

const vals = []

Alpha.state = {
  start: () => {
    document.querySelector('.h2').style.display = 'none'
    document.querySelector('.h3').style.display = 'none'
    document.querySelector('.h4').style.display = 'none'
    document.querySelector('.span').style.display = 'none'
    document.querySelector('.animi').style.display = 'none'
    
    return `
        <a href="/add" link class='btn btn-p'>
          Add Task
        </a>
        <a href="/show" link class='btn btn-p show'>
          Show Task
        </a>
        <a href="/delete" link class='btn btn-p delete'>
          Delete Task
        </a>
    `
  }
}

Alpha.routes = {
  '/add': () => {
    return `
      <input class='inp'>
      <button class='btn btn-s'>Add</button>
      <a href="/show" link class='btn btn-l'>
          Show Task
      </a>
      <a href="/delete" link class='btn btn-l'>
          Delete Task
      </a>
    `
  },
  '/show': () => {
    return `
      <div class="tasks-list">
        ${vals.length ? `<ul>${vals.map(v => `<li>${v}</li>`).join('')}</ul>` : 'مفيش تاسكات'}
      </div>
      <a href="/add" link class='btn btn-l'>Add Task</a>
      <a href="/delete" link class='btn btn-l'>Delete Task</a>
    `
  },
  '/delete': () => {
    return `
      <input class='inp two' placeholder='enter task name'>
      <button class='btn btn-s delete-btn'>
        Delete
      </button>
      <div class="error-msg"></div>
      <a href="/add" link class='btn btn-l'>Add Task</a>
      <a href="/show" link class='btn btn-l'>Show Task</a>
    `
  }
}

document.querySelector('.span').onclick = () => {
  let html = Alpha.state.start()
  document.body.insertAdjacentHTML('beforeend', html)
}

// جمعت الاتنين في listener واحد عشان أنضف
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-s') && !e.target.classList.contains('delete-btn')) {
    const val = document.querySelector('.inp').value.trim()
    if (val.length > 0) {
      vals.push(val)
      console.log(vals)
      document.querySelector('.inp').value = ''
      alert('اتضافت ✅')
    }
  }
  
  if (e.target.classList.contains('delete-btn')) {
    const val = document.querySelector('.two').value.trim()
    const errorDiv = document.querySelector('.error-msg')
    if (val.length > 0) {
      const index = vals.indexOf(val)
      if (index > -1) {
        vals.splice(index, 1)
        alert('اتمسحت ✅')
        document.querySelector('.two').value = ''
        errorDiv.innerHTML = ''
      } else {
        // التصليح هنا
        errorDiv.style.backgroundColor = '#f9f0f0'
        errorDiv.style.color = 'red'
        errorDiv.style.padding = '10px'
        errorDiv.style.width = '150px'
        errorDiv.style.height = '150px'
        errorDiv.style.boxShadow = '0 0 0 1px 2px #010101'
        errorDiv.style.fontSize = '25px'
        errorDiv.style.fontWhite = 'bold'
        errorDiv.style.fontFamily = 'serif'
        errorDiv.style.textShadow = '0 0 1px 1px #f901f8'
        errorDiv.style.borderRadius = '10px'
        errorDiv.innerHTML = 'Task is not defined'
      }
    }
  }
})

Alpha.render()
