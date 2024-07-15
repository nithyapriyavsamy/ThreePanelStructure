import React, { useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { useState } from "react";
import Hierarchy from "./Hierarchy";
import Departments from "./Department";
import { useDispatch, useSelector } from "react-redux";
import FetchService from "../Services/FetchService";
import Member from "../Models/Member";
import { setInitialState } from "../ReduxStore/StatusReducer";
import { Link, useNavigate } from "react-router-dom";
import { Organization } from "../Models/Member";
import MemberRedux from "../Models/MemberRedux";

const Home = () => {
  const dispatch = useDispatch();
  const nodesWithTrueStatus = useSelector((store: Organization) =>
    store.nodes.filter((nod: MemberRedux) => nod.status === true)
  );
  const listOfIds = nodesWithTrueStatus.map((node: MemberRedux) => node.id);
  var navigate = useNavigate();
  var requestUpper = {
    levelName: "Higher level",
    parentId: 0,
  };

  const [requestMiddle, setRequesMiddle] = useState({
    levelName: "mid level",
    parentId: 0,
  });

  var [responseUpper, setResponseUpper] = useState<Member[]>([]);
  var [responseMiddle, setResponseMiddle] = useState<Member[]>([]);
  var setMiddleData = async (id: number) => {
    try {
      requestMiddle.parentId = id;
      const middleResponse = await axios.post(
        "https://localhost:7205/api/PanelStructure/GetMembersByLevel",
        requestMiddle
      );
      setResponseMiddle(middleResponse.data);
      console.log(middleResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  var [responseThird, setResponseThird] = useState<Member[]>([]);
  const [requestThird, setRequestThird] = useState({
    levelName: "lower level",
    parentId: 0,
  });
  var setThirdData = async (id: number) => {
    try {
      requestThird.parentId = id;
      const thirdResponse = await axios.post(
        "https://localhost:7205/api/PanelStructure/GetMembersByLevel",
        requestThird
      );
      setResponseThird(thirdResponse.data);
      console.log(thirdResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  var SaveChanges = async () => {
    const response = await axios.put(
      "https://localhost:7205/api/PanelStructure/UpdateMembers",
      listOfIds
    );
    if (response.data) {
      navigate("/questions");
    } else {
      alert("Can't Update");
    }
  };
  useEffect(() => {
    setState();
    FetchInitialData();
  }, []);

  const setState = async () => {
    const nodes = await FetchService.fetchInitialState();
    console.log(nodes);
    dispatch(setInitialState(nodes));
  };

  var doWithThird = () => {};

  var FetchInitialData = async () => {
    try {
      const upperResponse = await axios.post(
        "https://localhost:7205/api/PanelStructure/GetMembersByLevel",
        requestUpper
      );
      setResponseUpper(upperResponse.data);
      console.log(upperResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="PanelStructure">
        <div className="Panel">
          <div className="header">
            <p className="heading">Courses</p>
          </div>
          {responseUpper.map((node) => (
            <div key={node.id}>
              <Hierarchy node={node} middlePanel={setMiddleData} />
            </div>
          ))}
        </div>

        <div className="Panel">
          <div className="header">
            <p className="heading">Departments</p>
          </div>
          {responseMiddle.length > 0 ? (
            responseMiddle.map((node) => (
              <div key={node.id}>
                <Departments node={node} thirdPanel={setThirdData} />
              </div>
            ))
          ) : (
            <p className="empty">Click an Element to View</p>
          )}
        </div>

        <div className="Panel">
          <div className="header">
            <p className="heading">Subjects</p>
          </div>
          {responseThird.length > 0 ? (
            responseThird.map((node) => (
              <div key={node.id}>
                <Departments node={node} thirdPanel={doWithThird} />
              </div>
            ))
          ) : (
            <p className="empty">Click an Element to View</p>
          )}
        </div>
      </div>
      <div className="saveButton">
        <Link to="/questions">
          <button onClick={SaveChanges} className="Button-Save">
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
