import * as Turbo from "@hotwired/turbo"
import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import { Application } from "@hotwired/stimulus"
import MenuController from "./menu_controller"
import ViewImagesController from "./view_images_controller"
import NavtreeController from "./navtree_controller"
import ThemeController from "./theme_controller"
import Dropdown from 'stimulus-dropdown'

Alpine.data('handleSearch', () => ({
    searchOpen: false,
    openSearch() {
        this.searchOpen = true;
        document.body.classList.add('overflow-hidden');
        Alpine.nextTick(() => {
            this.$refs.searchInput.focus();
        })
    },
    closeSearch() {
        this.searchOpen = false;
        document.body.classList.remove('overflow-hidden');
    },
}))

window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.start()

const application = Application.start()
window.Stimulus = application
application.register('menu', MenuController)
application.register('view_images', ViewImagesController)
application.register('navtree', NavtreeController)
application.register('theme', ThemeController)
application.register('dropdown', Dropdown)

// Scrollspy
document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('[data-scrollspy-target]');
  const links = document.querySelectorAll('[data-scrollspy-link]');
  if (links.length < 1) return;
  const addActive = (i) => {
    const link = links[i] ? links[i] : links[0];
    link.classList.add('scrollspy-active');
  }
  const removeActive = (i) => {
    links[i].classList.remove('scrollspy-active');
  }
  const removeAllActive = () => [...Array(targets.length).keys()].forEach((link) => removeActive(link));
  const targetMargin = 100;
  let currentActive = 0;
  addActive(0);
  // listen for scroll events
  window.addEventListener('scroll', () => {
    const current = targets.length - [...targets].reverse().findIndex((target) => window.scrollY >= target.offsetTop - targetMargin) - 1;
    if (current !== currentActive) {
      removeAllActive();
      currentActive = current;
      addActive(current);
    }
  });
}, false);

