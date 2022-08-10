import React from "react";
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./App.css";
import Layout from "./layouts/Layout";
import Chat from "./components/chat";


const App = () => {
  return (
      <Layout>
        <div className="text-center mt-5">
            Homepage
        </div>
      </Layout>
  )
}
export default App;