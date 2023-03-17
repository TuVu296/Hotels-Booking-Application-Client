import "./featured.css";


const Featured = (props) => {
  const { areas } = props

  if (!areas?.length) {
    return null
  }

  return (
    <div className="featured">
      {
        areas.map((area, index) => (
          <div key={index} className="featuredItem">
            <img
              src={area.image}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{area.name}</h1>
              <h2>{area.total ? area.total : 0} properties</h2>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Featured;
