import { FC, memo } from "react";
import { useIsAdmin } from "../store/AuthStore/AuthHooks";

export const PropellerAd: FC = memo(({}) => {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <div className="propeller">
        <script
          async
          data-cfasync="false"
          src="//native.propellerclick.com/1?z=3164971"
        ></script>
      </div>
      <style jsx>{`
        .propeller {
          border: 1px solid red;
          height: 300px;
          width: 100%;
        }
      `}</style>
    </>
  );
});
