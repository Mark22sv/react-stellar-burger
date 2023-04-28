import PropTypes from "prop-types";

 const ingredientPropType = PropTypes.shape({
  "name": PropTypes.string.isRequired,
  "type": PropTypes.string.isRequired,
  "proteins": PropTypes.number.isRequired,
  "fat": PropTypes.number.isRequired,
  "carbohydrates": PropTypes.number.isRequired,
  "calories": PropTypes.number.isRequired,
  "price": PropTypes.number.isRequired,
});

export default ingredientPropType;
