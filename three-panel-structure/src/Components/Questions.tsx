import React, { useEffect } from 'react';
import './Questions.css';
import axios from 'axios';
import { useState } from 'react';
import Hierarchy from './Hierarchy';
import Departments from './Department';
import { useDispatch, useSelector } from 'react-redux';
import FetchService from '../Services/FetchService';
import Member from '../Models/Member';
import { setInitialState } from '../ReduxStore/StatusReducer';
import { Link } from 'react-router-dom';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';


const Questions = () => {
  const dispatch = useDispatch();
  const datas = useSelector((store) => store);
  console.log(datas, "data");
  const [requestMiddle, setRequesMiddle] = useState({
    "levelName": "lower level",
    "parentId": 0
  });

  var [responseUpper, setResponseUpper] = useState<Member[]>([]);
  var [responseMiddle, setResponseMiddle] = useState<Member[]>([]);
  var setMiddleData = async (id: number) => {
    try {

      requestMiddle.parentId = id;
      const middleResponse = await axios.post('https://localhost:7205/api/PanelStructure/GetMembersByLevel', requestMiddle);
      setResponseMiddle(middleResponse.data);
      console.log(middleResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  var [responseThird, setResponseThird] = useState<Member[]>([]);
  useEffect(() => {

    setState();
    FetchInitialData();
  }, []);

  const setState = async () => {
    const nodes = await FetchService.fetchInitialState();
    console.log(nodes);
    dispatch(setInitialState(nodes));
  }

  var setThirdData = () => { };


  var FetchInitialData = async () => {
    try {
      const upperResponse = await axios.get('https://localhost:7205/api/PanelStructure/GetMembersByPanel');
      setResponseUpper(upperResponse.data);
      console.log(upperResponse.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <div className="saveButton-q">
        <Link to="/">
          <button className="Button-Save-q">Edit</button>
        </Link>
      </div>
      <div className="PanelStructures">
        <div className="Panels panel-left">
          <div className='header'>
            <p className='heading'>Courses And Departments</p>
          </div>
          {responseUpper.map((node) => (
            <div key={node.id}>
              <LeftPanel node={node} middlePanel={setMiddleData} />
            </div>
          ))}
        </div>

        <div className="Panels panel-right">
          <div className='header-q'>
            <p className='heading'>Subjects</p>
          </div>
          {responseMiddle.length > 0 ? (
            responseMiddle.map((node) => (
              <div key={node.id}>
                <RightPanel node={node} thirdPanel={setThirdData} />
              </div>
            ))
          ) : (
            <p className='empty'>Click an Element to View</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Questions;