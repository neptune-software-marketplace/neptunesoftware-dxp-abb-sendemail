try {
    if (!req.body) {
        return;
    }

    var user = req.user.username;
    var html;
    var idTemplate;
    var subject;
    var toEmail;
    var fromEmail;
    var values;
    var attachments;
    var cc;
    var bcc;

    //Validations
    if (!req.body.toEmail) {
        throw "No receiver e-mail";
    } else {
        toEmail = req.body.toEmail;
    }

    if (req.body.html) { html = req.body.html; }

    if (!req.body.fromEmail) {
        //Add a default e-mail address to be used by your P9 system
        fromEmail = "support@neptune-software.com";
    } else {
        fromEmail = req.body.fromEmail;
    }

    if (req.body.idTemplate) { idTemplate = req.body.idTemplate; }
    if (req.body.values) { values = req.body.values; }

    if (!req.body.idTemplate && !req.body.html) {
        throw "E-mail has no template or body";
    }

    if (!req.body.idTemplate && !req.body.subject) {
        throw "No subject in e-mail";
    } else {
        subject = req.body.subject;
    }

    if (req.body.attachments) { attachments = req.body.attachments; }
    if (req.body.cc) { cc = req.body.cc; }
    if (req.body.bcc) { bcc = req.body.bcc; }

    //Trigger e-mail send
    await sendEmail(toEmail, subject, html, fromEmail, idTemplate, values, attachments, cc, bcc);

    result = {
        "status": "Success"
    };

    log.info("Success");

    complete();

} catch (error) {
    log.error("Error in email send: ", error);
    result = {
        "status": "Error",
        "message": error
    }
    log.info("Error");
    return fail(result);
}


