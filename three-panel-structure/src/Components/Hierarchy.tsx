import React, { useEffect } from 'react';
import MemberRedux from '../Models/MemberRedux';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Member, { Organization } from '../Models/Member';
import { changeState } from '../ReduxStore/StatusReducer';
import FetchService from '../Services/FetchService';
import './Home.css';

interface HierarchyProps {
    node: Member;
    middlePanel: (id: number) => void;
}

function Hierarchy({ node, middlePanel }: HierarchyProps) {
    var dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const nodeCurrent = useSelector((store: Organization) => store.nodes.find((nod: MemberRedux) => nod.id === node.id));
    //    const isCheck = nodeCurrent?.status??false;
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

    var toggle = () => {
        if (node.children.length <= 0) {
            middlePanel(node.id)
        }
        else {
            setIsOpen(!isOpen);
        }
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
        <div style={{ marginLeft: '30px' }}>
            <br />
            <input type="checkbox" id={`myCheck_${node.id}`} className='checkbox-wrapper' checked={isCheck} onChange={handleChange}
            style={{background:"blue"}} />
            <button className='element' onClick={toggle}>{node.name}</button>
            {isOpen && (node.children ?? []).map((child, index) => {
                return (
                    <Hierarchy node={child} middlePanel={middlePanel} />
                )
            })
            }
        </div>
    );
}

export default Hierarchy;

