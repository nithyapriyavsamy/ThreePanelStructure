import React, { useEffect } from 'react';
import MemberRedux from '../Models/MemberRedux';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Member, { Organization } from '../Models/Member';
import './Home.css';

interface HierarchyProps {
    node: Member;
    middlePanel: (id: number) => void;
}

function LeftPanel({ node, middlePanel }: HierarchyProps) {
    var dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [arrow, setArrow] = useState(false);
    const nodeCurrent = useSelector((store: Organization) => store.nodes.find((nod: MemberRedux) => nod.id === node.id));
    useEffect(() => {
        
    }, []);

    var toggle = () => {
        if (node.children.length <= 0) {
            middlePanel(node.id)
        }
        else {
            setArrow(!arrow);
            setIsOpen(!isOpen);
        }
    }




    return (
        <div style={{ marginLeft: '30px' }}>
            <br />
            {node.children.length>0 ?(
                
                <span onClick={toggle} className='arrow'>
                {arrow ? '➡️' : '⬇️'}
              </span>
              ) : (
                <span>🔹</span>
              )}
            <button className='element' onClick={toggle}>{node.name}</button>
            {isOpen && (node.children ?? []).map((child, index) => {
                return (
                    <LeftPanel node={child} middlePanel={middlePanel} />
                )
            })
            }
        </div>
    );
}

export default LeftPanel;

