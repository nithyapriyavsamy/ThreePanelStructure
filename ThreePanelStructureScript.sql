CREATE DATABASE ThreePanelStructure
GO
USE ThreePanelStructure
GO
CREATE SCHEMA Data
GO

CREATE SCHEMA Config
GO

CREATE TABLE Config.Levels
(Id INT PRIMARY KEY,
Name VARCHAR(30))
GO

CREATE TABLE Data.HierarchialMembers
(Id INT PRIMARY KEY,
Name NCHAR(50),
ParentId INT CONSTRAINT Fk_ParentID FOREIGN KEY REFERENCES Data.HierarchialMembers(Id),
LevelId INT CONSTRAINT Fk_LevelID FOREIGN KEY REFERENCES Config.Levels(Id))
GO



CREATE TABLE Data.HierarchialStatus
(Id INT PRIMARY KEY FOREIGN KEY REFERENCES Data.HierarchialMembers(Id),
Status BIT)
GO


SELECT * FROM Data.HierarchialStatus
SELECT * FROM Data.HierarchialMembers
SELECT * FROM Config.Levels

INSERT INTO Config.Levels VALUES(101, 'Higher Level')
INSERT INTO Config.Levels VALUES(102, 'Mid Level')
INSERT INTO Config.Levels VALUES(103, 'Lower Level')

-- Higher Level
INSERT INTO Data.HierarchialMembers (Id, Name, ParentId, LevelId)
VALUES
  (1001, 'Higher Education', NULL, 101),
  (1002, 'Graduate Programs', 1001, 101),
  (1003, 'Engineering And Technology', 1002, 101);

INSERT INTO Data.HierarchialStatus (Id, Status)
VALUES
  (1001, 0),
  (1002, 0),
  (1003, 0);

-- Mid Level
INSERT INTO Data.HierarchialMembers (Id, Name, ParentId, LevelId)
VALUES
  (1004, 'Computer Science And Engineering', 1003, 102),
  (1005, 'Electrical and Computer Engineering', 1003, 102),
  (1006, 'Electrical and Electronics Engineering', 1003, 102),
  (1007, 'Mechanical Engineering', 1003, 102),
  (1008, 'Civil Engineering', 1003, 102);

INSERT INTO Data.HierarchialStatus (Id, Status)
VALUES
  (1004, 0),
  (1005, 0),
  (1006, 0),
  (1007, 0),
  (1008, 0);

-- Lower Level
INSERT INTO Data.HierarchialMembers (Id, Name, ParentId, LevelId)
VALUES
  (1009, 'Object-Oriented Programming', 1004, 103),
  (1010, 'Compiler Design', 1004, 103),
  (1011, 'Database Management Systems', 1004, 103),
  (1012, 'Operating Systems', 1004, 103),
  (1013, 'Computer Networks', 1004, 103),
  (1014, 'Digital Signal Processing', 1005, 103),
  (1015, 'Electromagnetic Field Theory', 1005, 103),
  (1016, 'Analog and Digital Electronics', 1005, 103),
  (1017, 'Microprocessors and Microcontrollers', 1005, 103),
  (1018, 'Digital Electronics', 1006, 103),
  (1019, 'Electromagnetic Fields', 1006, 103),
  (1020, 'Circuit Theory', 1006, 103),
  (1021, 'Renewable Energy Sources', 1006, 103),
  (1022, 'Geotechnical Engineering', 1007, 103),
  (1023, 'Structural Analysis and Design', 1007, 103),
  (1024, 'Fluid Mechanics', 1007, 103),
  (1025, 'Construction Materials and Management', 1007, 103),
  (1026, 'Fluid Mechanics', 1008, 103),
  (1027, 'Thermodynamics', 1008, 103),
  (1028, 'Mechanics of Materials', 1008, 103),
  (1029, 'Dynamics of Machinery', 1008, 103);

INSERT INTO Data.HierarchialStatus (Id, Status)
VALUES
  (1009, 0),
  (1010, 0),
  (1011, 0),
  (1012, 0),
  (1013, 0),
  (1014, 0),
  (1015, 0),
  (1016, 0),
  (1017, 0),
  (1018, 0),
  (1019, 0),
  (1020, 0),
  (1021, 0),
  (1022, 0),
  (1023, 0),
  (1024, 0),
  (1025, 0),
  (1026, 0),
  (1027, 0),
  (1028, 0),
  (1029, 0);




--FetchAllData
CREATE PROC Proc_FetchThreePanelInformation
AS
BEGIN
	SELECT hs.Id, hm.Name,COALESCE(hm.ParentId, 0) AS ParentId , l.Name, hs.Status
	FROM Data.HierarchialStatus hs JOIN Data.HierarchialMembers hm
	ON hs.Id = hm.Id
	JOIN Config.Levels l
	ON hm.LevelId = l.Id
END

EXEC Proc_FetchThreePanelInformation

--List Of Id
CREATE TYPE Data.IntListType AS TABLE
(
    Id INT
);

--Update status Stored procedure
CREATE PROCEDURE UpdateStatus
    @IdList Data.IntListType READONLY
AS
BEGIN
    UPDATE hs
    SET Status = CASE WHEN i.Id IS NOT NULL THEN 1 ELSE 0 END
    FROM Data.HierarchialStatus hs
    LEFT JOIN @IdList i ON hs.Id = i.Id;
END;


