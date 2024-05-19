var typingEffect = new Typed(".multitext", {
  strings: ["Louisa", "Antonia", "Wulan", "Lolong"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  backDelay: 1000,
});

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("sticky", window.scrollY > 50);
});

const togglebar = document.querySelector(".toggle");
const menu = document.querySelector("ol");

function navToggle() {
  togglebar.classList.toggle("active");
  menu.classList.toggle("active");
}

document.querySelectorAll(".content .frame .box img").forEach((image) => {
  image.addEventListener("click", () => {
    const imageUrl = image.getAttribute("src");
    const popupImage = document.querySelector(".popup-image img");

    popupImage.setAttribute("src", imageUrl);
    document.querySelector(".popup-image").style.display = "block";
  });
});

document.querySelector(".popup-image span").addEventListener("click", () => {
  document.querySelector(".popup-image").style.display = "none";
});

const form = document.querySelector("form");
const statusTxt = form.querySelector(".inputbox span2");

form.onsubmit = (e) => {
  e.preventDefault();
  statusTxt.style.color = "#dc143c";
  statusTxt.style.fontFamily = "Arial, sans-serif";
  statusTxt.style.color = "#008000";
  statusTxt.style.display = "block";

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.responseText;
      if (
        response.indexOf("Harap isi semuanya !") != -1 ||
        response.indexOf("Masukkan Email dengan benar !") != -1 ||
        response.indexOf("Gagal mengirim pesan. Error: ") != -1
      ) {
        statusTxt.style.color = "red";
      } else {
        statusTxt.style.color = "green";
        form.reset();
        setTimeout(() => {
          statusTxt.style.display = "none";
        }, 3000);
      }
      statusTxt.innerText = response;
    }
  };
  let formData = new FormData(form);
  xhr.send(formData);
};
