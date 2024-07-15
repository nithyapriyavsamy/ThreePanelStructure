using ThreePanelStructure.Models.DTO;
using ThreePanelStructure.Models.Entity;
using ThreePanelStructure.Models.RequestOrResponseModel;

namespace ThreePanelStructure.Interfaces
{
    public interface IPanelStructureService
    {
        public Task<ICollection<MemberViewModel>> GetHierarchy();
        public Task<ICollection<MemberHierarchyDTO>> GetMembersByLevel(MemberLevelRequestModel requestModel);
        public Task<ICollection<MemberHierarchyDTO>> GetMembersByPanel();
        public Task<bool> UpdateMemberStatus(List<int> ids);
    }
}
