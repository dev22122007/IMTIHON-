import All from "../Cards/All";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from '@mui/material/Alert';
import "./index.css";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

function Movie(props) {
  const [key, setKey] = useState();

  const all = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie?page=1&limit=200&type=movie`
  );
  const search = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie/search?page=1&limit=10&query=movie%${key}`
  );

  useEffect(() => {
    setKey(props.search);
  }, [props.search]);

  return (
    <div>
      <h2 className="trading">Movies</h2>
      {
        all.loading ? (
          <Stack sx={{ width: "100%", color: "grey.500", border:"5px" }} spacing={2}>
            <LinearProgress color="primary" />
            <LinearProgress color="inherit" />
            <LinearProgress color="success" />
          </Stack>
        ) :
          <div className="cards-wrapper">
            {props.search ? (
              search.data && search.data.docs.length > 0 ? (
                search.data.docs.map((card, index) => (
                  <All key={index} docs={card} />
                ))
              ) : (
                <Alert variant="filled" severity="warning">
                  Unfortunately, nothing was found.
                </Alert>
              )
            ) : (
              all.data &&
              (all.loading ? (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="primary" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="success" />
                </Stack>
              ) : (
                all.data.docs.map((card, index) => {
                  return (
                    all.data &&
                    (all.loading ? (
                      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                        <LinearProgress color="primary" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="success" />
                      </Stack>
                    ) : (
                      <All key={index} docs={card} />
                    ))
                  );
                })
              ))
            )}
          </div>
      }
    </div>
  );
}

export default Movie;
