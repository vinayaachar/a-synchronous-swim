(function () {
  const serverUrl = 'http://127.0.0.1:3000';

  var getRandomDirection = (callback) => {
    $.ajax({
      type: 'GET',
      url: serverUrl + '/',
      // cache: false,
      // contentType: 'text/html',
      success: (data) => {
        callback(data);
      }
    });
  }

  //GET for background image
  var getBackgroundImage = (callback) => {
    $.ajax({
      type: 'GET',
      url: serverUrl + '/background.jpg',
      dataType: 'image/jpg',
      success: (data) => {
        console.warn('yellow', data);
        $('.pool').append(data);
      },
      error: (error, status, exception) => {
        console.warn(status, exception);
        console.error('Failed to get background image:', error);
      }
    });
  }

  getBackgroundImage();

  // setInterval(() => {
  //   getRandomDirection((direction) => { SwimTeam.move(direction); });
  // }, 10000);

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'FILL_ME_IN',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
