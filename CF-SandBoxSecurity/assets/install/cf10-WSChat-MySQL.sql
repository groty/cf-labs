/*
Navicat MySQL Data Transfer

Source Server         : Localhost- MySQL
Source Server Version : 50525
Source Host           : localhost:3306
Source Database       : wschatlogs

Target Server Type    : MYSQL
Target Server Version : 50525
File Encoding         : 65001

Date: 2013-01-17 18:20:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `socketchatlogs`
-- ----------------------------
DROP TABLE IF EXISTS `socketchatlogs`;
CREATE TABLE `socketchatlogs` (
  `logid` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(250) DEFAULT NULL,
  `message` text,
  `channel` varchar(255) DEFAULT NULL,
  `messageDate` datetime DEFAULT NULL,
  PRIMARY KEY (`logid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of socketchatlogs
-- ----------------------------
INSERT INTO `socketchatlogs` VALUES ('1', 'J Harvey', ' I am God Here - and should be treated as much, NOW with Logging!', null, null);
INSERT INTO `socketchatlogs` VALUES ('2', 'Kaplan', 'Testing the Socket Logs', null, null);
INSERT INTO `socketchatlogs` VALUES ('3', 'user-9788', 'The Useruser-9788 has joined the system', null, null);
INSERT INTO `socketchatlogs` VALUES ('4', 'J Harvey', 'The Useruser-9788 Changed thier Nickname to:J Harvey', null, null);
INSERT INTO `socketchatlogs` VALUES ('5', 'user-1211', 'The Useruser-1211 has joined the system', 'The Lounge', null);
INSERT INTO `socketchatlogs` VALUES ('6', 'J Harvey', 'The Useruser-1211 Changed thier Nickname to:J Harvey', 'The Lounge', null);
INSERT INTO `socketchatlogs` VALUES ('7', 'J Harvey', 'No Longer does my name Contain a number, for I am Me.', 'The Lounge', null);
INSERT INTO `socketchatlogs` VALUES ('8', 'J Harvey', 'I have made enhancements to the system, especially for message logging.', 'The Lounge', '2013-01-16 00:00:00');
INSERT INTO `socketchatlogs` VALUES ('9', 'J Harvey', 'I am Getting Pleased, Very Pleased that this is working. No, to Port this over to BootStrap.', 'The Lounge', '2013-01-16 00:00:00');
INSERT INTO `socketchatlogs` VALUES ('10', 'SYSTEM', 'The Socket Connection has closed.', 'The Lounge', '2013-01-16 00:00:00');
INSERT INTO `socketchatlogs` VALUES ('11', 'user-1211', 'The Useruser-1211 has joined the system', 'The Lounge', '2013-01-16 00:00:00');
INSERT INTO `socketchatlogs` VALUES ('12', 'J Harvey', 'mlllm', 'The Lounge', '2013-01-16 00:00:00');
INSERT INTO `socketchatlogs` VALUES ('13', 'SYSTEM', 'The Socket Connection has closed.', 'The Lounge', '2013-01-16 00:00:00');
