import MemberRedux from "./MemberRedux"

export default interface Member {
  "id": number,
  "name": string,
  "parentId": number,
  "levelName": string,
  "status": boolean,
  "children": Member[]
}

export interface Organization {
  nodes: MemberRedux[],
}