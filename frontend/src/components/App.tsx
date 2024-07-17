import React, { useEffect, useState } from "react";
import "./App.css";
import { CategoryType } from "../types/types";
import { getCategories } from "../services/category-service";
import Nav from "./Nav";
import CategoryList from "./CategoryList";
import Footer from "./Footer";
import Hero from "./Hero";
import SubNav from "./SubNav";
import { useAuthContext, AuthContextProvider } from "../contexts/AuthContext";

const App = () => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const allCategories = await getCategories();
        if (allCategories.length) setCategoryList(allCategories);
        else console.log("No categories.");
      } catch (error) {
        console.error("Error getting all categories.");
      }
    };
    fetchAndSet();
  }, []);

  return (
    <AuthContextProvider>
      <Nav></Nav>
      <SubNav></SubNav>
      <Hero></Hero>
      <CategoryList categoryList={categoryList}></CategoryList>
      <Footer></Footer>
    </AuthContextProvider>
  );
};

export default App;
