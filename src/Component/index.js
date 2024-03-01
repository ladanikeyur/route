import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkData,
  loading,
  removeCheck,
  repoData,
} from "../redux/Slice/slice";

export default function Repository() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.slice);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRow, setTotalRow] = useState(10);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    dispatch(loading());
    fetch("https://api.github.com/repositories")
      .then((res) => res.json())
      .then((responce) => {
        dispatch(repoData(responce));
      });
  }, []);

  useEffect(() => {
    setTotalPage(data?.reposetoryData?.length / totalRow);
    showRow();
  }, [data?.reposetoryData]);

  const showRow = () => {
    const row = [];
    for (let i = 0; i < data?.reposetoryData?.length; i++) {
      const element = data?.reposetoryData[i];
      if (i < totalRow) {
        row.push(element);
      } else {
        break;
      }
    }

    setRowData(row);
  };

  const DeleteData = () => {
    const deleteArr = [];
    for (let i = 0; i < data.reposetoryData.length; i++) {
      const element = data.reposetoryData[i];
      const filter = data.checkData.filter((val) => val.id === element.id);
      if (filter.length < 1) {
        deleteArr.push(element);
      }
    }
    dispatch(repoData(deleteArr));
  };

  const nextPage = () => {};

  const PrevPage = () => {};

  return (
    <div className="main">
      {data.loading ? (
        <h1>Loading...</h1>
      ) : (
        rowData?.map((val, i) => {
          return (
            <div className="card">
              <input
                type="checkbox"
                onChange={() => {
                  dispatch(checkData(val));
                }}
              />
              <p>{val.full_name}</p>
              <p key={i}>{val.description}</p>
            </div>
          );
        })
      )}
      <div className="pagination">
        <button
          onClick={() => {
            PrevPage();
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            nextPage();
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            DeleteData();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
