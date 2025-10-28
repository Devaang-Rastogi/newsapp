import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
        <div className="my-3">
                  <div class="card" style={{width: "100%", maxWidth:"18rem", position:'relative'}}>
  <img src={imageUrl} class="card-img-top" alt="..."/>
  <div class="card-body">
    <div style={{display:'flex',justifyContent: 'flex-end', right:'0', top:'0', position:'absolute'}}>
    <span class="badge rounded-pill bg-danger">
    {source.name}
  </span>
  </div>

    <h5 class="card-title">{title}...</h5>
    <p class="card-text">{description}...</p>
    <div class="card-footer text-body-secondary">
    By {author} on {new Date(date).toGMTString()}
  </div>
    <a href={newsUrl} target="_blank" rel="noreferrer" class="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
        </div>

    )
  }
}

export default NewsItem