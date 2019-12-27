import './assets/styles/stylesheet.scss'

const APP = {
  page: '/home',
  search: {},
  container: null,
  caches: {},
  // setup configuration url
  set url(url) {
    let currentUrl = currentUrl.split('?')
    let currentPage = currentUrl[0]
    let currentSearch = {}
 
    if (typeof currentUrl[1] !== 'undefined') {
      currentSearch = new URLSearchParams(currentUrl[0])
    }

    this.page = currentPage
    this.search = currentSearch
  },
  // render content and run current page
  set render(content) {
    switch (this.page) {
      case '/home':
        content: import(/* webpackChunkName: "pageJS-home" */ './javascripts/page-home.js')
                  .then(function (jsPage) {
                    import(/* webpackChunkName: "pageHTML-home" */ './pages/home.html')
                      .then(function (contentPage) {
                        this.append(contentPage)
                        jsPage()
                      })
                  })
      break;
    }
  },
  // change current shown content
  set append(content) {
    if (this.container !== null) {
      this.container.style.display = 'none'
    }

    if (typeof this.caches[currentPage] === 'undefined') {
      this.caches[currentPage] = this.container.appendChild(content)
      this.container = this.caches[currentPage]
    } else {
      this.container = this.caches[currentPage]
      this.container.style.display = 'initial'
    }
  }
}

window.on('DOMContentLoaded', function () {
  APP.url(window.location.href)
})

window.on('load', function () {
  APP.render()
})
