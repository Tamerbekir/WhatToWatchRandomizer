import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import MovieComponent from "../Components/MovieComponent";
import GameComponent from "../Components/GameComponent";
import ShowComponent from "../Components/ShowComponent";

export default function Home() {
  interface whatToWatch {
    movie: string;
    show: string;
    game: string;
    location: string;
    other: string;
  }

  const [activity, setActivity] = useState<whatToWatch>({
    movie: "",
    show: "",
    game: "",
    location: "",
    other: "",
  });

  // const [collapse, setCollapse] = useState<boolean>(false);

  // Looks for the click and then will register what text is within the click
  const handleActivitySelect = (name: keyof whatToWatch, value: string) => {
    //not using spread operator because I need strings to reset instead of keeping existing data.
    setActivity({
      movie: "",
      show: "",
      game: "",
      location: "",
      other: "",
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Activity
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            href="#/action-1"
            active
            onClick={() => handleActivitySelect("game", "game")}
          >
            Game
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-2"
            // Updating movie useState. Using 'Movie" to keep it conventional but it could be anything
            onClick={() => handleActivitySelect("movie", "movie")}
          >
            Movie
          </Dropdown.Item>
          <Dropdown.Item
            href="#/action-3"
            onClick={() => handleActivitySelect("show", "show")}
          >
            Show
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            href="#/action-4"
            onClick={() => handleActivitySelect("other", "other")}
          >
            Other
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {activity.movie === "movie" && <MovieComponent />}
      {activity.show === "show" && <ShowComponent />}
      {activity.game === "game" && <GameComponent />}
    </div>
  );
}
