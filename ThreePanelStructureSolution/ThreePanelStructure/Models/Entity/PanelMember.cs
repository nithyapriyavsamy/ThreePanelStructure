namespace ThreePanelStructure.Models.Entity
{
    public class PanelMember
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int ParentId { get; set; }
        public string? LevelName { get; set; }
        public bool Status { get; set; }
    }
}
