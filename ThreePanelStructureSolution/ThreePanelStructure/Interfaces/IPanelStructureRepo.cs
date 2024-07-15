using ThreePanelStructure.Models.Entity;

namespace ThreePanelStructure.Interfaces
{
    public interface IPanelStructureRepo
    {
        public Task<List<PanelMember>> GetPanelMembers();
        public Task<bool> UpdateStatus(List<int> status);
    }
}
