function component() {
  let element = document.getElementById('root')

  element.innerHTML = "This is client src index.js ds10001";
}

component();

if (module.hot) {
  module.hot.accept();
}