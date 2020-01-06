import { FC, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTournaments } from "../../store/TournamentStore/TournamentHooks";
import { TournamentCreateDTO } from "../../models/Tournament";

export const AdminTournaments: FC = () => {
  const { saveTournament } = useTournaments();
  const [name, setName] = useState("");
  const [iconUrl, setIconUrl] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [twitchUrl, setTwitchUrl] = useState<string | undefined>(undefined);
  const [eventUrl, setEventUrl] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  function onSubmit() {
    if (!startDate || !endDate) {
      console.error("No start or end date");
      return;
    }

    const tournament: TournamentCreateDTO = {
      name,
      iconUrl,
      city,
      country,
      twitchUrl,
      eventUrl,
      startDate,
      endDate
    };

    saveTournament(tournament);
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Tournament name</label>
          <Form.Input value={name} onChange={e => setName(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Icon url</label>
          <Form.Input
            value={iconUrl}
            onChange={e => setIconUrl(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Start date</label>
          <ReactDatePicker
            selected={startDate}
            showYearDropdown
            showMonthDropdown
            onChange={newDate => setStartDate(newDate)}
          />
        </Form.Field>

        <Form.Field>
          <label>End date</label>
          <ReactDatePicker
            selected={endDate}
            showYearDropdown
            showMonthDropdown
            onChange={newDate => setEndDate(newDate)}
          />
        </Form.Field>

        <Form.Field>
          <label>City</label>
          <Form.Input value={city} onChange={e => setCity(e.target.value)} />
        </Form.Field>

        <Form.Field>
          <label>Country</label>
          <Form.Input
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Twitch URL</label>
          <Form.Input
            value={twitchUrl}
            onChange={e => setTwitchUrl(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>Twitch URL</label>
          <Form.Input
            value={eventUrl}
            onChange={e => setEventUrl(e.target.value)}
          />
        </Form.Field>

        <Button positive type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
