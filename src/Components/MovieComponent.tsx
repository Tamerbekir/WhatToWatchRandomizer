import { useState, type ChangeEvent } from "react";
export default function MovieComponent() {
  interface MovieProp {
    name: string;
    streamingService: string;
  }

  const [movieActivity, setMovieActivity] = useState<MovieProp>({
    name: "",
    streamingService: "",
  });
  const [movieList, setMovieList] = useState<MovieProp[]>([]);

  const handleMovieActivity = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovieActivity({ ...movieActivity, [name]: value });
    console.log(name);
  };

  const handleSubmitMovieActivity = () => {
    setMovieList([...movieList, movieActivity]);
    setMovieActivity({ name: "", streamingService: "" });
  };

  const handleDeleteMovieActivity = (index: number) => {
    const updateMovieList = [...movieList];
    updateMovieList.splice(index, 1);
    setMovieList(updateMovieList);
  };

  const handleRandomChoice = () => {
    const randomMovieList = [...movieList];
    randomMovieList * Math.random;
    setMovieList(randomMovieList);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={movieActivity.name}
        onChange={handleMovieActivity}
        placeholder="Movie Name"
      />
      <input
        type="text"
        name="streamingService"
        value={movieActivity.streamingService}
        onChange={handleMovieActivity}
        placeholder="Steaming Service"
      />
      {movieActivity.streamingService ? (
        <button onClick={handleSubmitMovieActivity}>
          Add {movieActivity.name}
        </button>
      ) : (
        ""
      )}
      <div>
        {movieList.map((item, index) => (
          <>
            <div key={index}>
              <p>{item.name}</p>
              <button onClick={() => handleDeleteMovieActivity(index)}>
                Delete {item.name}
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
