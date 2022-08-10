import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../services/api";
const Dashboard = () => {
  var [movies,setMovies] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchData = async () =>{
        const movies = await api.get('user/movies');
        setMovies(movies.data.results);
    }
    fetchData();
  }, []);
  // if (!currentUser) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <div>
        <h4>Movies</h4>
        {movies
          ? movies.map((movie) => (
              <div>
                <h5>{movie.user.username}</h5>
                <h5>{movie.movie}</h5>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default Dashboard;
