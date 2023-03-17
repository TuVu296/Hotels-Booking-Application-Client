import "./propertyList.css";

const PropertyList = (props) => {

  const { types } = props

  if (!types?.length) {
    return null
  }

  return (
    <div className="pList">
      {
        types.map((type, index) => (
          <div key={index} className="pListItem">
            <img
              src={type.image}
              alt=""
              className="pListImg"
            />
            <div className="pListTitles">
              <h1>{type.name}</h1>
              <h2>{type.total ? type.total : 0} {type.name}</h2>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default PropertyList;
