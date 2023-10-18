$.getJSON("./data/data.json", function (data) {
  let destinasi = data.destinasi;
  let itemsPerRow = 4;
  let rowsPerPage = 2; // Banyak baris data dalam satu halaman
  let currentPage = 1;

  function renderDestinasi(page) {
    $(".explore .container").empty();

    let h1Element = $("<h1></h1>")
      .addClass("display-5 text-dark text-center mb-5")
      .text("Semua Objek Wisata");

    $(".explore .container").append(h1Element);

    let start = (page - 1) * rowsPerPage * itemsPerRow;
    let end = start + rowsPerPage * itemsPerRow;
    let rowData = destinasi.slice(start, end);

    for (let i = 0; i < rowsPerPage; i++) {
      let row = $('<div class="row justify-content-center mb-5"></div>');

      $.each(
        rowData.slice(i * itemsPerRow, (i + 1) * itemsPerRow),
        function (j, item) {
          let cardHtml = `
            <div class="card shadow mt-3" style="width: 15rem">
              <img src="img/${item.gambar}" class="card-img-top" alt="..." />
              <div class="card-body">
                <p class="card-text">
                  <small class="text-body-secondary">${item.daerah}</small>
                </p>
                <h3>${item.nama}</h3>
                <p class="card-text">${item.deskripsi}</p>
                <hr />
                <a href="detail.html?id=${item.id}" class="btn btn-dark btn-block" style="background-color: #1e194d">
                  Jelajahi Destinasi <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
        `;

          row.append(cardHtml);
        }
      );

      $(".explore .container").append(row);
    }
  }

  function updatePagination() {
    $(".pagination .page-item").not(":first, :last").remove();

    let totalPages = Math.ceil(destinasi.length / (itemsPerRow * rowsPerPage));

    // Tombol Previous
    let prevPageItem = $(".pagination .page-item:first");
    prevPageItem.off("click");
    prevPageItem.on("click", function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        renderDestinasi(currentPage);
        updatePagination();
      }
    });

    for (let i = 1; i <= totalPages; i++) {
      let pageItem = $("<li class='page-item'></li>");
      let pageLink = $(`<a class='page-link' href='#'>${i}</a>`);

      pageLink.on("click", function (e) {
        e.preventDefault();
        currentPage = i;
        renderDestinasi(currentPage);
        updatePagination();
        $(this).parent().addClass("active");
      });

      pageItem.append(pageLink);
      $(".pagination .page-item:last").before(pageItem);
      if (i === currentPage) {
        pageLink.addClass("active");
      }
    }

    // Tombol Next
    let nextPageItem = $(".pagination .page-item:last");
    nextPageItem.off("click");
    nextPageItem.on("click", function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        renderDestinasi(currentPage);
        updatePagination();
      }
    });
  }

  renderDestinasi(currentPage);
  updatePagination();
});
