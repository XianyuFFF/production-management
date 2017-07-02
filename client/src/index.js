function component() {
  let element = document.getElementById('root')

  element.innerHTML = "This is client src index.jsaaaaa";
}

component();

if (module.hot) {
  module.hot.accept();
}