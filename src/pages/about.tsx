import { NextPage } from "next";
import { Layout2 } from "../common/layout/Layout2";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { withRedux } from "../utils/WithRedux";

const AboutPageContainer: NextPage = () => {
  const { colors } = useTheme();

  return (
    <>
      <Layout2 canonical="/about">
        <div className="about">
          <h1>About CSGO Nades</h1>
          <h2>The story</h2>
          <p>
            CSGONades was created in 2016 to collect a large collection of
            grenades that can be found with ease.
          </p>
          <p>
            I am Mellet and I am an avid Counter-Strike player and a computer
            science student. During my matchmaking games, I wanted to be able to
            find new smokes and teach them to my teammates in a simple way.
          </p>
          <p>
            With my friends, we regularly rotate in new teammates and it often
            happens that someone does not know how to throw a nade that we need
            to execute a strategy for a bomb site. Now, with just a link to the
            nade, they can learn it in a few seconds between rounds and we can
            get on with our game.
          </p>
          <h2>My vision</h2>
          <p>
            I wanted to make this site useful for both beginners and experienced
            players.
          </p>
          <p>
            If you are new to Counter-Strike, this site can help you learn the
            basic grenades that every player should know. Try to blind your
            enemies with an easy pop flash, block off their vision with a nice
            smoke or set them on fire with a quick molotov.
          </p>
          <p>
            Gain an edge over your opponents, teach new grenades to your
            teammates and watch yourself rise through the ranks. If you are
            already good at the game, try to coordinate a smoke execute onto a
            bombsite together with your teammates or invent your strategies with
            the use of some of the grenades you can find on this website.
          </p>
        </div>
      </Layout2>
      <style jsx>{`
        .about {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          min-height: 90vh;
          color: ${colors.TEXT};
        }

        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default withRedux(AboutPageContainer, { ssr: false });
