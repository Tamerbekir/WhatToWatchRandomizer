import { useState, useEffect, type ChangeEvent } from "react";
export default function MovieComponent() {
  interface MovieProp {
    name: string;
    streamingService: string;
  }

  const [movieActivity, setMovieActivity] = useState<MovieProp>({
    name: "",
    streamingService: "",
  });
  const [movieList, setMovieList] = useState<MovieProp[]>(() => {
    const saveList = localStorage.getItem("movieList");
    return saveList ? JSON.parse(saveList) : [];
  });

  useEffect(() => {
    localStorage.setItem("movieList", JSON.stringify(movieList));
  }, [movieList]);

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

  // copying array and sorting it, then using math random to make the movie list randomized. Updating useState
  const handleRandomChoice = () => {
    const randomMovieChoice = [...movieList];
    randomMovieChoice.sort(() => Math.random() - 2);
    setMovieList(randomMovieChoice);
    // console.log(randomMovieChoice);
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
        <button onClick={handleRandomChoice}>Random Pick</button>
      </div>
    </div>
  );
}
