import Card from "../Cards/Card";
import All from "../Cards/All";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from '@mui/material/Alert';
import "./index.css";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

function Home(props) {
  const [key, setKey] = useState();

  const datas = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie?page=12&limit=22`
  );
  const all = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie?page=1&limit=80`
  );
  const search = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie/search?page=1&limit=10&query=${key}`
  );

  useEffect(() => {
    setKey(props.search);
  }, [props.search]);

  return (
    <div>
      <h1 className="trending">Trending</h1>
      {
        datas.loading ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="primary" />
            <LinearProgress color="inherit" />
            <LinearProgress color="success" />
          </Stack>
        ) :
          <div className="cardWrapper">
            {props.search
              ? search.data && search.data.docs.length > 0 ?
                (search.loading ? (
                  <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="primary" />
                    <LinearProgress color="inherit" />
                    <LinearProgress color="success" />
                  </Stack>
                ) : (
                  search.data.docs.map((card, index) => {
                    return search.data ? (
                      search.loading ? (
                        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                          <LinearProgress color="primary" />
                          <LinearProgress color="inherit" />
                          <LinearProgress color="success" />
                        </Stack>
                      ) : (
                        <Card key={index} docs={card} />
                      )
                    ) : (
                      <h1>Afsus</h1>
                    );
                  })
                )) :
                (
                  <Alert sx={{ marginBottom: '20px' }} variant="filled" severity="warning">
                    Unfortunately, nothing was found.
                  </Alert>
                )
              : datas.data &&
              (datas.loading ? (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress color="primary" />
                  <LinearProgress color="inherit" />
                  <LinearProgress color="success" />
                </Stack>
              ) : (
                datas.data.docs.map((card, index) => {
                  return (
                    datas.data &&
                    (datas.loading ? (
                      <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                        <LinearProgress color="primary" />
                        <LinearProgress color="inherit" />
                        <LinearProgress color="success" />
                      </Stack>
                    ) : (
                      <Card key={index} docs={card} />
                    ))
                  );
                })
              ))}
          </div>
      }
      <h2 className="trading">Recommended for you</h2>
      {
        all.loading ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
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
                <Alert sx={{ marginBottom: '20px' }} variant="filled" severity="warning">
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

export default Home;
