import '../App.css';
import Box from "../component/Box";

function AboutUs() {

  return (
    <div className="App">
     <h1> Welcome to Finding Orbi ! </h1>
        
      <h2> About Us: </h2>
      <Box>
      <p>
        Finding Orbi is a platform that allows students to connect with one
        another especially when classes are mostly conducted online. {" "}
      </p>

      <p>
        We hope that Finding Orbi will enhance and ease your learning experience
        by allowing increased interaction between you and your peers!
      </p>
      </Box>

      <h2>How does Finding Orbi work?</h2>

      <Box>

      <p>To search for a groupmate, first enter your module code in the search bar. </p>
      <p>If none of the matches meet your requirements in a potential groupmate, simply create a new post.</p>
      <p>You can do so by entering the relevant details in the "New Post" section!</p>
      <p> Most importantly, do provide your telegram handle for potential groupmates to contact you</p>
      <p> Chat and get to know them more!</p>
      </Box>

      <h2> More information </h2>
      <Box>
      <h4>Please note that any inappropriate behavior may result in the suspension of your account.</h4>
      <p> For more information or further assistance, please do not hesitate to contact us at graccelim@gmail.com or 
      ngruiyanrena@gmail.com</p>
      </Box>

      <h1>All the best for your projects!</h1>
      



    </div>
  );
}

export default AboutUs;