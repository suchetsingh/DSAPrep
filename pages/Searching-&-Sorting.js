import React, { useState, useEffect } from "react";
import styles from "../styles/Array.module.css";
import Sidebar from "../components/sidebar";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";

const Searchsort = ({data}) => {
    const [searchsort_todo, setsearchsort_todo] = useState(data.links);
  const [searchsort_done, setsearchsort_done] = useState([]);
  const [searchsort_now, setsearchsort_now] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("searchsort_todo")) {
        savesearchsort_todo(JSON.parse(localStorage.getItem("searchsort_todo")));
        setsearchsort_todo(JSON.parse(localStorage.getItem("searchsort_todo")));
      }
      else{
        localStorage.setItem("searchsort_todo", JSON.stringify(searchsort_todo));
      }
      if (localStorage.getItem("searchsort_done")) {
        savesearchsort_done(JSON.parse(localStorage.getItem("searchsort_done")));
        setsearchsort_done(JSON.parse(localStorage.getItem("searchsort_done")));
      }
      else{
        localStorage.setItem("searchsort_done", JSON.stringify(searchsort_done));
      }
      if(localStorage.getItem("searchsort_now")){
        setsearchsort_now(JSON.parse(localStorage.getItem("searchsort_now")));
        savesearchsort_now(JSON.parse(localStorage.getItem("searchsort_now")));
      }
      else{
        localStorage.setItem("searchsort_now", JSON.stringify(searchsort_now));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const savesearchsort_todo = (items) => {
    localStorage.setItem("searchsort_todo", JSON.stringify(items));
  };
  const savesearchsort_done = (items) => {
    localStorage.setItem("searchsort_done", JSON.stringify(items));
  };
  const savesearchsort_now = (items) => {
    localStorage.setItem("searchsort_now", JSON.stringify(items));
  };
  const deleteItem = (index) => {
    const updateditems = searchsort_todo.filter((elem) => {
      return index !== elem.ques;
    });
    const temp = searchsort_todo.filter((elem) => {
      return index == elem.ques;
    });
    setsearchsort_done([...searchsort_done, temp[0]]);
    savesearchsort_done([...searchsort_done, temp[0]]);
    setsearchsort_todo(updateditems);
    savesearchsort_todo(updateditems);
    setsearchsort_now(searchsort_done.length + 2);
    savesearchsort_now(searchsort_done.length + 2);
  };
  const deleteItem2 = (index) => {
    const updateditems = searchsort_done.filter((elem) => {
      return index !== elem.ques;
    });
    const temp = searchsort_done.filter((elem) => {
      return index == elem.ques;
    });
    setsearchsort_todo([...searchsort_todo, temp[0]]);
    savesearchsort_todo([...searchsort_todo, temp[0]]);
    setsearchsort_done(updateditems);
    savesearchsort_done(updateditems);
    setsearchsort_now(searchsort_done.length - 1);
    savesearchsort_now(searchsort_done.length - 1);
  };
//   console.log(searchsort_done);
  return (
    <>
      <Script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossorigin
      ></Script>
      <Sidebar data={data} />
      <div className={styles.Array_body}>
        <h1>Searching & Sorting</h1>
        <ProgressBar
          style={{ fontSize: "1.5rem", height: "3rem", borderRadius: "10px", margin: "3rem 0" }}
          animated
          now={(searchsort_now / (data.links.length + 1)) * 100}
          label={parseInt((searchsort_now / (data.links.length + 1)) * 100) + "%"}
          variant="success"
        />
        <div className={styles.flex}>
          {searchsort_todo.map((item) => {
            return (
              <div
                className={styles.flex_items}
                style={{ order: `${item.no}` }}
                id={item.no}
                key={item.no}
              >
                <button onClick={() => deleteItem(item.ques)}></button>
                <span className={styles.sno}>{item.no}</span>
                <a
                  className={styles.ques}
                  target="_blank"
                  href={`${item.link}`}
                  rel="noreferrer"
                >
                  {item.ques}
                </a>
                <span
                  style={{
                    color: `${
                      item.level != "Hard"
                        ? item.level != "Medium"
                          ? "yellow"
                          : "orange"
                        : "red"
                    }`,
                  }}
                  className={styles.level}
                >
                  {item.level}
                </span>
              </div>
            );
          })}
        </div>
        {searchsort_done.length != 0 && <h2 className={styles.complete}>Questions Completed:</h2>}
        <div className={styles.flex2}>
          {searchsort_done.length != 0 && searchsort_done.map((item) => {
            return (
              <div
                className={styles.flex2_items}
                style={{ order: `${item.no}` }}
                id={item.no}
                key={item.no}
              >
                <button onClick={() => deleteItem2(item.ques)}></button>
                <span className={styles.sno2}>{item.no}</span>
                <a
                  className={styles.ques2}
                  target="_blank"
                  href={`${item.link}`}
                  rel="noreferrer"
                >
                  {item.ques}
                </a>
                <span
                  style={{
                    color: `${
                      item.level != "Hard"
                        ? item.level != "Medium"
                          ? "yellow"
                          : "orange"
                        : "red"
                    }`,
                  }}
                  className={styles.level2}
                >
                  {item.level}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
    const res = await fetch(
      'https://faithful-capris-wasp.cyclic.app/Searching-&-Sorting'
    );
    const data = await res.json();
  
    return {
      props: { data }, // will be passed to the page component as props
    };
  }

export default Searchsort;