using ThreePanelStructure.Interfaces;
using ThreePanelStructure.Models.DTO;
using ThreePanelStructure.Models.Entity;
using ThreePanelStructure.Models.RequestOrResponseModel;

namespace ThreePanelStructure.Services
{
    public class PanelStructureService : IPanelStructureService
    {
        private readonly IPanelStructureRepo _panelStructureRepo;

        public PanelStructureService(IPanelStructureRepo panelStructureRepo)
        {
            _panelStructureRepo = panelStructureRepo;
        }
        public async Task<ICollection<MemberViewModel>> GetHierarchy()
        {
            var members = await _panelStructureRepo.GetPanelMembers();
            var result = PanelMemberToMemberViewModel(members);
            return result;
        }

        public async Task<bool> UpdateMemberStatus(List<int> ids)
        {
            return await _panelStructureRepo.UpdateStatus(ids);
        }

        public async Task<ICollection<MemberHierarchyDTO>> GetMembersByLevel(MemberLevelRequestModel model)
        {
            var members = await _panelStructureRepo.GetPanelMembers();
            var result = members.Where(member => member.LevelName?.ToLower() == model.LevelName?.ToLower()).ToList();
            if (model.LevelName?.ToLower() == "higher level")
                return GetHierarchialFamily(result, 0);
            if (model.LevelName?.ToLower() == "mid level")
                return GetHierarchialFamily(result, model.ParentId);
            if (model.LevelName?.ToLower() == "lower level")
                return GetHierarchialFamily(result, model.ParentId);
            return null;
        }

        private static List<MemberHierarchyDTO> GetHierarchialFamily(List<PanelMember> members, int id)
        {
            return members
                .Where(member => member.ParentId == id)
                .Select(member => new MemberHierarchyDTO
                {
                    Id = member.Id,
                    Name = member.Name,
                    ParentId = member.ParentId,
                    LevelName = member.LevelName,
                    Status = member.Status,
                    Children = GetHierarchialFamily(members, member.Id)
                })
                .ToList();
        }

        private static List<int> GetMemberIds(List<PanelMember> members, int id, List<int> descendants = null)
        {
            descendants ??= new List<int>();
            var children = members.Where(item => item.ParentId == id);
            foreach (var child in children) {
                descendants.Add(child.Id);
                GetMemberIds(members, child.Id, descendants);
            }
            return descendants;
        }

        private static List<int> GetTrueMemberIds(List<PanelMember> members, int id, List<int> descendants = null)
        {
            descendants ??= new List<int>();
            var children = members.Where(item => item.ParentId == id && item.Status==true);
            foreach (var child in children)
            {
                descendants.Add(child.Id);
                GetTrueMemberIds(members, child.Id, descendants);
            }
            return descendants;
        }
        private static List<MemberViewModel> PanelMemberToMemberViewModel(List<PanelMember> members)
        {
            return members
                .Select(member => new MemberViewModel
                {
                    Id = member.Id,
                    Name = member.Name,
                    ParentId = member.ParentId,
                    LevelName = member.LevelName,
                    Status = member.Status,
                    NoOfChild = GetMemberIds(members, member.Id).Count(),
                    NoOfTrueChild = GetTrueMemberIds(members, member.Id).Count(),
                    Children = null
                })
                .ToList();
        }

        public async Task<ICollection<MemberHierarchyDTO>> GetMembersByPanel()
        {
            var members = await _panelStructureRepo.GetPanelMembers();
            var result = members.Where(member => (member.LevelName == "Higher Level" || member.LevelName == "Mid Level") && member.Status==true).ToList();
            return GetHierarchialFamily(result, 0);
        }
    }
}
