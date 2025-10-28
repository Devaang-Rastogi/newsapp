import React, { Component } from "react";
import Spinner from "./Spinner.js";
import NewsItem from "./NewsItem.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";

export class News extends Component {
  capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  constructor() {
    super();
    this.state = {
      totalResults: 0,
      articles: [],
      loading: true,
      page: 1,
    };
  }
  static defaultProps = {
    country: "us",
    pageSize: "8",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  updatePage = async () => {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a16337e57cce476888365a18342db671&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      loading: false,
      totalResults: parsedData.totalResults,
    });
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
    this.props.setProgress(100);
  };
  async componentDidMount() {
    this.setState({ loading: true });
    this.updatePage();
  }
  handlePageChange = async (event) => {
    this.setState({ loading: true });
    let newPage = this.state.page;
    if (event.target.id === "prev") newPage -= 1;
    else newPage += 1;
    this.setState({ page: newPage }, this.updatePage);
  };
  fetchData = async () => {
    let newPage = this.state.page;
    newPage += 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a16337e57cce476888365a18342db671&page=${newPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: newPage,
      articles: this.state.articles.concat(parsedData.articles),
      loading: false
    });
  }
  render() {
    return (
      <>
        
        <LoadingBar /> 
          <h1 className="text-center">
            NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
            Headlines
          </h1>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length} //This is important field to render the next data
            next={this.fetchData}
            hasMore={Math.ceil(this.state.page*this.props.pageSize)<=this.state.totalResults?true:false}
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="container" >
                <div className="row">
              {!this.state.loading &&
                this.state.articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 80)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                        }
                        newsUrl={element.url}
                        date={element.publishedAt}
                        author={element.author}
                        source={element.source}
                      />
                    </div>
                  );
                })}
                </div>
            </div>
          </InfiniteScroll>
      </>
    );
  }
}

export default News;
