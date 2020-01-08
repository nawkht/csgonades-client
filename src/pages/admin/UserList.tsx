import { FC, useEffect, useState } from "react";
import { useSiteStats } from "../../store/GlobalStore/GlobalHooks";
import { Pagination, Button } from "semantic-ui-react";
import { useAdminPage } from "../../store/AdminStore/AdminHooks";
import Link from "next/link";
import { prettyDate } from "../../utils/DateUtils";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

const USER_LIMIT = 10;

export const UserList: FC = () => {
  const { colors } = useTheme();
  const [page, setPage] = useState(1);
  const [sortByActivity, setSortByActivity] = useState(false);
  const {
    stats: { numUsers },
    fetchSiteStats
  } = useSiteStats();
  const { users, fetchUsers } = useAdminPage();

  const pages = Math.ceil(numUsers / USER_LIMIT);

  useEffect(() => {
    fetchSiteStats();
    fetchUsers(page, USER_LIMIT, sortByActivity);
  }, []);

  useEffect(() => {
    fetchUsers(page, USER_LIMIT, sortByActivity);
  }, [page, sortByActivity]);

  return (
    <>
      <div>
        <Button onClick={() => setSortByActivity(false)}>By created at</Button>
        <Button onClick={() => setSortByActivity(true)}>By last active</Button>
        {users.map(user => (
          <Link
            href={`/users?id=${user.steamId}`}
            as={`/users/${user.steamId}`}
            key={user.steamId}
          >
            <a className="user">
              <img src={user.avatar} />
              <span className="nickname">{user.nickname}</span>
              <span className="created-at">{prettyDate(user.createdAt)}</span>
              <span className="last-active">{prettyDate(user.lastActive)}</span>
            </a>
          </Link>
        ))}
        <Pagination
          defaultActivePage={1}
          totalPages={pages}
          onPageChange={(_, pageProps) => {
            let activePage = pageProps.activePage as number;
            setPage(activePage);
          }}
        />
      </div>
      <style jsx>{`
        .user {
          display: flex;
          align-items: center;
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
          padding: 6px;
          color: #444;
        }

        .nickname {
          flex: 1;
        }

        .created-at {
          margin-right: 18px;
        }

        .user img {
          width: 30px;
          margin-right: 6px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
