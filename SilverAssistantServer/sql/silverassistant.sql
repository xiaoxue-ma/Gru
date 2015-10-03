-- phpMyAdmin SQL Dump
-- version 4.2.8.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 30, 2015 at 04:09 PM
-- Server version: 5.5.40
-- PHP Version: 5.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `silverassistant`
--
CREATE DATABASE IF NOT EXISTS `silverassistant` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `silverassistant`;

-- --------------------------------------------------------

--
-- Table structure for table `chatgroup`
--

DROP TABLE IF EXISTS `chatgroup`;
CREATE TABLE IF NOT EXISTS `chatgroup` (
`id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
CREATE TABLE IF NOT EXISTS `chat_message` (
`id` int(50) NOT NULL,
  `type` enum('text','audio','video','') NOT NULL DEFAULT 'text',
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `text_content` text,
  `audio_content` text,
  `audio_length` int(11) DEFAULT NULL,
  `status` enum('unread','read') NOT NULL DEFAULT 'unread',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
`id` bigint(50) NOT NULL,
  `text_content` text NOT NULL,
  `status_id` bigint(50) NOT NULL,
  `sent_by_user_id` int(11) NOT NULL,
  `send_to_user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `comment_user_like`
--

DROP TABLE IF EXISTS `comment_user_like`;
CREATE TABLE IF NOT EXISTS `comment_user_like` (
  `comment_id` bigint(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `group_chat_message`
--

DROP TABLE IF EXISTS `group_chat_message`;
CREATE TABLE IF NOT EXISTS `group_chat_message` (
`id` int(50) NOT NULL,
  `type` enum('text','audio','video','') NOT NULL DEFAULT 'text',
  `from_user_id` int(11) NOT NULL,
  `to_group_id` int(11) NOT NULL,
  `text_content` text,
  `audio_content` text,
  `audio_length` int(11) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
CREATE TABLE IF NOT EXISTS `picture` (
`id` bigint(50) NOT NULL,
  `content` text NOT NULL,
  `status_id` bigint(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` varchar(255) NOT NULL,
  `body` text,
  `category` text,
  `selected_count` int(11) NOT NULL DEFAULT '0',
  `answered_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
CREATE TABLE IF NOT EXISTS `relationship` (
`id` int(11) NOT NULL,
  `name` text NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
`id` bigint(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `event_timestamp` timestamp NULL DEFAULT NULL,
  `text_content` text,
  `user_id` int(11) NOT NULL,
  `location` text,
  `ta_question_id` varchar(255) DEFAULT NULL COMMENT 'Question ID of unanswered question posted by teachable agent. Null means no question pending.'
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='status sent by users';

-- --------------------------------------------------------

--
-- Table structure for table `status_tag`
--

DROP TABLE IF EXISTS `status_tag`;
CREATE TABLE IF NOT EXISTS `status_tag` (
  `status_id` bigint(50) NOT NULL,
  `tag_id` bigint(50) NOT NULL,
  `tagged_by_user` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `status_user_like`
--

DROP TABLE IF EXISTS `status_user_like`;
CREATE TABLE IF NOT EXISTS `status_user_like` (
  `status_id` bigint(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
CREATE TABLE IF NOT EXISTS `tag` (
`id` bigint(50) NOT NULL,
  `text_content` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
`ID` int(11) NOT NULL,
  `name` text NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `password` text NOT NULL,
  `description` text,
  `verification_status` enum('pending','verified','reset') DEFAULT 'pending',
  `verification_code` varchar(6) DEFAULT NULL,
  `icon` text,
  `fb_token` text
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='User information';

-- --------------------------------------------------------

--
-- Table structure for table `user_chatgroup`
--

DROP TABLE IF EXISTS `user_chatgroup`;
CREATE TABLE IF NOT EXISTS `user_chatgroup` (
  `user_id` int(11) NOT NULL,
  `chatgroup_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_notification_queue`
--

DROP TABLE IF EXISTS `user_notification_queue`;
CREATE TABLE IF NOT EXISTS `user_notification_queue` (
  `user_id` int(11) DEFAULT NULL,
  `notification_type` enum('like','comment') DEFAULT NULL,
  `notification_target_id` bigint(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
CREATE TABLE IF NOT EXISTS `user_user` (
  `user_id1` int(11) NOT NULL,
  `user_id2` int(11) NOT NULL,
  `nickname` text,
  `relationship` text,
  `status` enum('pending','confirmed','waiting') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `word_question`
--

DROP TABLE IF EXISTS `word_question`;
CREATE TABLE IF NOT EXISTS `word_question` (
  `word` varchar(255) NOT NULL,
  `question_id` varchar(255) NOT NULL,
`id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=544964 DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatgroup`
--
ALTER TABLE `chatgroup`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_message`
--
ALTER TABLE `chat_message`
 ADD PRIMARY KEY (`id`), ADD KEY `from_user_id` (`from_user_id`), ADD KEY `to_user_id` (`to_user_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
 ADD PRIMARY KEY (`id`), ADD KEY `status_id` (`status_id`,`sent_by_user_id`), ADD KEY `send_to_user_id` (`send_to_user_id`), ADD KEY `sent_by_user_id` (`sent_by_user_id`);

--
-- Indexes for table `comment_user_like`
--
ALTER TABLE `comment_user_like`
 ADD PRIMARY KEY (`comment_id`,`user_id`), ADD KEY `comment_user_like_user_id` (`user_id`);

--
-- Indexes for table `group_chat_message`
--
ALTER TABLE `group_chat_message`
 ADD PRIMARY KEY (`id`), ADD KEY `from_user_id` (`from_user_id`), ADD KEY `to_group_id` (`to_group_id`);

--
-- Indexes for table `picture`
--
ALTER TABLE `picture`
 ADD PRIMARY KEY (`id`), ADD KEY `status_id` (`status_id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
 ADD PRIMARY KEY (`id`), ADD KEY `id` (`id`);

--
-- Indexes for table `relationship`
--
ALTER TABLE `relationship`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`), ADD KEY `ta_question_id` (`ta_question_id`);

--
-- Indexes for table `status_tag`
--
ALTER TABLE `status_tag`
 ADD PRIMARY KEY (`status_id`,`tag_id`), ADD KEY `tagged_by_user` (`tagged_by_user`), ADD KEY `status_tag_tag_id` (`tag_id`);

--
-- Indexes for table `status_user_like`
--
ALTER TABLE `status_user_like`
 ADD PRIMARY KEY (`status_id`,`user_id`), ADD KEY `status_user_like_user_id` (`user_id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user_chatgroup`
--
ALTER TABLE `user_chatgroup`
 ADD PRIMARY KEY (`user_id`,`chatgroup_id`), ADD KEY `user_chatgroup_group_id` (`chatgroup_id`);

--
-- Indexes for table `user_user`
--
ALTER TABLE `user_user`
 ADD PRIMARY KEY (`user_id1`,`user_id2`), ADD KEY `friendship_id2` (`user_id2`);

--
-- Indexes for table `word_question`
--
ALTER TABLE `word_question`
 ADD PRIMARY KEY (`id`), ADD KEY `word` (`word`), ADD KEY `question_id` (`question_id`), ADD KEY `question_id_2` (`question_id`), ADD KEY `word_2` (`word`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatgroup`
--
ALTER TABLE `chatgroup`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `chat_message`
--
ALTER TABLE `chat_message`
MODIFY `id` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `group_chat_message`
--
ALTER TABLE `group_chat_message`
MODIFY `id` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `picture`
--
ALTER TABLE `picture`
MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `relationship`
--
ALTER TABLE `relationship`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `word_question`
--
ALTER TABLE `word_question`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=544964;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_message`
--
ALTER TABLE `chat_message`
ADD CONSTRAINT `chat_message_from_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `chat_message_to_user_id` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
ADD CONSTRAINT `comment_from_status_id` FOREIGN KEY (`sent_by_user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `comment_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `comment_to_user_id` FOREIGN KEY (`send_to_user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment_user_like`
--
ALTER TABLE `comment_user_like`
ADD CONSTRAINT `comment_user_like_comment_id` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `comment_user_like_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_chat_message`
--
ALTER TABLE `group_chat_message`
ADD CONSTRAINT `group_chat_message_from_user_id` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `group_chat_message_to_group_id` FOREIGN KEY (`to_group_id`) REFERENCES `chatgroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `picture`
--
ALTER TABLE `picture`
ADD CONSTRAINT `picture_id_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `relationship`
--
ALTER TABLE `relationship`
ADD CONSTRAINT `relationship_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `status`
--
ALTER TABLE `status`
ADD CONSTRAINT `status_author` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `status_question_id` FOREIGN KEY (`ta_question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `status_tag`
--
ALTER TABLE `status_tag`
ADD CONSTRAINT `status_tag_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `status_tag_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `status_tag_user_id` FOREIGN KEY (`tagged_by_user`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `status_user_like`
--
ALTER TABLE `status_user_like`
ADD CONSTRAINT `status_user_like_status_id` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `status_user_like_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_chatgroup`
--
ALTER TABLE `user_chatgroup`
ADD CONSTRAINT `user_chatgroup_group_id` FOREIGN KEY (`chatgroup_id`) REFERENCES `chatgroup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `user_chatgroup_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_user`
--
ALTER TABLE `user_user`
ADD CONSTRAINT `friendship_id1` FOREIGN KEY (`user_id1`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `friendship_id2` FOREIGN KEY (`user_id2`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `word_question`
--
ALTER TABLE `word_question`
ADD CONSTRAINT `word_question_question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
