import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "./CharacterDetail.css";

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setCharacter(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching character:", error));
  }, [id]);

  if (loading) return <p>Loading character details...</p>;

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p><strong>Height:</strong> {character.height} cm</p>
      <p><strong>Mass:</strong> {character.mass} kg</p>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>
    </div>
  );
};

CharacterDetail.propTypes = {
  character: PropTypes.object,
};

export default CharacterDetail;