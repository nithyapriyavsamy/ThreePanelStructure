import Member, { Organization } from "../Models/Member";
import MemberRedux from "../Models/MemberRedux";

const SET_INITIAL_STATE = "Set_Initial_State";
const CHANGE_STATE = "changeState";



interface SetInitialStateAction {
  type: typeof SET_INITIAL_STATE;
  payload: MemberRedux[];
}

interface ChangeStateAction {
  type: typeof CHANGE_STATE;
  payload: { id: number; status: boolean };
}


export const setInitialState = (payloads: MemberRedux[]) => ({
  type: SET_INITIAL_STATE,
  payload: payloads
});
export const changeState = (payloads: { id: number; status: boolean }) => ({
  type: CHANGE_STATE,
  payload: payloads
});



const initialState: Organization = {
  nodes: [],
}

const StatusReducer = (state: Organization = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_STATE: {
      if (action.payload.status == true) {
        var p = findAncestors(state.nodes, action.payload.id, []);
        var c = findDescendants(state.nodes, action.payload.id, []);
        const toChange = [...p, ...c];
        console.log(toChange);
        const updatedNodes = state.nodes.map((node) => toChange.includes(node.id) ? { ...node, status: action.payload.status } : node);
        const finalNodes = updatedNodes.map((node) => {
          return ({ ...node, noOfTrueChild: findTrueDecendants(updatedNodes, node.id, []) })
        });
        console.log(finalNodes);
        return {
          ...state,
          nodes: finalNodes
        }
      }
      else {
        console.log(false)
        var p = findAncestors(state.nodes, action.payload.id, []);
        var c = findDescendants(state.nodes, action.payload.id, []);
        c.unshift(action.payload.id);
        p.splice((p.indexOf(action.payload.id)), 1);
        console.log(p);
        var p1: number[] = [];
        p.forEach(element => {
          console.log(element, " ", action.payload.id);
          const hasChildWithTrueStatus = hasChildrenWithTrueStatus(element, state.nodes, action.payload.id, p1);
          if (!hasChildWithTrueStatus) {
            p1.push(element);
          }
        });
        const toChange = [...p1, ...c];
        const updatedNodes = state.nodes.map(node => toChange.includes(node.id) ? { ...node, status: action.payload.status } : node);
        const finalNodes = updatedNodes.map((node) => {
          return ({ ...node, noOfTrueChild: findTrueDecendants(updatedNodes, node.id, []) });
        });
        console.log(finalNodes);
        return {
          ...state,
          nodes: finalNodes
        }
      }
    }
    case SET_INITIAL_STATE:
      return {
        ...state,
        nodes: action.payload,
      };
    default:
      return state;
  }
}
export default StatusReducer;


function findAncestors(data: MemberRedux[], id: number, ancestors: number[]) {
  const item = data.find(item => item.id === id);
  if (item) {
    ancestors.push(item.id);
    console.log(ancestors);
    if (item.parentId !== null) {
      findAncestors(data, item.parentId, ancestors);
    }
  }
  return ancestors;
}


function findDescendants(data: MemberRedux[], id: number, descendants: number[]) {
  const children = data.filter(item => item.parentId === id);
  for (const child of children) {
    descendants.push(child.id);
    console.log(descendants);
    findDescendants(data, child.id, descendants);
  }
  return descendants;
}

function findTrueDecendants(data: MemberRedux[], id: number, descendants: number[]) {
  const children = data.filter(item => item.parentId === id);
  for (const child of children) {
    if (child.status == true) {
      descendants.push(child.id);
    }
    findTrueDecendants(data, child.id, descendants);
  }
  return descendants.length;
}

function hasChildrenWithTrueStatus(nodeId: number, nodes: MemberRedux[], id: number, p1: number[]) {
  //return nodes.some(node => node.parentId === nodeId && node.status === true && node.id!==id);
  const satisfyingIds = nodes.filter((node) => node.parentId === nodeId && node.status === true && node.id !== id)
    .map((node) => node.id);
  const filteredList1 = satisfyingIds.filter(item => !p1.includes(item));
  if (filteredList1.length > 0) {
    return true;
  }
  else {
    return false;
  }
}