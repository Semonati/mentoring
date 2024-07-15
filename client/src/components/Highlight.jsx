import { useEffect, useState } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import io from "socket.io-client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import { checkSolution, isUserMentor, removeMentor } from "../utils/helpers";
import { getMentorFromLocalStorage } from "../utils/localStorage";

// Connect client to socket
const socket = io("http://localhost:8181");

const Highlight = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [block, setBlock] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const mentor = getMentorFromLocalStorage(`mentor-${block?.name}`);

  const handleBlur = () => {
    setIsEditing(false);
  };

  // Fetching data from server and updateing the state
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://mentoring-api-cmi0.onrender.com/blocks`
      );
      data.map((item) => {
        if (item._id == id) {
          setBlock(item);
          setCode(item.code);
        }
      });
    } catch (error) {
      console.error("Failed to fetching the data!", error);
    }
  };

  // Update the changes in the BD and the state
  const handleInputChange = (e) => {
    setCode(e.target.value);
    setResult(e.target.value);
    socket.emit("send_code", e.target.value);
  };

  // Delete the mentor from local storage
  const handleReturnToHomeButton = () => {
    navigate("/");
    removeMentor({
      mentorCase: `mentor-${block.name}`,
      mentorValue: `isMentor-${block.name}`,
    });
  };

  // Check if its mentor to disable editing option
  const handleEditClick = () => {
    if (mentor !== socket.id) setIsEditing(true);
  };

  // Set the first user as mentor to local storage
  isUserMentor(socket.id, block);

  useEffect(() => {
    fetchData();

    socket.on("receive_code", (code) => {
      setCode(code);
    });
  }, []);

  if (!block)
    return (
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Loading the blocks ....
      </Typography>
    );

  return (
    <Container sx={{ mb: "20px" }}>
      <h1>{block.title}</h1>
      <div onClick={handleEditClick}>
        {isEditing ? (
          <textarea
            value={code}
            onChange={handleInputChange}
            onBlur={handleBlur}
            style={{
              width: "99%",
              height: "400px",
              fontFamily: "monospace",
              fontSize: "1rem",
              backgroundColor: "#2d2d2d",
              color: "#f8f8f2",
              border: "none",
              outline: "none",
              padding: "15px 0 0 15px",
              borderRadius: "5px",
            }}
          />
        ) : (
          <SyntaxHighlighter language="javascript" style={okaidia}>
            {code}
          </SyntaxHighlighter>
        )}
      </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleReturnToHomeButton}
        >
          Return to home page
        </Button>
        {mentor !== socket.id && (
          <Button
            variant="contained"
            color="success"
            onClick={() => checkSolution(result, block.solution)}
          >
            Check your answer
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Highlight;
