import { NextPage } from "next";
import { Layout } from "../src/ui-common/layout/layout";

const AboutPageContainer: NextPage = () => {
  return (
    <>
      <Layout canonical="/about">
        <div className="about">
          <h1>About</h1>
          <h2>The story</h2>
          <p>
            CS:GO nades was created in 2016 with the goal to gather a large
            collection of nades, that can be found with very little effort.
          </p>
          <p>
            I am sNipn, I am an avid CS:GO player and a computer science
            student. I wanted to be able to find new smokes and teach them to my
            teamates in a simple way so we could wreck noobs in CS:GO.
          </p>
          <p>
            As a team, we frequently play with new teammates and sometimes
            someone does not know how to throw a smoke. Now, with just a link to
            the nade, they can learn it in a few seconds between rounds and we
            can get on with our game.
          </p>
          <h2>My vision</h2>
          <p>
            I wanted to make this site useful for both beginners and experienced
            players.
          </p>
          <p>
            If you are new to CS:GO, this site can help you learn the basic
            grenades that every player should know. Try to blind your enemies
            with an easy popflash, block off their vision with a nice smoke or
            set them on fire with a quick molotov. Gain an edge over your
            opponents, teach new grenades to your teammates and watch yourself
            rise through the ranks.
          </p>
          <p>
            If you are already good at the game , try to coordinate a smoke
            execute onto a bombsite together with your teammates or invent your
            own strategies with the use of some grenades.
          </p>
          <h2>Key features</h2>
          <ul>
            <li>Short video showing how to throw each nade.</li>
            <li>Images depicting how to line up your crosshair.</li>
            <li>
              In-game teleportation by copying the teleport-code into the
              console. (Not available for all nades)
            </li>
          </ul>
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

export default AboutPageContainer;
