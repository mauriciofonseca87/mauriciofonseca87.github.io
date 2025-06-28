$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            // const key = "Ka4whKRu(257hf.t";
            // const iv = "2pgZyy5K+SZ55_Lp";

            // Constants Indimacol
            const host = "mail.indimacol.com";
            const port = 8889;
            const enablessl = false;
            const from = "mauricio.fonseca@indimacol.com";
            // const password = AesEncryptor.encrypt("putPasswordHere", key, iv);
            const password = "/YmjbBwapVCuQGaYqG1oRA==";
            const to = ["mauricio.fonseca04@hotmail.com"]
            const subject = $("input#subject").val();

            // Body
            const body = "<h2>Nuevo mensaje desde el formulario de contacto</h2><p><strong>Nombre: </strong>" + $("input#name").val() + "</p><p><strong>Email: </strong>" + $("input#email").val() + "</p><p><strong>Mensaje: </strong></p><p> " + $("textarea#message").val() + "</p>";

            let $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            const dataToSend = {
                host: host,
                    port: port,
                    enablessl: enablessl,
                    from: from,
                    password: password,
                    to: to,
                    subject: subject,
                    body: body
            };

            $.ajax({
                url: "https://indimacol.com/IndimacolAPI/api/contact/SentEmailWithParameters",
                type: "POST",
                data: JSON.stringify(dataToSend),
                contentType: 'application/json',
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
