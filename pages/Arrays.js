import React, { useState, useEffect } from "react";
import styles from "../styles/Array.module.css";
import Sidebar from "../components/sidebar";
import Script from "next/script";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";

const Array = ({data}) => {
    const [arr_todo, setarr_todo] = useState(data.links);
  const [arr_done, setarr_done] = useState([]);
  const [arr_now, setarr_now] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("arr_todo")) {
        savearr_todo(JSON.parse(localStorage.getItem("arr_todo")));
        setarr_todo(JSON.parse(localStorage.getItem("arr_todo")));
      }
      else{
        localStorage.setItem("arr_todo", JSON.stringify(arr_todo));
      }
      if (localStorage.getItem("arr_done")) {
        savearr_done(JSON.parse(localStorage.getItem("arr_done")));
        setarr_done(JSON.parse(localStorage.getItem("arr_done")));
      }
      else{
        localStorage.setItem("arr_done", JSON.stringify(arr_done));
      }
      if(localStorage.getItem("arr_now")){
        setarr_now(JSON.parse(localStorage.getItem("arr_now")));
        savearr_now(JSON.parse(localStorage.getItem("arr_now")));
      }
      else{
        localStorage.setItem("arr_now", JSON.stringify(arr_now));
      }
    } catch (error) {
      console.error(error);
    }
  }, []);
  const savearr_todo = (items) => {
    localStorage.setItem("arr_todo", JSON.stringify(items));
  };
  const savearr_done = (items) => {
    localStorage.setItem("arr_done", JSON.stringify(items));
  };
  const savearr_now = (items) => {
    localStorage.setItem("arr_now", JSON.stringify(items));
  };
  const deleteItem = (index) => {
    const updateditems = arr_todo.filter((elem) => {
      return index !== elem.ques;
    });
    const temp = arr_todo.filter((elem) => {
      return index == elem.ques;
    });
    setarr_done([...arr_done, temp[0]]);
    savearr_done([...arr_done, temp[0]]);
    setarr_todo(updateditems);
    savearr_todo(updateditems);
    setarr_now(arr_done.length + 2);
    savearr_now(arr_done.length + 2);
  };
  const deleteItem2 = (index) => {
    const updateditems = arr_done.filter((elem) => {
      return index !== elem.ques;
    });
    const temp = arr_done.filter((elem) => {
      return index == elem.ques;
    });
    setarr_todo([...arr_todo, temp[0]]);
    savearr_todo([...arr_todo, temp[0]]);
    setarr_done(updateditems);
    savearr_done(updateditems);
    setarr_now(arr_done.length - 1);
    savearr_now(arr_done.length - 1);
  };
//   console.log(arr_done);
  return (
    <>
      <Script
        src="https://unpkg.com/react/umd/react.production.min.js"
        crossorigin
      ></Script>
      <Sidebar data={data} />
      <div className={styles.Array_body}>
        <h1>Arrays</h1>
        <ProgressBar
          style={{ fontSize: "1.5rem", height: "3rem", borderRadius: "10px", margin: "3rem 0" }}
          animated
          now={(arr_now / (data.links.length + 1)) * 100}
          label={parseInt((arr_now / (data.links.length + 1)) * 100) + "%"}
          variant="success"
        />
        <div className={styles.flex}>
          {arr_todo.map((item) => {
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
        {arr_done.length != 0 && <h2 className={styles.complete}>Questions Completed:</h2>}
        <div className={styles.flex2}>
          {arr_done.length != 0 && arr_done.map((item) => {
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
      'https://faithful-capris-wasp.cyclic.app/Arrays'
    );
    const data = await res.json();
  
    return {
      props: { data }, // will be passed to the page component as props
    };
  }

export default Array