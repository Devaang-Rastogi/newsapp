const NewsItem = (props) =>{
    let {title,description,imageUrl,newsUrl,author,date,source}=props;
    return (
        <div className="my-3">
                  <div className="card" style={{width: "100%", maxWidth:"18rem", position:'relative'}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <div style={{display:'flex',justifyContent: 'flex-end', right:'0', top:'0', position:'absolute'}}>
    <span className="badge rounded-pill bg-danger">
    {source.name}
  </span>
  </div>

    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <div className="card-footer text-body-secondary">
    By {author} on {new Date(date).toGMTString()}
  </div>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
        </div>

    )
}

export default NewsItem