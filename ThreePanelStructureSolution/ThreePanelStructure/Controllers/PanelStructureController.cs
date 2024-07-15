using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ThreePanelStructure.Interfaces;
using ThreePanelStructure.Models.DTO;
using ThreePanelStructure.Models.Entity;
using ThreePanelStructure.Models.RequestOrResponseModel;

namespace ThreePanelStructure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactCORS")]
    public class PanelStructureController : ControllerBase
    {
        private readonly IPanelStructureService _panelStructureService;

        public PanelStructureController(IPanelStructureService panelStructureService)
        {
            _panelStructureService = panelStructureService;
        }

        [HttpGet("GetAllMembers")]
        [ProducesResponseType(typeof(ICollection<MemberViewModel>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ICollection<MemberViewModel>>> GetAllMembers()
        {
            var result = await _panelStructureService.GetHierarchy();
            //throw new Exception("I am throwing an exception");
            return Ok(result);
        }

        [HttpPost("GetMembersByLevel")]
        [ProducesResponseType(typeof(ICollection<MemberHierarchyDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ICollection<MemberHierarchyDTO>>> GetMembersByLevel(MemberLevelRequestModel requestModel)
        {
            var result = await _panelStructureService.GetMembersByLevel(requestModel);
            return Ok(result);
        }

        [HttpGet("GetMembersByPanel")]
        [ProducesResponseType(typeof(ICollection<MemberHierarchyDTO>), StatusCodes.Status200OK)]
        public async Task<ActionResult<ICollection<MemberHierarchyDTO>>> GetMembersByPanel()
        {
            var result = await _panelStructureService.GetMembersByPanel();
            return Ok(result);
        }

        [HttpPut("UpdateMembers")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<bool>> UpdateMembers(List<int> ids)
        {
            try
            {
                var result = await _panelStructureService.UpdateMemberStatus(ids);
                if (result)
                    return Ok("Updated");
                return BadRequest("Invalid");
            }
            catch (InvalidOperationException)
            {
                return BadRequest("Invalid Input");
            }
        }
    }
}
