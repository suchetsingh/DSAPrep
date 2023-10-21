import React, { useState, useEffect } from "react";
import styles from "../styles/Array.module.css";
import Sidebar from "../components/sidebar";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";

const Stackqueue = ({ data }) => {
  const [sq_todo, setsq_todo] = useState(data.links);
  const [sq_done, setsq_done] = useState([]);
  const [sq_now, setsq_now] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("sq_todo")) {
        savesq_todo(JSON.parse(localStorage.getItem("sq_todo")));
        setsq_todo(JSON.parse(localStorage.getItem("sq_todo")));
      } else {
        localStorage.setItem("sq_todo", JSON.stringify(sq_todo));
      }
      if (localStorage.getItem("sq_done")) {
        savesq_done(JSON.parse(localStorage.getItem("sq_done")));
        setsq_done(JSON.parse(localStorage.getItem("sq_done")));
      } else {
        localStorage.setItem("sq_done", JSON.stringify(sq_done));
      }
      if(localStorage.getItem("sq_now")){
        setsq_now(JSON.parse(localStorage.getItem("sq_now")));
        savesq_now(JSON.parse(localStorage.getItem("sq_now")));
      }
      else{
        localStorage.setItem("sq_now", JSON.stringify(sq_now));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const savesq_todo = (items) => {
    localStorage.setItem("sq_todo", JSON.stringify(items));
  };
  const savesq_done = (items) => {
    localStorage.setItem("sq_done", JSON.stringify(items));
  };
  const savesq_now = (items) => {
    localStorage.setItem("sq_now", JSON.stringify(items));
  };
  const deleteItem = (index) => {
    const updateditems = sq_todo.filter((elem) => {
      return index !== elem.ques;
    });
    const temp = sq_todo.filter((elem) => {
      return index == elem.ques;
    });
    setsq_done([...sq_done, temp[0]]);
    savesq_done([...sq_done, temp[0]]);
    setsq_todo(updateditems);
    savesq_todo(updateditems);
    setsq_now(sq_done.length + 2);
    savesq_now(sq_done.length + 2);
  };
  const deleteItem2 = (index) => {
    const updateditems = sq_done.filter((elem) => {
      return index !== elem.ques;
    });
    const temp = sq_done.filter((elem) => {
      return index == elem.ques;
    });
    setsq_todo([...sq_todo, temp[0]]);
    savesq_todo([...sq_todo, temp[0]]);
    setsq_done(updateditems);
    savesq_done(updateditems);
    setsq_now(sq_done.length - 1);
    savesq_now(sq_done.length - 1);
  };
  //   console.log(sq_done);
  return (
    <>
      <Script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossorigin
      ></Script>
      <Sidebar data={data} />
      <div className={styles.Array_body}>
        <h1>Stack & Queues</h1>
        <ProgressBar
          style={{ fontSize: "1.5rem", height: "3rem", borderRadius: "10px", margin: "3rem 0" }}
          animated
          now={(sq_now / (data.links.length + 1)) * 100}
          label={parseInt((sq_now / (data.links.length + 1)) * 100) + "%"}
          variant="success"
        />
        <div className={styles.flex}>
          {sq_todo.map((item) => {
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
        {sq_done.length != 0 && (
          <h2 className={styles.complete}>Questions Completed:</h2>
        )}
        <div className={styles.flex2}>
          {sq_done.length != 0 &&
            sq_done.map((item) => {
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
  );
};

export async function getServerSideProps(context) {
  const res = await fetch("https://faithful-capris-wasp.cyclic.app/Stack-&-Queues");
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Stackqueue;
