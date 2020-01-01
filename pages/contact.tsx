import { NextPage } from "next";
import { Layout } from "../src/ui-common/layout/layout";
import { Form, Button, Message } from "semantic-ui-react";
import { useState } from "react";
import { ConctactDTO } from "../src/models/Contact";
import { ContactApi } from "../src/api/ContactApi";

const ContactPageContainer: NextPage = () => {
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
      message
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
      <Layout>
        <div className="about">
          <h1>Contact</h1>
          <Form widths="equal" onSubmit={onSubmit}>
            <Form.Input
              required
              fluid
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(_, input) => setName(input.value)}
            />
            <Form.Input
              required
              fluid
              label="E-mail"
              placeholder="name@example.com"
              value={email}
              onChange={(_, input) => setEmail(input.value)}
            />
            <Form.TextArea
              required
              label="Message"
              placeholder="Tell us more about you..."
              value={message}
              onChange={(_, input) => {
                const value = input.value as string;
                setMessage(value);
              }}
            />
            <Button positive type="submit">
              Send
            </Button>
          </Form>
          {success && (
            <Message positive>
              <Message.Header>Message sent</Message.Header>
              <p>Your message has been sent.</p>
            </Message>
          )}
        </div>
      </Layout>
      <style jsx>{`
        .about {
          margin: 18px;
          background: white;
          padding: 18px;
        }
      `}</style>
    </>
  );
};

export default ContactPageContainer;
