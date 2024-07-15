import React, { useEffect } from 'react';
import MemberRedux from '../Models/MemberRedux';
import { useDispatch, useSelector } from 'react-redux';
import Member from '../Models/Member';
import { changeState } from '../ReduxStore/StatusReducer';
import { Organization } from '../Models/Member';
import { useState } from 'react';
import FetchService from '../Services/FetchService';
import './Home.css';

interface DepartmentsProps {
    node: Member
    thirdPanel: (id: number) => void;
}

function RightPanel({ node, thirdPanel }: DepartmentsProps) {
    var dispatch = useDispatch();
    const nodeCurrent = useSelector((store: Organization) => store.nodes.find((nod: MemberRedux) => nod.id === node.id));
    useEffect(() => {
        
    }, []);

    var clicked = () => {
        thirdPanel(node.id);
    }
    
    return (
        <div >
            <br />
            <button className='element' onClick={clicked}>{node.name}</button>
        </div>
    );
}

export default RightPanel;