import "./featuredProperties.css";

const FeaturedProperties = (props) => {
 const { top3 } = props

 if (!top3?.length) {
  return null
}

  return (
    <div className="fp">
      {top3.map((top, index) => (
        <div key={index} className="fpItem">
          <img
            src={top.photos[3]}
            alt=""
            className="fpImg"
          />
          <span className="fpName"><a href={`./hotels/${top._id}`} target="_blank">{top.name}</a></span>
          <span className="fpCity">{top.city}</span>
          <span className="fpPrice">Starting from ${top.cheapestPrice}</span>
          <div className="fpRating">
            <button>{top.rating}</button>
            <span>Excellent</span>
          </div>
        </div>))}
    </div>
  );
};

export default FeaturedProperties;
