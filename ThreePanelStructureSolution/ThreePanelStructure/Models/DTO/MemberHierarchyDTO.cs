namespace ThreePanelStructure.Models.DTO

{
    public class MemberHierarchyDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int ParentId { get; set; }
        public string? LevelName { get; set; }
        public bool Status { get; set; }
        public List<MemberHierarchyDTO> Children { get; set; }
    }
}
