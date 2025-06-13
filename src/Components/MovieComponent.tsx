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
  const [showRandomBtn, setShowRandomBtn] = useState<boolean>(true)
  const [showEditBtn, setShowEditBtn] = useState<boolean>(false)

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
    setShowEditBtn(false)
  };

  const handleDeleteMovieActivity = (index: number) => {
    const updateMovieList = [...movieList];
    updateMovieList.splice(index, 1);
    setMovieList(updateMovieList);
  };

  // copying array and sorting it, then using math random to make the movie list randomized. Updating useState
  const handleRandomChoice = () => {
    const randomMovieChoice = [...movieList];
    randomMovieChoice.sort(() => Math.random() - 0.5);
    setMovieList(randomMovieChoice);
    // console.log(randomMovieChoice);
  };

  const handleShowEditBtn = () => {
    setShowEditBtn(!showEditBtn)
  }

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
              {showEditBtn && (                
              <button onClick={() => handleDeleteMovieActivity(index)}>
                Delete {item.name}
              </button>
              )}
            </div>
          </>
        ))}
        {/* Random show btn goes away after one click */}
        {showRandomBtn && movieList.length > 0 && (
          <button onClick={() => 
            {handleRandomChoice(), setShowRandomBtn(false)}}>Random Pick</button>
            )}
            {movieList.length > 0 && (
              <button onClick={handleShowEditBtn}>{showEditBtn ? 'Done' : 'Edit List'}</button>
            )}
      </div>
    </div>
  );
}
