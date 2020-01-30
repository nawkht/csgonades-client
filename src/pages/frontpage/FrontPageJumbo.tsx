import { FC } from "react";
import { LogoHorizontal } from "../../ui-common/svgs/LogoHorizontal";

const FrontPageJumbo: FC = () => {
  return (
    <>
      <div id="jumbo">
        <div id="jumbo-message">
          <div id="jumpo-title-container">
            <LogoHorizontal />
          </div>

          <p>
            Find the perfect smoke, flashbang, HE grenade or molotov for all the
            active duty maps in CS:GO.
          </p>
          <p>
            Or maybe you are a nade mastermind and want to contribute by adding
            your own nades to the site.
          </p>
        </div>
        <div className="illustration" />
      </div>
      <style jsx>{`
        #jumbo {
          position: relative;
          padding: 16px;
          background: linear-gradient(
            rgba(38, 38, 38, 1),
            rgba(38, 38, 38, 0.9)
          );
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

        #jumpo-title-container {
          height: 40px;
          margin-bottom: 12px;
        }

        .illustration {
          position: absolute;
          right: 15%;
          top: calc(100% - 150px);
          height: 200px;
          width: 200px;
          background: url("/images/ilustration.svg");
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
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
