import { FC, useState } from "react";
import { User, UserUpdateDTO } from "../../models/User";
import { Button, TextArea, Form } from "semantic-ui-react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import {
  useUsersActions,
  useUsersState
} from "../../store/UsersStore/UsersHooks";
import { useIsAdminOrModerator } from "../../store/AuthStore/AuthHooks";
import ReactDatepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  user: User;
};

export const UserEditor: FC<Props> = ({ user }) => {
  const isAdminOrMod = useIsAdminOrModerator();
  const { stopEditingUser, updateUser } = useUsersActions();
  const { isEditing, isUpdatingUser } = useUsersState();

  const { colors, isMobile, uiDimensions } = useTheme();
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [createdAt, setCreatedAt] = useState<Date | null>(
    new Date(user.createdAt)
  );

  if (!isEditing) {
    return null;
  }

  function onSubmit() {
    const updatedUserFields: UserUpdateDTO = {
      bio,
      email,
      nickname,
      createdAt: createdAt || undefined
    };

    console.log("Update", updatedUserFields);

    updateUser(updatedUserFields);
  }

  return (
    <>
      <div className="user-details">
        <Form onSubmit={onSubmit} loading={isUpdatingUser}>
          <Form.Field>
            <label>Nickname</label>
            <Form.Input
              placeholder="Nickname"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>E-mail</label>
            <Form.Input
              laceholder="E-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Bio</label>
            <TextArea
              placeholder="Something about you..."
              value={bio}
              onChange={e => setBio(e.currentTarget.value)}
            />
          </Form.Field>
          {isAdminOrMod && (
            <Form.Field>
              <label>Created at</label>
              <ReactDatepicker
                selected={createdAt}
                onChange={newDate => setCreatedAt(newDate)}
              />
            </Form.Field>
          )}

          <Button onClick={stopEditingUser}>Cancel</Button>
          <Button positive type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <style jsx>{`
        .user-details {
          position: relative;
          background: white;
          margin-right: ${isMobile ? "0px" : "18px"};
          padding: 12px;
          width: ${isMobile ? "100%" : "300px"};
          border: 1px solid ${colors.PRIMARY_BORDER};
          align-self: flex-start;
          border-radius: 3px;
          margin-bottom: ${isMobile ? uiDimensions.INNER_GUTTER_SIZE : 0}px;
        }

        .user-input {
          margin-bottom: 12px;
        }

        .buttons {
          display: flex;
          margin-right: -3px;
        }
      `}</style>
    </>
  );
};
