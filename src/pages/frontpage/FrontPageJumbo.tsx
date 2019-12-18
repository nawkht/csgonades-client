import { FC } from "react";
import { Button } from "semantic-ui-react";

const FrontPageJumbo: FC = () => {
  return (
    <>
      <div id="jumbo">
        <div id="jumbo-message">
          <h1>CSGO Nades</h1>
          <p>
            Find the perfect smoke, flashbang, HE grenade or molotov for all the
            active duty maps in CS:GO.
          </p>
          <p>
            Or maybe you are a nade mastermind and want to contribute by adding
            your own nades to the site.
          </p>
          <Button basic color="teal">
            Join the community
          </Button>
        </div>
      </div>
      <style jsx>{`
        #jumbo {
          padding: 16px;
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url("https://steamuserimages-a.akamaihd.net/ugc/156900587882364094/D3099466CF9E12AAAF97945A32D99D748E2BD427/");
          background-position: center;
          background-size: cover;
          display: flex;
          flex-direction: column;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        #jumbo-message {
          display: inline-flex;
          align-self: center;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
        }

        p {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
        }
      `}</style>
    </>
  );
};

export { FrontPageJumbo };
