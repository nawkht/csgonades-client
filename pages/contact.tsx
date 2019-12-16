import { NextPage } from "next";
import { Layout } from "../src/components/layout/layout";
import { Form } from "semantic-ui-react";

const ContactPageContainer: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="about">
          <h1>Contact</h1>
          <Form widths="equal">
            <Form.Input required fluid label="Name" placeholder="Your name" />
            <Form.Input
              required
              fluid
              label="E-mail"
              placeholder="name@example.com"
            />
            <Form.TextArea
              required
              label="Message"
              placeholder="Tell us more about you..."
            />
          </Form>
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
