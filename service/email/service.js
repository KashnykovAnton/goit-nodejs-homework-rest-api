import Mailgen from "mailgen";

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "http://f755-188-163-49-200.ngrok.io/";
        // this.link = "http://localhost:3000/";
        break;
      case "test":
        this.link = "http://localhost:5000/";
        break;
      case "production":
        this.link = "http://heroku/";
        break;
      default:
        this.link = "http://localhost:3000/";
    }
  }

  createEmailTemplate(email, verificationToken) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Contacts Service",
        link: this.link,
      },
    });

    const mail = {
      body: {
        name: email,
        intro: "We're very excited to have you on board.",
        action: {
          instructions: "To get started with our API, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}api/users/verify/${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(mail);
  }

  async sendVerifyEmail(email, verificationToken) {
    const emailBody = this.createEmailTemplate(email, verificationToken);
    const msg = {
      to: email,
      subject: "Verify email",
      html: emailBody,
    };
    try {
      await this.sender.send(msg);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default EmailService;
