using ThreePanelStructure.Models.DTO;

namespace ThreePanelStructure.Models.RequestOrResponseModel
{
    public class MemberViewModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int ParentId { get; set; }
        public string? LevelName { get; set; }
        public bool Status { get; set; }
        public int NoOfChild { get; set; }
        public int NoOfTrueChild { get; set; }
        public List<MemberHierarchyDTO> Children { get; set; }
    }
}
