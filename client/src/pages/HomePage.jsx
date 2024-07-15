import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Grid } from "@mui/material";

import styles from "./styles.module.css";

const HomePage = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8181/blocks`);
        setBlocks(data);
      } catch (error) {
        console.error("Failed to fetching the data!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <span className={styles.homePageTitle}>Choose Code Block</span>
      <div>
        <Grid container className={styles.blockContainer}>
          {blocks.map((block) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={block._id}
              className={styles.item}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Link to={`/codeblock/${block._id}`} className={styles.link}>
                {block.title}
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default HomePage;
