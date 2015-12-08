-- phpMyAdmin SQL Dump
-- version 4.2.8.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 08, 2015 at 03:21 PM
-- Server version: 5.5.46
-- PHP Version: 5.4.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `seniorconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatgroup`
--

DROP TABLE IF EXISTS `chatgroup`;
CREATE TABLE IF NOT EXISTS `chatgroup` (
`id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chatgroup`
--

INSERT INTO `chatgroup` (`id`, `name`) VALUES
(1, 'My Family'),
(2, 'Blk 648');

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
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_message`
--

INSERT INTO `chat_message` (`id`, `type`, `from_user_id`, `to_user_id`, `text_content`, `audio_content`, `audio_length`, `status`, `timestamp`) VALUES
(1, 'text', 4, 1, 'Hi Xiaoxue!', '', 0, 'read', '2015-05-05 16:22:53'),
(2, 'text', 1, 4, 'Hi Huiqi!', '', 0, 'read', '2015-05-05 16:22:52'),
(3, 'text', 4, 3, 'Hi Yishan!', '', 0, 'read', '2015-05-05 16:33:29'),
(4, 'text', 1, 3, 'Hi Yishan! This is Xiaoxue', '', 0, 'read', '2015-05-05 16:33:29'),
(5, 'text', 1, 4, 'Are you coming to campus today?', '', 0, 'read', '2015-05-05 16:33:52'),
(6, 'text', 4, 1, '', '', 0, 'read', '2015-05-05 20:52:28'),
(13, 'text', 4, 1, 'send again', '', 0, 'read', '2015-05-06 21:05:07'),
(14, 'text', 4, 1, 'a1', '', 0, 'read', '2015-05-07 16:20:07'),
(15, 'text', 4, 1, 'a2', '', 0, 'read', '2015-05-07 16:20:11'),
(16, 'text', 4, 1, 'a3', '', 0, 'read', '2015-05-07 16:20:14'),
(17, 'text', 4, 1, 'a4', '', 0, 'read', '2015-05-07 16:23:49'),
(18, 'text', 4, 1, 'a5', '', 0, 'read', '2015-05-07 16:23:52'),
(19, 'text', 4, 1, 'a6', '', 0, 'read', '2015-05-07 16:24:00'),
(20, 'text', 4, 1, 'Hi', '', 0, 'read', '2015-05-13 06:41:39'),
(21, 'text', 4, 1, 'jtest', NULL, NULL, 'read', '2015-10-09 07:30:05'),
(22, 'text', 4, 1, 'test', NULL, NULL, 'read', '2015-10-09 07:30:09'),
(23, 'text', 4, 3, 'new test', NULL, NULL, 'read', '2015-10-09 08:07:09'),
(24, 'text', 4, 1, 'test', NULL, NULL, 'read', '2015-10-09 09:26:07'),
(25, 'text', 4, 1, 'test on yikun laptop', NULL, NULL, 'read', '2015-10-09 15:00:02'),
(26, 'text', 4, 1, 'Try on tablet', NULL, NULL, 'read', '2015-10-09 16:17:51'),
(27, 'audio', 4, 1, '[Audio], 8.195 seconds', NULL, 8, 'read', '2015-10-09 16:18:33'),
(28, 'text', 4, 3, 'Hi yishan', NULL, NULL, 'read', '2015-10-11 06:32:30'),
(29, 'audio', 2, 1, '[Audio], 2.087 seconds', NULL, 2, 'read', '2015-10-23 09:51:08'),
(30, 'audio', 2, 1, '[Audio], 2.019 seconds', '30.amr', 2, 'read', '2015-10-23 09:55:04'),
(31, 'audio', 1, 2, '[Audio], 2.804 seconds', NULL, 3, 'read', '2015-10-23 11:09:10'),
(32, 'audio', 4, 1, '[Audio], 2.825 seconds', '32.amr', 3, 'read', '2015-10-11 11:10:21'),
(33, 'audio', 1, 4, '[Audio], 2.18 seconds', NULL, 2, 'read', '2015-10-11 11:11:12'),
(34, 'audio', 4, 1, '[Audio], 3.02 seconds', '34.amr', 3, 'read', '2015-10-11 11:13:04'),
(35, 'audio', 1, 2, '[Audio], 1.632 seconds', '35.amr', 2, 'read', '2015-10-11 11:34:50'),
(36, 'audio', 1, 2, '[Audio], 7.964 seconds', '36.amr', 8, 'read', '2015-10-11 11:41:59'),
(37, 'audio', 1, 2, '[Audio], 1.781 seconds', '37.amr', 2, 'read', '2015-10-11 11:42:08'),
(38, 'audio', 1, 2, '[Audio], 1.713 seconds', '38.amr', 2, 'read', '2015-10-11 11:43:58'),
(39, 'audio', 1, 2, '[Audio], 3.381 seconds', '39.amr', 3, 'read', '2015-10-12 12:04:47'),
(40, 'audio', 1, 2, '[Audio], 2.1 seconds', '40.amr', 2, 'read', '2015-10-13 05:27:23'),
(41, 'audio', 1, 2, '[Audio], 1.817 seconds', '41.amr', 2, 'read', '2015-10-13 06:09:29'),
(42, 'audio', 2, 1, '[Audio], 2.428 seconds', NULL, 2, 'read', '2015-10-13 06:09:55'),
(43, 'audio', 1, 2, '[Audio], 3.487 seconds', '43.amr', 3, 'read', '2015-10-13 06:19:56'),
(44, 'audio', 1, 2, '[Audio], 2.4 seconds', '44.amr', 2, 'read', '2015-10-13 06:37:23'),
(45, 'audio', 1, 2, '[Audio], 1.303 seconds', '45.amr', 1, 'read', '2015-10-13 06:40:22'),
(46, 'audio', 1, 2, '[Audio], 1.674 seconds', '46.amr', 2, 'read', '2015-10-13 07:07:31'),
(47, 'audio', 1, 2, '[Audio], 2.323 seconds', '47.amr', 2, 'read', '2015-10-13 07:12:17');

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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `group_chat_message`
--

INSERT INTO `group_chat_message` (`id`, `type`, `from_user_id`, `to_group_id`, `text_content`, `audio_content`, `audio_length`, `timestamp`) VALUES
(29, 'text', 4, 1, 'Yikun tablet', NULL, NULL, '2015-10-09 16:34:39'),
(30, 'audio', 4, 1, '[Audio], 2.903 seconds', 'g30.amr', 3, '2015-10-11 11:14:25'),
(31, 'audio', 4, 1, '[Audio], 2.161 seconds', 'g31.amr', 2, '2015-10-11 11:15:28'),
(32, 'audio', 1, 1, '[Audio], 1.957 seconds', 'g32.amr', 2, '2015-10-11 11:34:10'),
(33, 'audio', 1, 1, '[Audio], 3.446 seconds', 'g33.amr', 3, '2015-10-11 11:44:35'),
(34, 'audio', 1, 1, '[Audio], 1.623 seconds', 'g34.amr', 2, '2015-10-24 12:05:29'),
(35, 'audio', 1, 1, '[Audio], 3.104 seconds', 'g35.amr', 3, '2015-10-24 06:21:47'),
(36, 'audio', 1, 1, '[Audio], 1.808 seconds', 'g36.amr', 2, '2015-10-24 07:12:57'),
(37, 'audio', 1, 1, '[Audio], 1.391 seconds', 'g37.amr', 1, '2015-10-24 07:13:35'),
(38, 'audio', 1, 2, '[Audio], 1.941 seconds', 'g38.amr', 2, '2015-10-24 07:13:54'),
(39, 'audio', 2, 1, '[Audio], 0.215 seconds', NULL, 0, '2015-10-24 15:14:58'),
(40, 'audio', 1, 1, '[Audio], 2.029 seconds', 'g40.amr', 2, '2015-12-08 14:59:23');

-- --------------------------------------------------------

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
CREATE TABLE IF NOT EXISTS `picture` (
`id` bigint(50) NOT NULL,
  `content` text NOT NULL,
  `status_id` bigint(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `picture`
--

INSERT INTO `picture` (`id`, `content`, `status_id`) VALUES
(1, '1_1.jpg', 1),
(2, '1_2.jpg', 1),
(3, '1_2.jpg', 1),
(4, '1_2.jpg', 1),
(5, '1_2.jpg', 1),
(6, '10_0.jpg', 10),
(7, '17_0.jpg', 17),
(8, '18_0.jpg', 18),
(9, '19_0.jpg', 19),
(10, '22_0.jpg', 22),
(11, '23_0.jpg', 23),
(12, '23_1.jpg', 23),
(13, '24_0.jpg', 24),
(14, '25_0.jpg', 25),
(15, '26_0.jpg', 26),
(16, '26_1.jpg', 26),
(17, '27_1.jpg', 27),
(18, '27_0.jpg', 27),
(19, '28_0.jpg', 28),
(20, '28_1.jpg', 28),
(21, '29_0.jpg', 29),
(22, '29_1.jpg', 29),
(23, '29_2.jpg', 29),
(24, '30_2.jpg', 30),
(25, '30_1.jpg', 30),
(26, '30_0.jpg', 30);

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
  `location` text
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='status sent by users';

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `timestamp`, `event_timestamp`, `text_content`, `user_id`, `location`) VALUES
(1, '2015-01-05 08:52:30', '2014-11-03 16:00:00', 'lol', 4, NULL),
(2, '2015-02-04 06:47:30', '2015-01-04 16:00:00', 'lol2', 4, NULL),
(10, '2015-02-12 14:29:44', '2015-02-12 14:29:42', 'With pic!', 4, NULL),
(11, '2015-08-18 14:13:31', '2015-08-18 14:13:31', 'try', 1, NULL),
(12, '2015-09-24 15:32:50', '2015-09-24 15:32:50', 'Piccccc', 4, NULL),
(13, '2015-09-24 15:35:17', '2015-09-24 15:35:17', 'Cdv', 4, NULL),
(14, '2015-09-26 07:33:56', '2015-09-26 07:33:56', 'Roload off', 4, NULL),
(15, '2015-09-26 07:45:43', '2015-09-26 07:45:43', 'Ddd', 4, NULL),
(16, '2015-09-26 07:47:47', '2015-09-26 07:47:44', 'Eee', 4, NULL),
(17, '2015-09-26 07:55:19', '2015-09-26 07:55:19', 'Eeeeee', 4, NULL),
(18, '2015-09-26 08:03:17', '2015-09-26 08:03:17', 'Ref', 4, NULL),
(19, '2015-09-26 09:43:12', '2015-09-26 09:43:12', 'O', 4, NULL),
(20, '2015-10-09 08:55:15', '2015-10-09 08:55:16', 'test', 4, NULL),
(21, '2015-10-09 14:58:11', '2015-10-09 14:58:11', 'Test on Yikun tablet.', 4, NULL),
(22, '2015-10-11 10:14:03', '2015-10-11 10:14:03', NULL, 1, NULL),
(23, '2015-10-11 10:14:56', '2015-10-11 10:14:57', NULL, 4, NULL),
(24, '2015-10-11 11:24:04', '2015-10-11 11:24:05', NULL, 1, NULL),
(25, '2015-10-11 11:24:40', '2015-10-11 11:24:40', NULL, 1, NULL),
(26, '2015-10-11 11:47:29', '2015-10-11 11:47:30', NULL, 2, NULL),
(27, '2015-10-12 11:35:57', '2015-10-12 11:35:57', NULL, 2, NULL),
(28, '2015-10-12 12:18:27', '2015-10-12 12:18:28', NULL, 2, NULL),
(29, '2015-10-13 06:27:47', '2015-10-13 06:27:48', NULL, 2, NULL),
(30, '2015-10-13 07:18:59', '2015-10-13 07:19:00', NULL, 2, NULL);

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

--
-- Dumping data for table `status_user_like`
--

INSERT INTO `status_user_like` (`status_id`, `user_id`, `timestamp`) VALUES
(1, 4, '2015-01-05 15:08:12'),
(10, 1, '2015-08-18 14:12:31');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='User information';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `name`, `phone_number`, `password`, `description`, `verification_status`, `verification_code`, `icon`, `fb_token`) VALUES
(1, 'Xiaoxue', 93875844, '1234', NULL, 'verified', NULL, '1.jpg', NULL),
(2, 'Yikun', 83420050, '1234', NULL, 'verified', '7bb74d', '2.jpg', NULL),
(3, 'Yishan', 84238466, '1234', NULL, 'verified', NULL, '3.jpg', NULL),
(4, 'Huiqi', 98118502, '1234', NULL, 'verified', NULL, '4.jpg', 'CAALWAgarVpUBAGJ0O86OzqH4e1g7IpbIMFqCL0XFJZC5HwCuZCTZCRGWlxoaUi94kOs8FJe9993H5RtsrJleGgZAAqHRxN9ZBnQ8BgHuRnOcf43lfwivwNsqWqeHLqbQBvKBAbKt0akfDalvJqFKZBeR50ls8g9caRnAOUasZA9ZBoqL3oxbfpGpZBj3uFjKDfPADbHe19ASgmkRLkDAgWQ1g'),
(5, 'Siqi', 90571362, '1234', NULL, 'verified', NULL, '5.jpg', NULL),
(6, 'Kevin', 82880010, '1234', NULL, 'verified', NULL, '6.jpg', NULL),
(7, 'David', 93091235, '1234', NULL, 'verified', NULL, '7.jpg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_chatgroup`
--

DROP TABLE IF EXISTS `user_chatgroup`;
CREATE TABLE IF NOT EXISTS `user_chatgroup` (
  `user_id` int(11) NOT NULL,
  `chatgroup_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_chatgroup`
--

INSERT INTO `user_chatgroup` (`user_id`, `chatgroup_id`) VALUES
(1, 1),
(2, 1),
(4, 1),
(1, 2),
(2, 2),
(4, 2);

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

--
-- Dumping data for table `user_user`
--

INSERT INTO `user_user` (`user_id1`, `user_id2`, `nickname`, `relationship`, `status`) VALUES
(1, 2, NULL, '', 'confirmed'),
(1, 4, NULL, 'Team', 'confirmed'),
(2, 1, NULL, NULL, 'confirmed'),
(2, 4, 'Huiqi ', '', 'confirmed'),
(2, 5, NULL, NULL, 'pending'),
(2, 6, NULL, NULL, 'confirmed'),
(2, 7, NULL, NULL, 'confirmed'),
(3, 4, '', 'Team', 'confirmed'),
(4, 1, NULL, 'Friend', 'confirmed'),
(4, 2, NULL, NULL, 'confirmed'),
(4, 3, NULL, 'Team', 'confirmed'),
(4, 5, NULL, NULL, 'confirmed'),
(4, 6, NULL, NULL, 'confirmed'),
(4, 7, NULL, NULL, 'confirmed'),
(5, 2, NULL, NULL, 'waiting'),
(6, 2, NULL, NULL, 'confirmed'),
(6, 4, NULL, NULL, 'confirmed'),
(7, 2, NULL, NULL, 'pending'),
(7, 4, NULL, NULL, 'confirmed');

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
-- Indexes for table `status`
--
ALTER TABLE `status`
 ADD PRIMARY KEY (`id`), ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `status_user_like`
--
ALTER TABLE `status_user_like`
 ADD PRIMARY KEY (`status_id`,`user_id`), ADD KEY `status_user_like_user_id` (`user_id`);

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
MODIFY `id` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- AUTO_INCREMENT for table `group_chat_message`
--
ALTER TABLE `group_chat_message`
MODIFY `id` int(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `picture`
--
ALTER TABLE `picture`
MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
MODIFY `id` bigint(50) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
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
-- Constraints for table `status`
--
ALTER TABLE `status`
ADD CONSTRAINT `status_author` FOREIGN KEY (`user_id`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
