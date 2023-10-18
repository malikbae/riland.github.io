$(document).ready(function () {
  $.getJSON("./data/data.json", function (data) {
    let detail = data.detail;
    let id = getUrlParameter("id");

    function getUrlParameter(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    let selectedDetail = detail.find((item) => item.id == id);

    if (selectedDetail) {
      $(".jumbotron").css("background-image", "url(img/" + selectedDetail.hero + ")");
      $("#nama-destinasi").text(selectedDetail.nama);
      $("#deskripsi").text(selectedDetail.deskripsi);
      $("#lokasi").text("Lokasi : " + selectedDetail.lokasi);

      for (let i = 0; i < selectedDetail.img.length; i++) {
        let carouselItem = `
            <div class="carousel-item ${i === 0 ? "active" : ""}">
                <img src="img/${selectedDetail.img[i]}" class="d-block w-100" alt="Image ${i + 1}" />
            </div>`;

        $("#gallery").append(carouselItem);
      }

      for (let i = 0; i < selectedDetail.fasilitas.length; i++) {
        $("#fasilitas").append(`<li>${selectedDetail.fasilitas[i]}</li>`);
      }

      $("#map").attr("src", selectedDetail.map);

      $("#telp").text("No Hp/Whatsapp : " + selectedDetail.contact.telp);
      $("#email").text("Email : " + selectedDetail.contact.email);
      $("#nama-kontak").text(selectedDetail.contact.nama);
    }
  });
});
