import Member from "./Member";

export default interface MemberRedux {
  "id": number,
  "name": string,
  "parentId": number,
  "levelName": string,
  "status": boolean,
  "noOfChild": number,
  "noOfTrueChild": number,
  "children": Member[]
}
