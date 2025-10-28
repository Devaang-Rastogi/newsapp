import { useState, useEffect } from "react";
import Spinner from "./Spinner.js";
import NewsItem from "./NewsItem.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";

const News = (props) => {
  const capitalizeFirstLetter = (word) => {
    if (!word || typeof word !== "string") return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  const [totalResults, setTotalResults] = useState(0);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const updatePage = async () => {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a16337e57cce476888365a18342db671&page=1&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setLoading(false);
      setTotalResults(parsedData.totalResults);
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
      props.setProgress(100);
    };
    updatePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const handlePageChange = async (event) => {
  //   setLoading(true);
  //   let newPage = page;
  //   if (event.target.id === "prev") newPage -= 1;
  //   else newPage += 1;
  //   setPage(newPage);
  //   updatePage();
  // };
  const fetchData = async () => {
    let newPage = page;
    newPage += 1;
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a16337e57cce476888365a18342db671&page=${newPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setPage(newPage);
    setArticles(articles.concat(parsedData.articles));
    setLoading(false);
  };
  return (
    <>
      <LoadingBar color="#f11946" progress={props.progress} />
      <h1 className="text-center">
        NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length} //This is important field to render the next data
        next={fetchData}
        hasMore={
          Math.ceil(page * props.pageSize) <= totalResults ? true : false
        }
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {!loading &&
              articles.map((element) => {
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
};

News.defaultProps = {
  country: "us",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
