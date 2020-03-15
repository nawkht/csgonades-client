import { FC } from "react";
import { BlogCodeSnippet } from "../../blog/BlogCodeSnippet";
import { BlogPost } from "../../blog/BlogPost";
import { EzoicPlaceHolder } from "../../common/ezoicLoader/EzoicPlaceHolder";
import { Layout2 } from "../../layout/Layout2";
import { useInitAdvert } from "../../store/AdvertStore/hooks";
import { withRedux } from "../../utils/WithRedux";
import { BlogPostArticle } from "../../blog/BlogPostArticle";

export const blogTickrateAndJumpthrow: BlogPost = {
  title: "Tickrate and it's effect on jumpthrow bind",
  slug: "tickrate-and-jumpthrow-bind",
  imageUrl: "/blogimg/jump.jpg",
  thumbnailUrl: "/blogimg/jump_thumb.jpg",
  createdAt: "2020-03-15T07:51:30.196Z",
  intro:
    "You just set up jumpthrow bind and practiced offline for a sick smoke for Mirage. Your friends ask you to join a game on FACEIT, and you throw your smoke, but it missed! What the heck? You just tried it out... Why did this happen?",
};

const HelloWorld: FC = () => {
  useInitAdvert();

  return (
    <>
      <Layout2 canonical="/blog/tickrate-and-jumpthrow-bind">
        <BlogPostArticle data={blogTickrateAndJumpthrow}>
          <p>
            TLDR; Game servers have different rates at which they communicate
            with your game, called tickrate. This slight timing difference
            affects when the server thinks your bind thinks you jumped and
            released the mouse button. Giving you slightly different results on
            64 and 128 tick servers. See the video below.
          </p>

          <div className="ez ez-wide">
            <EzoicPlaceHolder desc="Blog | Under intro" id={121} />
          </div>

          <h2>What is tickrate?</h2>
          <p>
            Tick rate is a networking term for game servers. It tells us how
            often our game, the client, communicates with the game server hosted
            by Valve, or third party providers.
          </p>

          <p>
            In Counter-Strike Global Offensive game servers are either 64 tick
            or 128 tick. For matchmaking, Valve has set the tick rate to 64, to
            save money... They can then run the servers on cheaper hardware.
            Professional tournaments and most external services like{" "}
            <a href="https://play.esea.net/">ESEA</a>,{" "}
            <a href="https://www.faceit.com/">FACEIT</a>, and{" "}
            <a href="https://popflash.site/">PopFlash</a> all use 128 tick. So
            depending on what you play the most on, you know what throws will
            work for you and which won&apos;t.
          </p>

          <h2>What is the jump throw bind?</h2>
          <p>
            The jump throw bind is a small script you can bind to one of your
            buttons. It allows you with one click of a button to perform
            multiple actions. In the case of the jump throw bind, these actions
            are jumping and releasing the left mouse button at the same time.
          </p>
          <p>
            So why is this so useful? It allows you to throw long-range with the
            same outcome every time. If you try to jump and release the nade
            yourself without the bind, you will see some variations for your
            throws as your not a robot, and you probably release the mouse
            button at slightly different times.
          </p>

          <h2>Why does the tickrate affect the jump throw bind?</h2>
          <p>
            The job of the jumpthrow bind is to remove the human error out of
            timing you releasing the nade at the correct height to make the nade
            land the same way every time.
          </p>

          <p>
            However, this comes at a cost. The bind will send two commands to
            the game server. First, it will send a jump command. Then a release
            command. These two commands are not done precisely at the same time;
            there&apos;s a small delay between them that you can&apos;t control.
          </p>

          <p>
            This delay is the reason your jumpthrow bind will have different
            outcomes on 64 tick and 128 tick. Because of the tickrate, the
            commands are interpreted by the server at slightly different
            timings.
          </p>

          <p>
            In the video below, you can see that the release happens at slightly
            different heights.
          </p>

          <div
            style={{
              position: "relative",
              paddingBottom: "calc(56.25% + 44px)",
            }}
          >
            <iframe
              src="https://gfycat.com/ifr/TeemingUnnaturalBordercollie?hd=1"
              frameBorder="0"
              scrolling="no"
              width="100%"
              height="100%"
              style={{ position: "absolute", top: 0, left: 0 }}
              allowFullScreen
            ></iframe>
          </div>

          <h2>Bonus: Variations of the jump throw bind</h2>
          <p>
            There are variations of the jump throw bind. More specifically there
            are three. Let’s see them all and how they differ.
          </p>

          <h3>Standard</h3>
          <BlogCodeSnippet
            code={`alias "+jumpthrow" "+jump;-attack";\nalias "-jumpthrow" "-jump";\nbind x "+jumpthrow";`}
          />

          <p>
            The Standard jump throw bind. It will jump and release the left
            mouse button and is the most basic variation that most people use.
          </p>

          <h3>With both mouse buttons</h3>
          <BlogCodeSnippet
            code={`alias "+jumpthrow" "+jump;-attack;-attack2";\nalias "-jumpthrow" "-jump";\nbind x "+jumpthrow"`}
          ></BlogCodeSnippet>

          <p>
            Personally, I use this variation, as it allows you to do a jump
            throw with your right mouse button down for a short-range jump
            throw. Or for some particular situations, I hold down both mouse
            buttons and click the bind, giving me a medium-range jump throw
            result. Even with this slight modification to the bind, It will
            still work correctly with the normal left-click throw as well.
          </p>

          <div className="ez ez-box">
            <EzoicPlaceHolder desc="Blog | In content mid" id={122} />
          </div>

          <h3>Extra range</h3>
          <BlogCodeSnippet
            code={`alias "+jumpthrow" "+jump;-attack;+forward";\nalias "-jumpthrow" "-jump;-forward";\nbind x "+jumpthrow;`}
          />

          <p>
            Last but not least, we have the extra range jump throw bind that, in
            addition to doing a jump and release, takes a single step forward,
            giving it some extra distance. This is the least used one, and I
            would not recommend it if you&apos;re looking at guides as they 99%
            of the time use one of the other two.
          </p>
        </BlogPostArticle>

        <div className="ez ez-huge">
          <EzoicPlaceHolder desc="Blog | Huge bottom" id={123} />
        </div>
      </Layout2>
      <style jsx>{`
        .ez {
        }

        .ez-wide {
          margin-top: 30px;
        }

        .ez-box {
          margin-bottom: 30px;
        }

        .ez-huge {
          margin-top: 100px;
          margin-bottom: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default withRedux(HelloWorld);
