

window.onload = async () => {
  showContent("#portfolio-pages");
}

function showContent(templateid) {
  var temp = document.querySelector(templateid);
  var placeholder = document.getElementById("placeholder");
  const clone = temp.content.cloneNode(true);
  placeholder.innerHTML = ' ';
  placeholder.appendChild(clone);

  if (templateid === "#play-tetris") {
    const canvas = document.getElementById('board');
    const canvasNext = document.getElementById('next');
    const lbButton = document.getElementById('lbButton');
    tetris = new Tetris(canvas, canvasNext, lbButton);
    tetris.play();
  }
  else if (templateid == "#portfolio-pages") {
    tabcontent = document.getElementsByClassName("job-panel-div");
    tablinks = document.getElementsByClassName("job-tab-item");
  }

  tabcontent = document.getElementsByClassName("job-panel-div");
  tablinks = document.getElementsByClassName("job-tab-item");

}
