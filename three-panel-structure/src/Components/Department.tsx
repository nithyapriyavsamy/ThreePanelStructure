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

function Departments({ node, thirdPanel }: DepartmentsProps) {
    var dispatch = useDispatch();
    const nodeCurrent = useSelector((store: Organization) => store.nodes.find((nod: MemberRedux) => nod.id === node.id));
    //    const isCheck = nodeCurrent?.status ?? false;
    const isCheck = nodeCurrent?.status == true && nodeCurrent?.noOfChild === nodeCurrent?.noOfTrueChild;
    useEffect(() => {
        const checkboxElement: HTMLInputElement | null = document.getElementById(`myCheck_${node.id}`) as HTMLInputElement;
        if ((nodeCurrent?.noOfTrueChild ?? 0) > 0 && (nodeCurrent?.noOfChild ?? 0) > (nodeCurrent?.noOfTrueChild ?? 0)) {
            checkboxElement.indeterminate = true;
        }
        else {
            checkboxElement.indeterminate = false;
        }
    }, [nodeCurrent]);

    var clicked = () => {
        thirdPanel(node.id);
    }
    var handleChange = () => {
        var nod = {
            "id": node.id,
            "status": !(nodeCurrent?.status ?? false)
        }
        dispatch(changeState(nod));
        // var result = FetchService.changeState(nod);
        // if(result !== null){
        //     dispatch(changeState(nod));
        // }
    }
    return (
        <div >
            <br />
            <input type="checkbox" id={`myCheck_${node.id}`} checked={isCheck} onChange={handleChange} />
            <button className='element' onClick={clicked}>{node.name}</button>
        </div>
    );
}

export default Departments;