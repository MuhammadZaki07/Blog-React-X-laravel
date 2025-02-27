import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import NewArticle from "../components/NewArticle";
import SelectEditor from "../components/SelectEditor";
import axios from "axios";

const Beranda = () => {
    const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/article");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
  
    fetchArticles();
  }, []);
  return (
    <>
      <Carousel/>
      <Header />
      <NewArticle />
      <SelectEditor />
    </>
  );
};

export default Beranda;
