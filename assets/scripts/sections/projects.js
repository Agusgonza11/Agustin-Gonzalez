document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.project-tab-btn')
  const tabPanels = document.querySelectorAll('.project-tab-panel')

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-tab')
      tabButtons.forEach((btn) => btn.classList.remove('active'))
      tabPanels.forEach((panel) => {
        panel.classList.toggle('active', panel.getAttribute('data-tab') === tab)
      })
      button.classList.add('active')
    })
  })

  const lightbox = document.getElementById('project-lightbox')
  const lightboxImg = document.getElementById('project-lightbox-img')
  const lightboxClose = lightbox?.querySelector('.project-lightbox-close')

  const openLightbox = (src) => {
    if (!lightbox || !lightboxImg) return
    lightboxImg.src = src
    lightbox.hidden = false
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return
    lightbox.hidden = true
    lightboxImg.src = ''
    document.body.style.overflow = ''
  }

  document.querySelectorAll('.project-gallery-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openLightbox(trigger.getAttribute('data-full'))
    })
  })

  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox()
  })

  lightboxClose?.addEventListener('click', closeLightbox)

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox()
  })
})
