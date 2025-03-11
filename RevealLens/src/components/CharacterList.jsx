import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./CharacterList.css";


const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/")
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching characters:", error));
  }, []);

  if (loading) return <p>Loading characters...</p>;

  return (
    <center>
    <div className="character-list">
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            <Link to={`/character/${index + 1}`} className="character-link">
              {character.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </center>
  );
};

CharacterList.propTypes = {
  characters: PropTypes.array,
};

export default CharacterList;