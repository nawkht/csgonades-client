import { NextPage } from "next";
import { useState } from "react";
import { Button, Message } from "semantic-ui-react";
import { ContactApi } from "../api/ContactApi";
import { CsgnInput } from "../common/inputs/CsgnInput";
import { CsgnTextArea } from "../common/inputs/CsgnTextArea";
import { ConctactDTO } from "../models/Contact";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SEO } from "../layout/SEO2";

const ContactPageContainer: NextPage = () => {
  const { colors } = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function onSubmit() {
    if (email.length === 0 || name.length === 0 || message.length === 0) {
      setError("Something missing");
      return;
    }

    const contactMessage: ConctactDTO = {
      name,
      email,
      message,
    };

    const result = await ContactApi.sendMessage(contactMessage);

    if (result.isErr()) {
      return setError(result.error.message);
    }

    setError(null);
    setSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <>
      <SEO title="Contact" canonical="/contact" />
      <div className="contact">
        <h1>Contact me 📨</h1>
        {!!error && <p>{error}</p>}

        <CsgnInput label="Name" value={name} onChange={setName} />
        <CsgnInput label="E-mail" value={email} onChange={setEmail} />
        <CsgnTextArea label="Message" value={message} onChange={setMessage} />

        <Button positive onClick={onSubmit}>
          Send
        </Button>

        {success && (
          <Message positive>
            <Message.Header>Message sent</Message.Header>
            <p>Your message has been sent.</p>
          </Message>
        )}
      </div>
      <style jsx>{`
        .contact {
          max-width: 900px;
          padding: 50px;
          margin: 0 auto;
          min-height: 82vh;
          color: ${colors.TEXT};
        }

        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default ContactPageContainer;
