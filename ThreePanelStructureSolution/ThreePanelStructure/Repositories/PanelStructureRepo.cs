using Microsoft.Data.SqlClient;
using System.Data;
using ThreePanelStructure.Interfaces;
using ThreePanelStructure.Models.Entity;

namespace ThreePanelStructure.Repositories
{
    public class PanelStructureRepo : IPanelStructureRepo
    {
        private readonly string ConnectionString;

        public PanelStructureRepo()
        {
            ConnectionString = "Data Source=KANINI-LTP-700\\SQLEXPRESS9;Initial Catalog=ThreePanelStructure;User Id=sa;Password=Admin@123;";
        }
        public async Task<List<PanelMember>> GetPanelMembers()
        {
            List<PanelMember> members = new List<PanelMember>();
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("Proc_FetchThreePanelInformation", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    using (SqlDataAdapter adapter = new SqlDataAdapter(cmd))
                    {
                        DataTable table = new DataTable();
                        adapter.Fill(table);
                        foreach (DataRow dataRow in table.Rows)
                        {
                            PanelMember member = new PanelMember();
                            member.Id = (int)dataRow[0];
                            member.Name = (string)dataRow[1];
                            member.ParentId = (int)dataRow[2];
                            member.LevelName = (string)dataRow[3];
                            member.Status = (bool)dataRow[4];
                            members.Add(member);
                        }
                        return members;
                    }
                }
            }
        }

        public async Task<bool> UpdateStatus(List<int> status)
        {
            DataTable idTable = new DataTable();
            idTable.Columns.Add("Id", typeof(int));

            foreach (int id in status)
                idTable.Rows.Add(id);

            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand("UpdateStatus", connection))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    SqlParameter parameter = cmd.Parameters.AddWithValue("@IdList", idTable);
                    parameter.SqlDbType = SqlDbType.Structured;
                    if (!(connection.State == ConnectionState.Open))
                        connection.Open();
                    try
                    {
                        var result = cmd.ExecuteNonQuery();
                        connection.Close();
                        if (result > 0)
                            return true;
                    }
                    catch
                    {
                        throw new InvalidOperationException();
                    }
                    return false;
                }
            }
        }
    }
}
