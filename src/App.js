
import { Link, Route, Router, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Post from "./Post";
import PostLayout from "./PostLayout";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Navigate } from "react-router-dom";

function App() {
  
  const[posts, setPosts] = useState([
    {
      id:1,
      title:"My First Post",
      datetime:"July 01, 2021 11:17:36 AM",
      body:"Made a video about TESLA Q1 results"
    },
    {
      id:2,
      title:"My Second Post",
      datetime:"July 01, 2021 11:17:36 AM",
      body:"Made a video about TESLA Q1 results"
    },
    {
      id:3,
      title:"My Third Post",
      datetime:"July 01, 2021 11:17:36 AM",
      body:"Made a video about TESLA Q1 results"
    }
  ])

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fillteredResults = posts.filter((post) => 
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase()))

      setSearchResults(fillteredResults.reverse())
  },[posts,search]

  )

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {        
        const allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle('');
        setPostBody('');
        navigate('/')
        
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}

  return (
    <div className="App">      
      <Header title="New Social Media APP" />
      <Nav 
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home posts={searchResults}/>} />
        <Route path="post">
          <Route index element={<NewPost 
            handleSubmit = {handleSubmit}
            postTitle = {postTitle}
            setPostTitle = {setPostTitle}
            postBody = {postBody}
            setPostBody = {setPostBody}
          />} />       
          <Route path=":id" element={<PostPage posts ={posts} setPosts={setPosts} />} />
        </Route>
        <Route path="about" element = {<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
     
    </div>
  );
}

export default App;
