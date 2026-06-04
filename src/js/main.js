import '../styles/main.scss'
import $ from 'jquery'

$(document).ready(() => {
  const video = document.querySelector('.hero__video')
  const badges = document.querySelector('.badges')
  const templates = document.querySelector('section[aria-labelledby="templates-title"]')
  const templatesMedia = document.querySelector('.templates__media')
  if (!video || !badges || !templates || !templatesMedia) return

  const clamp01 = (v) => Math.min(1, Math.max(0, v))

  let ticking = false
  const update = () => {
    const ih = window.innerHeight

    // 1) Video stays at full opacity until the badges' top edge reaches the
    //    middle of the screen; then it fades to 0 by the time the badges
    //    reach the top of the viewport.
    const badgesTop = badges.getBoundingClientRect().top
    const fadeT = clamp01((ih * 0.5 - badgesTop) / (ih * 0.5))
    video.style.opacity = String(1 - fadeT)

    // 2) Templates image. It's position: fixed at the hero-video footprint
    //    (top: 5vh, height: 95vh — so its bottom is at viewport bottom = ih).
    //
    //    translateX slides it in from the left as the section enters from below.
    //    translateY stays at 0 while the section's bottom edge is still below
    //    the viewport bottom (there's "room" left in the section). Once the
    //    section's bottom climbs above the viewport bottom, translateY follows
    //    it upward so the image leaves the screen with the section.
    const tplRect = templates.getBoundingClientRect()
    const slideT = clamp01((ih - tplRect.top) / ih)
    const tx = -100 * (1 - slideT)
    const ty = Math.min(0, tplRect.bottom - ih)
    templatesMedia.style.transform = `translateX(${tx}%) translateY(${ty}px)`

    ticking = false
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update)
      ticking = true
    }
  }, { passive: true })

  window.addEventListener('resize', update, { passive: true })
  update()
})
