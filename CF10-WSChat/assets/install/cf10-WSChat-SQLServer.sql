/*
Navicat SQL Server Data Transfer

Source Server         : Localhost
Source Server Version : 100000
Source Host           : 127.0.0.1:1433
Source Database       : wschatlogs
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 100000
File Encoding         : 65001

Date: 2013-01-17 18:25:59
*/


-- ----------------------------
-- Table structure for [dbo].[socketchatlogs]
-- ----------------------------
DROP TABLE [dbo].[socketchatlogs]
GO
CREATE TABLE [dbo].[socketchatlogs] (
[logid] int NOT NULL IDENTITY(1,1) ,
[user] varchar(250) NULL ,
[message] varchar(MAX) NULL ,
[channel] varchar(255) NULL ,
[messageDate] datetime NULL 
)


GO
DBCC CHECKIDENT(N'[dbo].[socketchatlogs]', RESEED, 13)
GO

-- ----------------------------
-- Records of socketchatlogs
-- ----------------------------
SET IDENTITY_INSERT [dbo].[socketchatlogs] ON
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'1', N'J Harvey', N' I am God Here - and should be treated as much, NOW with Logging!', null, null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'2', N'Kaplan', N'Testing the Socket Logs', null, null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'3', N'user-9788', N'The Useruser-9788 has joined the system', null, null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'4', N'J Harvey', N'The Useruser-9788 Changed thier Nickname to:J Harvey', null, null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'5', N'user-1211', N'The Useruser-1211 has joined the system', N'The Lounge', null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'6', N'J Harvey', N'The Useruser-1211 Changed thier Nickname to:J Harvey', N'The Lounge', null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'7', N'J Harvey', N'No Longer does my name Contain a number, for I am Me.', N'The Lounge', null);
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'8', N'J Harvey', N'I have made enhancements to the system, especially for message logging.', N'The Lounge', N'2013-01-16 00:00:00.000');
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'9', N'J Harvey', N'I am Getting Pleased, Very Pleased that this is working. No, to Port this over to BootStrap.', N'The Lounge', N'2013-01-16 00:00:00.000');
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'10', N'SYSTEM', N'The Socket Connection has closed.', N'The Lounge', N'2013-01-16 00:00:00.000');
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'11', N'user-1211', N'The Useruser-1211 has joined the system', N'The Lounge', N'2013-01-16 00:00:00.000');
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'12', N'J Harvey', N'mlllm', N'The Lounge', N'2013-01-16 00:00:00.000');
GO
INSERT INTO [dbo].[socketchatlogs] ([logid], [user], [message], [channel], [messageDate]) VALUES (N'13', N'SYSTEM', N'The Socket Connection has closed.', N'The Lounge', N'2013-01-16 00:00:00.000');
GO
SET IDENTITY_INSERT [dbo].[socketchatlogs] OFF
GO

-- ----------------------------
-- Indexes structure for table socketchatlogs
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table [dbo].[socketchatlogs]
-- ----------------------------
ALTER TABLE [dbo].[socketchatlogs] ADD PRIMARY KEY ([logid])
GO
